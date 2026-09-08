"""Create an internal region review map; no automatic semantic color decisions."""
import argparse
import json
from pathlib import Path
import sys

import cv2
import numpy as np
from PIL import ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from make_product import ROOT, read_image, a4_image
from scripts.color_regions import segment, pixel_hash, font

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--lineart', required=True, type=Path)
parser.add_argument('--review-dir', required=True, type=Path)
args = parser.parse_args()
if (ROOT / 'output').resolve() in [args.review_dir.resolve(), *args.review_dir.resolve().parents]:
    parser.error('Internal review files must be outside output/.')
args.review_dir.mkdir(parents=True, exist_ok=True)
cfg = json.loads((ROOT / 'config/defaults.json').read_text(encoding='utf-8'))
im = a4_image(read_image(args.lineart).convert('L'), cfg['lineart_size'], False)
im = im.point(lambda p: 255 if p >= cfg['binary_threshold'] else 0, mode='1')
count, labels, stats, _ = segment(im)
edge = set(np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]])))
preview = im.convert('RGB')
draw = ImageDraw.Draw(preview)
regions = []
for index in range(1, count):
    x, y, w, h, area = map(int, stats[index])
    mask = (labels[y:y+h, x:x+w] == index).astype('uint8')
    distance = cv2.distanceTransform(mask, cv2.DIST_L2, 5)
    _, radius, _, point = cv2.minMaxLoc(distance)
    px, py = int(x + point[0]), int(y + point[1])
    regions.append({'review_id': index, 'seed': [px, py], 'expected_area': area,
                    'color': 'REVIEW_REQUIRED', 'touches_edge': index in edge,
                    'clearance_px': round(radius, 1)})
    if area >= 40 and index not in edge:
        draw.text((px, py), str(index), fill='red', font=font(24), anchor='mm', stroke_width=2, stroke_fill='white')
preview.save(args.review_dir / 'region-map.png')
(args.review_dir / 'regions.json').write_text(json.dumps({
    'size': list(im.size), 'lineart_sha256': pixel_hash(im), 'regions': regions
}, indent=2) + '\n', encoding='utf-8')
print(f'{len(regions)} regions, including tiny islands and exterior. Assign each a color OR intentional_white with a reason. Never omit a region.')
