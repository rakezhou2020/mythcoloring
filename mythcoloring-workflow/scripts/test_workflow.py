"""V2 regression tests: region safety, correspondence, one-page PDF and replacement."""
import copy
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

import numpy as np
from PIL import Image, ImageDraw
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from make_product import ROOT, inspect_lineart, validate_product
from scripts.color_regions import fill_regions, make_guide, pixel_hash, segment, inspect_fill_completeness

CFG = json.loads((ROOT / 'config/defaults.json').read_text(encoding='utf-8'))


def fixture():
    im = Image.new('L', (2100, 2970), 255)
    draw = ImageDraw.Draw(im)
    centers = []
    for i in range(10):
        x, y = 200 + (i % 3) * 550, 300 + (i // 3) * 450
        draw.rectangle((x, y, x + 250, y + 250), outline=0, width=8)
        centers.append((x + 125, y + 125))
    palette = json.loads((ROOT / 'config/nine-colored-deer.colors.json').read_text())['palette']
    _, labels, stats, _ = segment(im)
    plan = {'size': list(im.size), 'lineart_sha256': pixel_hash(im), 'palette': palette,
            'regions': [{'seed': list(c), 'expected_area': int(stats[labels[c[1], c[0]], 4]),
                         'color': palette[i]['id']} for i, c in enumerate(centers[:9])],
            'intentional_white': [{'seed': [0, 0], 'expected_area': int(stats[labels[0, 0], 4]), 'reason': 'Page background'}, {'seed': list(centers[9]), 'expected_area': int(stats[labels[centers[9][1], centers[9][0]], 4]), 'reason': 'Designated uncolored rectangle'}],
            'guide_layout': {'art_band': [150, 2630], 'heading_y': 80, 'note_y': 2674, 'palette_y': 2735}}
    return im, plan, centers


class WorkflowTests(unittest.TestCase):
    def test_blank_and_gray_rejected(self):
        for color in (255, 170, 0):
            with self.subTest(color=color), self.assertRaises(ValueError):
                inspect_lineart(Image.new('L', (1200, 1600), color), CFG, raw=True)

    def test_exact_flat_fills_and_untouched_white(self):
        from PIL import ImageColor
        im, plan, centers = fixture()
        finished, _ = fill_regions(im, plan)
        for i, c in enumerate(centers[:9]):
            self.assertEqual(finished.getpixel(c), ImageColor.getrgb(plan['palette'][i]['hex']))
        self.assertEqual(finished.getpixel(centers[9]), (255, 255, 255))
        self.assertEqual(finished.getpixel((0, 0)), (255, 255, 255))
        self.assertEqual(finished.getpixel((200, 300)), (0, 0, 0))
        guide = make_guide(im, finished, plan)
        np.testing.assert_array_equal(np.asarray(guide)[150:2630], np.asarray(finished)[150:2630])
        self.assertFalse(np.array_equal(np.asarray(guide), np.asarray(finished)))
        self.assertEqual(len(finished.getcolors(256)), 11)  # exactly 9 colors + black + white

    def test_reject_bad_plan_and_leaking_region(self):
        im, plan, _ = fixture()
        for mutation in ('hash', 'outside', 'ink', 'duplicate', 'area', 'unknown'):
            p = copy.deepcopy(plan)
            if mutation == 'hash': p['lineart_sha256'] = 'wrong'
            if mutation == 'outside': p['regions'][0]['seed'] = [0, 0]
            if mutation == 'ink': p['regions'][0]['seed'] = [200, 300]
            if mutation == 'duplicate': p['regions'].append(p['regions'][0])
            if mutation == 'area': p['regions'][0]['expected_area'] += 1
            if mutation == 'unknown': p['regions'][0]['color'] = 'unknown'
            with self.subTest(mutation=mutation), self.assertRaises(ValueError):
                fill_regions(im, p)
        leaked = im.copy()
        ImageDraw.Draw(leaked).line((200, 400, 210, 400), fill=255, width=10)
        plan['lineart_sha256'] = pixel_hash(leaked)
        with self.assertRaisesRegex(ValueError, 'leaks'):
            fill_regions(leaked, plan)

    def test_global_completeness_and_exported_white_holes(self):
        im, plan, centers = fixture()
        finished, _ = fill_regions(im, plan)
        for name in ['color-guide', 'finished']:
            actual = finished.copy()
            actual.putpixel(centers[0], (255, 255, 255))
            with self.subTest(name=name), self.assertRaisesRegex(ValueError, 'unexpected white'):
                inspect_fill_completeness(im, actual, plan, name)
        missing = copy.deepcopy(plan)
        missing['regions'].pop()
        with self.assertRaisesRegex(ValueError, 'unclassified'):
            fill_regions(im, missing)
        tiny = im.copy()
        tiny.putpixel((202, 302), 255)
        missing = copy.deepcopy(plan)
        missing['lineart_sha256'] = pixel_hash(tiny)
        with self.assertRaisesRegex(ValueError, 'unclassified'):
            fill_regions(tiny, missing)
        missing = copy.deepcopy(plan)
        missing['intentional_white'][0]['reason'] = ''
        with self.assertRaisesRegex(ValueError, 'design reason'):
            fill_regions(im, missing)

    def test_cli_pdf_source_independence_tampering_and_replace(self):
        im, plan, _ = fixture()
        with tempfile.TemporaryDirectory() as tmp:
            folder = Path(tmp)
            im.save(folder / 'line.png')
            (folder / 'plan.json').write_text(json.dumps(plan))
            command = [sys.executable, str(ROOT / 'make_product.py'), '--slug', 'sample',
                       '--title', 'Sample Coloring Page', '--lineart', str(folder / 'line.png'),
                       '--colors', str(folder / 'plan.json'), '--products-dir', str(folder / 'public/products'), '--metadata-dir', str(folder / 'metadata')]
            def run(extra=()):
                return subprocess.run(command + list(extra), capture_output=True, text=True)
            first = run()
            self.assertEqual(first.returncode, 0, first.stderr)
            product = folder / 'public/products/sample'
            metadata = json.loads((folder / 'metadata/sample/product.json').read_text())
            self.assertEqual(validate_product(product, CFG, plan=plan, product=metadata)['pdf_pages'], 1)
            before = {p.name: p.read_bytes() for p in product.glob('*.png')}
            self.assertNotEqual(run().returncode, 0)
            Image.new('RGB', (20, 20), 'red').save(folder / 'source.png')
            again = run(['--replace', '--input', str(folder / 'source.png')])
            self.assertEqual(again.returncode, 0, again.stderr)
            self.assertEqual(before, {p.name: p.read_bytes() for p in product.glob('*.png')})
            (product / 'unknown.txt').write_text('keep')
            self.assertNotEqual(run(['--replace']).returncode, 0)
            self.assertEqual((product / 'unknown.txt').read_text(), 'keep')
            (product / 'unknown.txt').unlink()
            changed = Image.open(product / 'finished.png').convert('RGB')
            changed.putpixel((325, 425), (1, 2, 3))
            changed.save(product / 'finished.png')
            with self.assertRaisesRegex(ValueError, 'QUALITY FAILED'):
                validate_product(product, CFG, plan=plan, product=metadata)
            letter = run(['--replace', '--paper', 'letter'])
            self.assertEqual(letter.returncode, 0, letter.stderr)
            self.assertEqual(validate_product(product, CFG, paper='letter', plan=plan, product=metadata)['paper'], 'letter')


if __name__ == '__main__':
    unittest.main()
