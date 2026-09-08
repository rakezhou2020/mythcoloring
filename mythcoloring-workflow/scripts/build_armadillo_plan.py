"""Build the reviewed Armadillo color plan from the inspected lineart."""
from __future__ import annotations
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
review=json.loads((ROOT/'config/review-armadillo/regions.json').read_text(encoding='utf-8'))
palette=[
 {'id':'ivory','name':'Body ivory','hex':'#F7E6B5'},
 {'id':'chocolate','name':'Shell chocolate','hex':'#4A332E'},
 {'id':'tan','name':'Ear tan','hex':'#D9A878'},
 {'id':'sage','name':'Sage green','hex':'#87A95E'},
 {'id':'gold','name':'Golden yellow','hex':'#F4C84A'},
 {'id':'ochre','name':'Ornament ochre','hex':'#B8782F'},
 {'id':'terracotta','name':'Terracotta','hex':'#B7503A'},
 {'id':'pink','name':'Muted pink','hex':'#D98791'},
]

def color_for(r):
 x,y=r['seed']; i=r['review_id']
 # All environment-only contours are deliberately left as a consistent line-only background.
 if r['touches_edge'] or (x < 750 and y > 1450) or (x > 1650 and y > 1500): return None
 if i in {135, 137, 143, 148}: return 'sage'
 # Subject anatomy first: a single ivory body, tan ears, and dark segmented shell.
 if i in {29, 66}: return 'tan'
 if i in {48, 51} or (y > 1900 and x < 1200): return 'ivory'
 if 920 < x < 1560 and 1030 < y < 2100: return 'chocolate'
 if x < 1110 and 950 < y < 1900: return 'ivory'
 # The foliage directly woven around the armadillo remains part of the subject treatment.
 if x > 1050 and 650 < y < 2100: return 'sage'
 if 820 < x < 1300 and 1500 < y < 2100: return 'sage'
 # Flower heads and the base ornament get restrained warm accents.
 if y < 820 and x < 1200: return 'gold' if i % 3 else 'ochre'
 if x > 1250 and y > 1900: return ['gold', 'ochre', 'terracotta', 'pink'][i % 4]
 return 'sage'

regions=[]; whites=[]
for r in review['regions']:
 item={'seed':r['seed'],'expected_area':r['expected_area']}; color=color_for(r)
 if color: regions.append({**item,'color':color})
 else: whites.append({**item,'reason':'Light garden background deliberately remains black-and-white line art.'})
plan={'version':4,'size':review['size'],'lineart_sha256':review['lineart_sha256'],'palette':palette,'regions':regions,'intentional_white':whites,'guide_layout':{'art_band':[150,2630],'heading_y':80,'note_y':2674,'palette_y':2735},'notes':'Armadillo scope standard: the armadillo, its tied foliage, flower heads, and base ornament are completely flat-filled; all environmental ground, distant grass, and left background plants are deliberately line-only.'}
(ROOT/'config/armadillo.colors.json').write_text(json.dumps(plan,indent=2)+'\n',encoding='utf-8')
print(len(regions),len(whites))
