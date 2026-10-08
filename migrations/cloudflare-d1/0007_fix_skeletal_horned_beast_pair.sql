-- Correct the line-art/color-reference pairing for the skeletal horned beast.
UPDATE coloring_pages
SET color_reference_url = '/coloring-pages/creature-collection/codex-clipboard-c8d35ac0-8ef5-4597-ac94-795de7a7ffd8.jpg'
WHERE source_key = 'standard:creature:skeletal-horned-beast';

DELETE FROM page_categories
WHERE page_id = 'page-creature-hybrid-insect-giant';

DELETE FROM coloring_pages
WHERE source_key = 'standard:creature:hybrid-insect-giant';
