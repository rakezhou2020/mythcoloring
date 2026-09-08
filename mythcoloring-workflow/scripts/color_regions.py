"""Deterministic region fills. Original artwork is never used for coloring."""
import hashlib
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageColor, ImageDraw, ImageFont


def pixel_hash(lineart):
    return hashlib.sha256(np.asarray(lineart.convert('L')).tobytes()).hexdigest()


def segment(lineart):
    white = (np.asarray(lineart.convert('L')) == 255).astype('uint8')
    return cv2.connectedComponentsWithStats(white, connectivity=4)


def fill_regions(lineart, plan):
    if list(lineart.size) != plan['size'] or pixel_hash(lineart) != plan['lineart_sha256']:
        raise ValueError('Color plan does not match this exact lineart; review region seeds again.')
    palette = plan['palette']
    if not 8 <= len(palette) <= 12 or len({p['id'] for p in palette}) != len(palette):
        raise ValueError('Use 8-12 uniquely named palette colors.')
    colors = {p['id']: ImageColor.getrgb(p['hex']) for p in palette}
    if len(set(colors.values())) != len(colors) or any(c in [(0, 0, 0), (255, 255, 255)] for c in colors.values()):
        raise ValueError('Palette colors must be distinct; black is reserved for lines and white for unassigned areas.')
    count, labels, stats, _ = segment(lineart)
    exterior = set(np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]])))
    lookup = np.full((count, 3), 255, dtype='uint8')
    lookup[0] = 0
    seen, used = set(), set()
    for item in plan['regions']:
        x, y = item['seed']
        if not (0 <= x < lineart.width and 0 <= y < lineart.height):
            raise ValueError('Region seed is out of bounds.')
        region = int(labels[y, x])
        if region == 0 or region in exterior:
            raise ValueError(f'Seed {x},{y} touches ink or leaks into the outside background.')
        if region in seen:
            raise ValueError('Duplicate region assignment; use one color per connected region.')
        if int(stats[region, cv2.CC_STAT_AREA]) != item['expected_area']:
            raise ValueError('Region area changed; re-review the color plan.')
        if item['color'] not in colors:
            raise ValueError('Unknown palette color.')
        seen.add(region)
        used.add(item['color'])
        lookup[region] = colors[item['color']]
    white_regions = set()
    for item in plan.get('intentional_white', []):
        if not isinstance(item.get('reason'), str) or not item['reason'].strip():
            raise ValueError('Intentional white regions require a design reason.')
        x, y = item['seed']
        if not (0 <= x < lineart.width and 0 <= y < lineart.height):
            raise ValueError('Intentional white seed is out of bounds.')
        region = int(labels[y, x])
        if region == 0 or region in seen or region in white_regions:
            raise ValueError('Invalid/duplicate/conflicting intentional white region.')
        if int(stats[region, cv2.CC_STAT_AREA]) != item['expected_area']:
            raise ValueError('Intentional white boundary changed; repair/review before generation.')
        white_regions.add(region)
    missing = set(range(1, count)) - seen - white_regions
    if missing:
        details = [{'region': i, 'area': int(stats[i, 4]), 'box': stats[i, :4].tolist()} for i in sorted(missing)]
        raise ValueError(f'QUALITY FAILED: unclassified white regions (including tiny regions); repair/review required: {details}')
    if used != set(colors):
        raise ValueError('Every listed palette color must be used in the artwork.')
    finished = Image.fromarray(lookup[labels], 'RGB')
    original = np.asarray(lineart.convert('L'))
    pixels = np.asarray(finished)
    if not (pixels[original == 0] == 0).all():
        raise ValueError('Original black strokes were changed.')
    unassigned = ~np.isin(labels, list(seen) + [0])
    if not (pixels[unassigned] == 255).all():
        raise ValueError('Unassigned areas must stay white.')
    return finished, {'assigned_regions': len(seen), 'palette_colors': len(used),
                      'intentional_white_regions': len(white_regions), 'unclassified_regions': 0,
                      'black_strokes_preserved': True, 'unassigned_regions_white': True}


def inspect_fill_completeness(lineart, actual, plan, name):
    """Check actual exported pixels, not only the rendering plan. Zero white-hole tolerance."""
    expected, _ = fill_regions(lineart, plan)
    expected_pixels = np.asarray(expected)
    pixels = np.asarray(actual.convert('RGB'))
    if pixels.shape != expected_pixels.shape:
        raise ValueError(f'QUALITY FAILED: {name} dimensions differ from the approved lineart.')
    must_color = np.any(expected_pixels != 255, axis=2) & np.any(expected_pixels != 0, axis=2)
    holes = must_color & np.all(pixels == 255, axis=2)
    if holes.any():
        count, _, stats, _ = cv2.connectedComponentsWithStats(holes.astype('uint8'), connectivity=4)
        defects = [{'area': int(s[4]), 'box': s[:4].tolist()} for s in stats[1:]]
        raise ValueError(f'QUALITY FAILED: {name} has {int(holes.sum())} unexpected white pixels in {count-1} holes; repair required: {defects}')
    wrong = must_color & np.any(pixels != expected_pixels, axis=2)
    if wrong.any():
        raise ValueError(f'QUALITY FAILED: {name} has {int(wrong.sum())} incorrect fill pixels; repair required.')
    return {'unexpected_white_pixels': 0, 'wrong_color_pixels': 0}


def font(size):
    for path in ['C:/Windows/Fonts/arial.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']:
        if Path(path).is_file():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default(size=size)


def make_guide(lineart, finished, plan):
    """A flat-fill reference with a palette in existing whitespace; no marks on strokes."""
    guide = finished.copy()
    draw = ImageDraw.Draw(guide)
    layout = plan['guide_layout']
    top, bottom = layout['art_band']
    ink = np.asarray(lineart.convert('L')) == 0
    if ink[:top].any() or ink[bottom:].any():
        raise ValueError('Guide header/palette space overlaps the lineart; adjust layout.')
    draw.text((guide.width // 2, layout['heading_y']), 'COLOR GUIDE', font=font(44), fill='black', anchor='mm')
    draw.text((guide.width // 2, layout['note_y']),
              'Match these flat colors. All white areas stay white.',
              font=font(30), fill='black', anchor='mm')
    for index, item in enumerate(plan['palette']):
        row, col = divmod(index, 3)
        x = 140 + col * 620
        y = layout['palette_y'] + row * 58
        if y + 40 >= guide.height:
            raise ValueError('Palette does not fit on the guide canvas.')
        draw.rectangle((x, y, x + 52, y + 40), fill=item['hex'], outline='black', width=2)
        draw.text((x + 72, y + 20), item['name'], fill='black', font=font(32), anchor='lm')
    if not np.array_equal(np.asarray(guide)[top:bottom], np.asarray(finished)[top:bottom]):
        raise ValueError('Guide and finished artwork differ.')
    if not (np.asarray(guide)[ink] == 0).all():
        raise ValueError('Guide annotations modified the black outlines.')
    return guide
