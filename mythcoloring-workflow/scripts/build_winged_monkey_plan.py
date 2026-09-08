"""Create the reviewed Winged Monkey V1 region plan from the inspected region map."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
review = json.loads((ROOT / 'config/review-winged-monkey/regions.json').read_text(encoding='utf-8'))

palette = [
    {'id': 'cream', 'name': 'Cream', 'hex': '#F7E6B5'},
    {'id': 'orange', 'name': 'Orange', 'hex': '#F1A44E'},
    {'id': 'coral', 'name': 'Coral red', 'hex': '#E86D62'},
    {'id': 'gold', 'name': 'Yellow', 'hex': '#F4CE4E'},
    {'id': 'brown', 'name': 'Tree brown', 'hex': '#A97245'},
    {'id': 'green', 'name': 'Leaf green', 'hex': '#91BC70'},
    {'id': 'teal', 'name': 'Teal', 'hex': '#58ADA4'},
    {'id': 'blue', 'name': 'Sky blue', 'hex': '#83BDE2'},
    {'id': 'purple', 'name': 'Lavender', 'hex': '#AD96C9'},
]


def color_for(region):
    x, y = region['seed']
    # Reviewed design decisions: scenery stays line-only; the character is fully colored.
    # The exterior is the intended white sky. The tiny isolated left mountain contour
    # is also decorative background; all wing feathers remain subject color regions.
    if region['touches_edge'] or (x < 380 and 1800 < y < 2000 and region['expected_area'] < 500):
        return None
    if y < 920 and x < 1450:
        return 'brown'  # entire crown tree
    if x > 1450 and y < 850:
        return 'gold'   # sun
    if x > 1220 and 600 < y < 1300:
        return 'coral' if region['review_id'] % 2 else 'orange'  # flame mane
    if 480 < x < 1080 and 750 < y < 1250:
        return 'orange' if y < 940 else 'cream'  # hair, face and ears
    if 650 < x < 1320 and 1150 < y < 1700:
        return 'green' if region['review_id'] % 3 == 0 else 'cream'  # gems and torso
    if y > 1300 and (x < 720 or x > 1220):
        return ['blue', 'teal', 'purple'][region['review_id'] % 3]  # wing feathers
    if y > 1800:
        return 'cream' if x < 1450 else 'purple'  # legs, tail and right wing
    return 'cream'


regions, intentional_white = [], []
for region in review['regions']:
    item = {'seed': region['seed'], 'expected_area': region['expected_area']}
    color = color_for(region)
    if color:
        regions.append({**item, 'color': color})
    else:
        reason = ('Open sky and distant mountain scenery deliberately remain line-only.'
                  if region['touches_edge'] else 'Distant mountain interior deliberately remains line-only.')
        intentional_white.append({**item, 'reason': reason})

plan = {
    'version': 3,
    'size': review['size'],
    'lineart_sha256': review['lineart_sha256'],
    'palette': palette,
    'regions': regions,
    'intentional_white': intentional_white,
    'guide_layout': {'art_band': [150, 2630], 'heading_y': 80, 'note_y': 2674, 'palette_y': 2735},
    'notes': ('Reviewed V1: central winged monkey, tree, sun, magical flame mane and every feather/'
              'gem region assigned flat colors. Only exterior sky and mountain scenery are intentionally line-only.'),
}
(ROOT / 'config/winged-monkey.colors.json').write_text(json.dumps(plan, indent=2) + '\n', encoding='utf-8')
print(f"{len(regions)} colored regions; {len(intentional_white)} intentional white regions")
