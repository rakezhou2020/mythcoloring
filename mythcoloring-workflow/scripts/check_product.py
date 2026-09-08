"""Recheck all product assets; optional rendered PDF previews outside product output."""
import argparse
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from make_product import ROOT, validate_product

parser = argparse.ArgumentParser()
parser.add_argument('product', type=Path)
parser.add_argument('--paper', choices=['a4', 'letter'], default='a4')
parser.add_argument('--preview-dir', type=Path)
parser.add_argument('--colors', type=Path)
args = parser.parse_args()
cfg = json.loads((ROOT / 'config/defaults.json').read_text(encoding='utf-8'))
if args.preview_dir and (args.preview_dir.resolve() == args.product.resolve() or
                        args.product.resolve() in args.preview_dir.resolve().parents):
    parser.error('Previews must be outside the product folder.')
plan = json.loads(args.colors.read_text(encoding='utf-8')) if args.colors else None
print(json.dumps(validate_product(args.product, cfg, args.paper, plan), indent=2))
if args.preview_dir:
    import pypdfium2 as pdfium
    args.preview_dir.mkdir(parents=True, exist_ok=True)
    with pdfium.PdfDocument(str(args.product / 'print.pdf')) as doc:
        for i in range(len(doc)):
            page = doc[i]
            bitmap = page.render(scale=1.4)
            bitmap.to_pil().save(args.preview_dir / f'page-{i + 1}.png')
            bitmap.close()
            page.close()
