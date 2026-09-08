"""Place a reviewed lineart on A4 with dedicated header and palette whitespace."""
import argparse
from pathlib import Path
import sys

from PIL import Image, ImageOps

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from make_product import read_image

parser = argparse.ArgumentParser()
parser.add_argument('--input', type=Path, required=True)
parser.add_argument('--output', type=Path, required=True)
parser.add_argument('--top', type=int, default=150)
parser.add_argument('--bottom', type=int, default=340)
args = parser.parse_args()
if args.top < 0 or args.bottom < 0 or args.top + args.bottom >= 2970:
    parser.error('Invalid A4 guide margins.')
source = read_image(args.input).convert('L')
art = ImageOps.contain(source, (2100, 2970 - args.top - args.bottom), Image.Resampling.LANCZOS)
result = Image.new('L', (2100, 2970), 255)
result.paste(art, ((2100 - art.width) // 2, args.top))
args.output.parent.mkdir(parents=True, exist_ok=True)
result.save(args.output, 'PNG', dpi=(254, 254))
