import os

# Mapping from FontAwesome/Mintlify to Lucide (PascalCase)
replacements = {
    "building-columns": "Landmark",
    "swords": "Swords",
    "cubes": "Blocks",
    "flask": "FlaskConical",
    "shield": "Shield",
    "globe": "Globe",
    "wand-magic-sparkles": "Wand2",
    "filter": "Filter",
    "play": "Play",
    "terminal": "Terminal",
    "egg": "Egg",
    "beer-mug-empty": "Beer",
    "lock": "Lock",
    "book": "Book",
    "flag": "Flag",
    "palette": "Palette",
    "earth-americas": "Globe"
}

# Directory to scan
content_dir = r"c:\Users\yuyu\Desktop\Python\nami\nami-server-web-new c\content\docs"

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        for k, v in replacements.items():
            # Replace icon: "key" or icon: 'key'
            # We use simple string replacement for reliability in frontmatter
            content = content.replace(f'icon: "{k}"', f'icon: "{v}"')
            content = content.replace(f"icon: '{k}'", f"icon: '{v}'")
            
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

for root, dirs, files in os.walk(content_dir):
    for file in files:
        if file.endswith(".mdx"):
            process_file(os.path.join(root, file))
