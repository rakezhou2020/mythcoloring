"""Local V2 workflow: reviewed lineart + region plan -> guide, finished example and one-page PDF."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import re
import shutil
import sys
import tempfile

import numpy as np
from PIL import Image, ImageOps, ImageStat, ImageFilter
from pypdf import PdfReader
from reportlab.lib.pagesizes import A4, letter
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parent
ASSET_NAMES = {'lineArtImage': 'lineart.png', 'colorGuideImage': 'color-guide.png',
               'finishedImage': 'finished.png', 'printPdf': 'print.pdf'}
FOOTER_FONT = 'MythFooter'
PDF_LOGO = ROOT / 'templates' / 'myth-coloring-logo.png'


def footer_font() -> str:
    """Use an embedded Unicode font so the required middle dot is never a tofu glyph."""
    if FOOTER_FONT not in pdfmetrics.getRegisteredFontNames():
        for path in (Path('C:/Windows/Fonts/arial.ttf'),
                     Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')):
            if path.is_file():
                pdfmetrics.registerFont(TTFont(FOOTER_FONT, str(path)))
                break
        else:
            raise ValueError('No Unicode font is available for the required PDF footer.')
    return FOOTER_FONT


def a4_image(im: Image.Image, size: list[int], cover: bool) -> Image.Image:
    if cover:
        return ImageOps.fit(im, tuple(size), Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    contained = ImageOps.contain(im, tuple(size), Image.Resampling.LANCZOS)
    result = Image.new(im.mode, tuple(size), 'white')
    result.paste(contained, ((size[0] - contained.width) // 2, (size[1] - contained.height) // 2))
    return result


def read_image(path: Path) -> Image.Image:
    with Image.open(path) as original:
        original.load()
        if getattr(original, 'n_frames', 1) != 1:
            raise ValueError(f'Only single-frame images are supported: {path}')
        rgba = ImageOps.exif_transpose(original).convert('RGBA')
        white = Image.new('RGBA', rgba.size, 'white')
        return Image.alpha_composite(white, rgba).convert('RGB')


def inspect_lineart(im: Image.Image, cfg: dict, raw: bool = False) -> dict:
    rgb = np.asarray(im.convert('RGB'))
    gray = np.asarray(im.convert('L'))
    if raw and max(im.size) < cfg['minimum_lineart_long_edge']:
        raise ValueError('Lineart resolution too low; provide at least 1200 px on the longest edge.')
    if raw and float((rgb.max(axis=2).astype(int) - rgb.min(axis=2) > 24).mean()) > 0.005:
        raise ValueError('Lineart contains colored areas. Supply reviewed black-and-white lineart.')
    midgray = float(((gray > 60) & (gray < 220)).mean())
    # Ignore antialiasing next to dark strokes; measure gray interiors separately.
    near_stroke = np.asarray(Image.fromarray((gray <= 100).astype('uint8') * 255)
                             .filter(ImageFilter.MaxFilter(5))) > 0
    gray_interior = float(((gray > 60) & (gray < 220) & ~near_stroke).mean())
    ink = float((gray < cfg['binary_threshold']).mean())
    white = float((gray >= 245).mean())
    if raw and gray_interior > cfg['max_midgray_fraction']:
        raise ValueError(f'Excessive mid-gray interior ({gray_interior:.2%}); fix shading before packaging.')
    if white < cfg['minimum_white_fraction'] or ink > cfg['maximum_ink_fraction']:
        raise ValueError('Too much filled area / too little white space for a coloring page.')
    if ink < 0.002:
        raise ValueError('Lineart appears blank or nearly blank.')
    # Large locally filled patches catch silhouettes and gray blocks, not just global ink.
    probe = im.convert('L').resize((256, 256), Image.Resampling.BOX)
    mask = (np.asarray(probe) < 128).astype(float)
    patches = mask.reshape(32, 8, 32, 8).mean(axis=(1, 3))
    dense = float((patches > 0.70).mean())
    if dense > cfg['max_dense_patch_fraction']:
        raise ValueError('Large dense filled regions detected; inspect and repair the lineart.')
    if not raw and not np.isin(gray, [0, 255]).all():
        raise ValueError('Final lineart must contain only black and white pixels.')
    return {'size': list(im.size), 'white_fraction': round(white, 4),
            'ink_fraction': round(ink, 4), 'midgray_fraction': round(midgray, 4),
            'gray_interior_fraction': round(gray_interior, 4), 'dense_patch_fraction': round(dense, 4)}


def wrapped(text: str, font: str, size: float, width: float) -> list[str]:
    lines, line = [], ''
    for word in text.split():
        if stringWidth(word, font, size) > width:
            raise ValueError('PDF text contains a word too long to fit the page.')
        trial = f'{line} {word}'.strip()
        if line and stringWidth(trial, font, size) > width:
            lines.append(line)
            line = word
        else:
            line = trial
    return lines + ([line] if line else [])


def heading(pdf, text: str) -> float:
    width, height = pdf._pagesize
    lines = wrapped(text, 'Helvetica-Bold', 18, width - 72)
    if len(lines) > 3:
        raise ValueError('Title is too long (maximum three PDF heading lines).')
    pdf.setFont('Helvetica-Bold', 18)
    for n, line in enumerate(lines):
        pdf.drawCentredString(width / 2, height - 43 - n * 23, line)
    return height - 62 - (len(lines) - 1) * 23


def draw_fit(pdf, im: Image.Image, bottom: float, top: float) -> float:
    width = pdf._pagesize[0]
    ratio = min((width - 72) / im.width, (top - bottom) / im.height)
    w, h = im.width * ratio, im.height * ratio
    pdf.drawImage(ImageReader(im), (width - w) / 2, bottom + (top - bottom - h) / 2,
                  width=w, height=h, mask='auto')
    return im.width / (w / 72)


def make_pdf(path: Path, title: str, lineart: Image.Image, paper='a4'):
    if not PDF_LOGO.is_file():
        raise ValueError(f'PDF logo is missing: {PDF_LOGO}')
    pagesize = A4 if paper == 'a4' else letter
    pdf = canvas.Canvas(str(path), pagesize=pagesize, pageCompression=1)
    pdf.setTitle(title)
    pdf.setAuthor('Myth Coloring')
    dpi = draw_fit(pdf, lineart, 50, heading(pdf, title))
    pdf.setFont(footer_font(), 9)
    footer = 'Myth Coloring \u00b7 mythcoloring.com'
    footer_width = stringWidth(footer, footer_font(), 9)
    logo_size = 16
    group_width = logo_size + 7 + footer_width
    group_left = (pagesize[0] - group_width) / 2
    pdf.drawImage(ImageReader(str(PDF_LOGO)), group_left, 22, width=logo_size, height=logo_size,
                  mask='auto', preserveAspectRatio=True, anchor='c')
    pdf.drawString(group_left + logo_size + 7, 27, footer)
    pdf.showPage()
    pdf.save()
    return dpi


from scripts.color_regions import fill_regions, make_guide, inspect_fill_completeness


def validate_product(folder: Path, cfg: dict, paper='a4', plan=None, product=None) -> dict:
    if product is None:
        product = json.loads((ROOT / 'output' / folder.name / 'product.json').read_text(encoding='utf-8'))
    keys = tuple(ASSET_NAMES)
    for key, filename in ASSET_NAMES.items():
        if product[key] != f"/products/{product['slug']}/{filename}":
            raise ValueError('Product asset URLs must use the canonical /products/[slug]/ filenames.')
    if {p.name for p in folder.iterdir()} != set(ASSET_NAMES.values()):
        raise ValueError('Product asset directory must contain exactly three PNGs and one PDF.')
    if 'colorImage' in product or 'pdf' in product:
        raise ValueError('Legacy metadata is not allowed in V2.')
    images = {}
    for key in keys[:3]:
        with Image.open(folder / ASSET_NAMES[key]) as im:
            im.load()
            if im.format != 'PNG' or list(im.size) != cfg['lineart_size']:
                raise ValueError('Invalid PNG dimensions/format.')
            images[key] = im.convert('RGB')
    metrics = inspect_lineart(images['lineArtImage'], cfg)
    if plan is None:
        plan = json.loads((ROOT / 'config' / f"{product['slug']}.colors.json").read_text(encoding='utf-8'))
    finished, region_report = fill_regions(images['lineArtImage'], plan)
    guide = make_guide(images['lineArtImage'], finished, plan)
    fill_qa = {key: inspect_fill_completeness(images['lineArtImage'], images[key], plan, key)
               for key in ('colorGuideImage', 'finishedImage')}
    if not np.array_equal(np.asarray(finished), np.asarray(images['finishedImage'])):
        raise ValueError('Finished Example does not match the region color plan.')
    if not np.array_equal(np.asarray(guide), np.asarray(images['colorGuideImage'])):
        raise ValueError('Color Guide does not match the region color plan.')
    reader = PdfReader(folder / 'print.pdf')
    if len(reader.pages) != 1:
        raise ValueError('PDF must contain exactly one page.')
    page = reader.pages[0]
    expected_size = A4 if paper == 'a4' else letter
    if any(abs(float(actual) - expected) > 0.01 for actual, expected in
           zip((page.mediabox.width, page.mediabox.height), expected_size)):
        raise ValueError(f'PDF must use {paper}.')
    text = ' '.join(page.extract_text().split())
    if product['title'] not in text or 'Myth Coloring \u00b7 mythcoloring.com' not in text or 'Color Inspiration' in text:
        raise ValueError('PDF title/footer or legacy content check failed.')
    embedded = list(page.images)
    embedded_arrays = [np.asarray(item.image.convert('RGB')) for item in embedded]
    lineart_embedded = any(np.array_equal(item, np.asarray(images['lineArtImage'])) for item in embedded_arrays)
    logo_required = product.get('workflowVersion', 0) >= 4
    if not lineart_embedded:
        raise ValueError('PDF must embed the clean black-and-white lineart.')
    if any(np.array_equal(item, np.asarray(images['colorGuideImage'])) or
           np.array_equal(item, np.asarray(images['finishedImage'])) for item in embedded_arrays):
        raise ValueError('PDF must not embed the Color Guide or Finished Preview.')
    if logo_required and len(embedded) != 2:
        raise ValueError('Current-version PDFs must embed the lineart and logo only.')
    if not logo_required and len(embedded) != 1:
        raise ValueError('Legacy PDFs must embed only the clean black-and-white lineart.')
    import pypdfium2 as pdfium
    with pdfium.PdfDocument(str(folder / 'print.pdf')) as doc:
        page = doc[0]
        bitmap = page.render(scale=1)
        if sum(ImageStat.Stat(bitmap.to_pil().convert('L')).var) < 1:
            raise ValueError('PDF rendered blank.')
        bitmap.close()
        page.close()
    return {'files': 4, 'pdf_pages': 1, 'paper': paper, 'lineart': metrics,
            **region_report, 'guide_finished_artwork_pixel_identical': True,
            'pdf_embeds_lineart_only': True, 'pdf_logo_included': logo_required,
            'fill_completeness': fill_qa}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', type=Path, help='Internal source only; never rendered in exported assets')
    parser.add_argument('--slug', required=True)
    parser.add_argument('--title', required=True)
    parser.add_argument('--lineart', type=Path, help='Reviewed black-and-white lineart')
    parser.add_argument('--colors', type=Path, help='Reviewed region/palette JSON')
    parser.add_argument('--theme-slug')
    parser.add_argument('--paper', choices=['a4', 'letter'], default='a4')
    parser.add_argument('--products-dir', type=Path, default=ROOT.parent / 'public/products', help=argparse.SUPPRESS)
    parser.add_argument('--metadata-dir', type=Path, default=ROOT / 'output', help=argparse.SUPPRESS)
    parser.add_argument('--replace', action='store_true', help='Replace a known V1/V2 product after all checks pass')
    args = parser.parse_args()
    stage = backup = None
    metadata_temp = None
    committed = False
    output = args.products_dir.resolve()
    try:
        if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', args.slug):
            raise ValueError('Slug must use lowercase ASCII letters, digits and hyphens.')
        title = ' '.join(args.title.split())
        if not title or any(ord(c) < 32 or ord(c) > 126 for c in title):
            raise ValueError('PDF titles must use printable ASCII English text.')
        cfg = json.loads((ROOT / 'config/defaults.json').read_text(encoding='utf-8'))
        if args.input and not args.input.is_file():
            raise ValueError(f'Internal original source not found: {args.input}')
        base = args.input.parent if args.input else ROOT / 'input'
        line_path = args.lineart or base / f'{args.slug}-lineart-reviewed.png'
        if not args.lineart and not line_path.exists():
            line_path = base / f'{args.slug}-lineart.png'
        if not line_path.is_file():
            raise ValueError('AI/manual lineart step required before product packaging.')
        plan_path = args.colors or ROOT / 'config' / f'{args.slug}.colors.json'
        if not plan_path.is_file():
            raise ValueError('Reviewed color plan required; see scripts/inspect_regions.py and README.md.')
        lineart = read_image(line_path)
        inspect_lineart(lineart, cfg, raw=True)
        lineart = a4_image(lineart.convert('L'), cfg['lineart_size'], False)
        lineart = lineart.point(lambda p: 255 if p >= cfg['binary_threshold'] else 0, mode='1')
        inspect_lineart(lineart, cfg)
        plan = json.loads(plan_path.read_text(encoding='utf-8'))
        finished, _ = fill_regions(lineart, plan)
        guide = make_guide(lineart, finished, plan)
        output.mkdir(parents=True, exist_ok=True)
        final = output / args.slug
        allowed = set(ASSET_NAMES.values())
        if final.exists():
            if not args.replace:
                raise ValueError('Output already exists; use --replace to update this product.')
            if final.is_symlink() or final.resolve().parent != output or not final.is_dir():
                raise ValueError('Unsafe replacement target.')
            if any(p.name not in allowed or not p.is_file() or p.is_symlink() for p in final.iterdir()):
                raise ValueError('Unknown files in product folder; refusing replacement.')
        stage = Path(tempfile.mkdtemp(prefix=f'.{args.slug}-', dir=output))
        product = {'slug': args.slug, 'title': title,
                   'themeSlug': args.theme_slug or cfg['themeSlug'],
                   **{key: f'/products/{args.slug}/{name}' for key, name in ASSET_NAMES.items()},
                   'status': 'draft', 'workflowVersion': 4,
                   'display': {'card': 'lineArtImage', 'hover': 'finishedImage', 'detail': 'colorGuideImage'}}
        for key, im in [('lineArtImage', lineart), ('colorGuideImage', guide), ('finishedImage', finished)]:
            im.save(stage / ASSET_NAMES[key], 'PNG', dpi=(254, 254), optimize=True)
        dpi = make_pdf(stage / 'print.pdf', title, lineart, args.paper)
        report = validate_product(stage, cfg, args.paper, plan, product)
        product['quality'] = {'status': 'passed', 'unclassifiedRegions': 0,
                              'unexpectedWhitePixels': 0, 'coloredRegions': report['assigned_regions'],
                              'intentionalWhiteRegions': report['intentional_white_regions']}
        metadata_folder = args.metadata_dir.resolve() / args.slug
        metadata_folder.mkdir(parents=True, exist_ok=True)
        metadata_path = metadata_folder / 'product.json'
        metadata_temp = metadata_folder / '.product.json.tmp'
        metadata_temp.write_text(json.dumps(product, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
        if final.exists():
            backup = Path(tempfile.mkdtemp(prefix=f'.{args.slug}-previous-', dir=output))
            backup.rmdir()
            final.rename(backup)
        try:
            stage.rename(final)
            try:
                metadata_temp.replace(metadata_path)
            except OSError:
                final.rename(stage)
                raise
        except OSError:
            if backup is not None:
                backup.rename(final)
                backup = None
            raise
        stage = None
        committed = True
        print(json.dumps({'output': str(final), 'effective_lineart_dpi': round(dpi), **report},
                         indent=2, ensure_ascii=False))
        return 0
    except (OSError, ValueError, ImportError, KeyError, TypeError) as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        return 1
    finally:
        if metadata_temp is not None and metadata_temp.is_file():
            metadata_temp.unlink()
        # Preserve the backup if a failed rename could not be rolled back.
        for owned in (stage, backup if committed else None):
            if owned is not None and owned.resolve().parent == output and not owned.is_symlink():
                shutil.rmtree(owned)


if __name__ == '__main__':
    raise SystemExit(main())
