import os
import json

def generate_gallery():
    image_dir = "Images"
    output_file = "image-gallery.html"
    slider_data_file = "slider-data.js"
    
    # ---------------------------------------------------------
    # 1. Generate HTML Gallery (Existing Logic)
    # ---------------------------------------------------------
    html_head = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Image Gallery - Mapping Tool</title>
        <style>
            body { font-family: sans-serif; padding: 20px; background: #f6f1e8; color: #2b0610; }
            h1 { text-align: center; margin-bottom: 20px; color: #5a0f1a; }
            .controls {
                text-align: center;
                margin-bottom: 30px;
                position: sticky;
                top: 0;
                background: #FFFFFF;
                padding: 10px;
                z-index: 100;
                border-bottom: 1px solid #E6E0D4;
            }
            button {
                padding: 10px 20px;
                font-size: 16px;
                background: #5a0f1a;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            button:hover { background: #5a0f1a; }
            textarea {
                width: 100%;
                height: 100px;
                margin-top: 10px;
                display: none;
            }
            .gallery { 
                display: grid; 
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
                gap: 20px; 
            }
            .card { 
                background: #FFFFFF; 
                padding: 10px; 
                border-radius: 8px; 
                box-shadow: 0 2px 5px rgba(90,15,26,0.10); 
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                border: 1px solid #E6E0D4;
            }
            .media-ctr {
                width: 100%;
                height: 200px;
                background: #E6E0D4;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            .media-ctr img, .media-ctr video { 
                max-width: 100%; 
                max-height: 100%; 
                object-fit: contain;
            }
            .filename { 
                font-size: 12px; 
                word-break: break-all; 
                color: #6a2234;
                margin-bottom: 5px;
            }
            select {
                width: 100%;
                padding: 5px;
                margin-top: 5px;
            }
        </style>
    </head>
    <body>
        <div class="controls">
            <h1>Image Gallery Mapping Tool</h1>
            <p>Select categories for images to help organize the website.</p>
            <button onclick="exportMapping()">Export Mapping JSON</button>
            <textarea id="output" readonly onclick="this.select()"></textarea>
        </div>
        <div class="gallery">
    """
    
    categories = ["Unassigned", "Hero Slider", "Slider A", "Slider B", "Textiles", "FMCG", "Industrial", "About", "Video"]
    
    files = []
    if os.path.exists(image_dir):
        for root, dirs, filenames in os.walk(image_dir):
            for filename in filenames:
                if not filename.startswith('.'): # Ignore hidden files
                    files.append(os.path.join(root, filename))
    files.sort()
    
    gallery_html = html_head
    
    # Track images for slider data auto-discovery
    slider_map = {
        "hero": [],
        "sliderA": [],
        "sliderB": []
    }

    count = 0
    for file_path in files:
        f = os.path.basename(file_path)
        ext = f.lower().split('.')[-1]
        is_image = ext in ['jpg', 'jpeg', 'png', 'gif', 'webp']
        is_video = ext in ['mp4', 'mov', 'webm', 'mkv']
        
        if is_image or is_video:
            rel_path = os.path.relpath(file_path, start=".")
            
            # Auto-categorize based on full relative path to support nested folders
            path_lower = rel_path.lower()
            default_cat = "Unassigned"
            
            if "hero" in path_lower:
                default_cat = "Hero Slider"
                slider_map["hero"].append(rel_path)
            elif "slider" in path_lower:
                if "a" in path_lower or "textile" in path_lower:
                    default_cat = "Slider A"
                    slider_map["sliderA"].append(rel_path)
                elif "b" in path_lower or "fmcg" in path_lower:
                    default_cat = "Slider B"
                    slider_map["sliderB"].append(rel_path)
                else:
                    # Generic slider
                    slider_map["sliderA"].append(rel_path)
            elif "textile" in path_lower:
                default_cat = "Slider A"
                slider_map["sliderA"].append(rel_path)
            elif "fmcg" in path_lower:
                default_cat = "Slider B"
                slider_map["sliderB"].append(rel_path)
            else:
                # Fallback for unorganized images: Add to a temporary list to be distributed later
                if "unassigned" not in slider_map:
                    slider_map["unassigned"] = []
                slider_map["unassigned"].append(rel_path)

            options = ""
            for cat in categories:
                selected = "selected" if cat == default_cat else ""
                options += f'<option value="{cat}" {selected}>{cat}</option>'
            
            media_element = ""
            if is_image:
                media_element = f'<img src="{rel_path}" loading="lazy" alt="{f}">'
            elif is_video:
                media_element = f'<video src="{rel_path}" controls></video>'

            gallery_html += f"""
            <div class="card">
                <div class="media-ctr">{media_element}</div>
                <div class="filename">{rel_path}</div>
                <select class="cat-select" data-file="{rel_path}">
                    {options}
                </select>
            </div>
            """
            count += 1
            
    if count == 0:
        gallery_html += f"<p>No images found in '{image_dir}'. Please add images.</p>"
        
    gallery_html += """
        </div>
        <script>
            function exportMapping() {
                const selects = document.querySelectorAll('.cat-select');
                let mapping = {};
                
                selects.forEach(select => {
                    const cat = select.value;
                    const file = select.getAttribute('data-file');
                    
                    if (cat !== "Unassigned") {
                        if (!mapping[cat]) mapping[cat] = [];
                        mapping[cat].push(file);
                    }
                });

                const output = document.getElementById('output');
                output.value = JSON.stringify(mapping, null, 2);
                output.style.display = 'block';
                output.select();
                alert("Mapping generated! Copy the JSON.");
            }
        </script>
    </body>
    </html>
    """
    
    with open(output_file, "w") as f:
        f.write(gallery_html)
    
    print(f"Gallery HTML generated at {output_file}")

    # ---------------------------------------------------------
    # 2. Generate Slider Data JS
    # ---------------------------------------------------------
    # Distribute unassigned images if sliders are empty
    if "unassigned" in slider_map and len(slider_map["unassigned"]) > 0:
        unassigned = slider_map["unassigned"]
        # If hero is empty, take first 5
        if not slider_map["hero"]:
            slider_map["hero"] = unassigned[:5]
            unassigned = unassigned[5:]
        
        # If sliderA is empty, take next 10
        if not slider_map["sliderA"]:
            slider_map["sliderA"] = unassigned[:10]
            unassigned = unassigned[10:]
            
        # If sliderB is empty, take the rest (up to 20)
        if not slider_map["sliderB"]:
            slider_map["sliderB"] = unassigned[:20]

    # Convert lists to JS objects with minimal metadata
    
    js_content = "const sliderData = {\n"
    
    # Hero
    js_content += "  hero: [\n"
    for img in slider_map["hero"]:
        js_content += f'    {{ img: "{img}", title: "Global Sourcing", subtitle: "Connecting Markets" }},\n'
    js_content += "  ],\n"
    
    # Slider A
    js_content += "  sliderA: [\n"
    for img in slider_map["sliderA"]:
         js_content += f'    {{ img: "{img}", title: "Product Showcase", link: "#" }},\n'
    js_content += "  ],\n"

    # Slider B
    js_content += "  sliderB: [\n"
    for img in slider_map["sliderB"]:
         js_content += f'    {{ img: "{img}", title: "Industry Focus", link: "#" }},\n'
    js_content += "  ]\n"
    
    js_content += "};\n"
    
    with open(slider_data_file, "w") as f:
        f.write(js_content)
        
    print(f"Slider Data generated at {slider_data_file}")

if __name__ == "__main__":
    generate_gallery()
