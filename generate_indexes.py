import os
import datetime
import math

ROOT_DIR = r"c:\Users\Syed Amir\Desktop\webdev-practice"
EXCLUDE_DIRS = {'.git', '.vscode', '.agents', '.gemini', 'node_modules', '.idea'}

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index of {rel_path}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {{
            --primary-blue: #2563eb;
            --light-blue: #eff6ff;
            --border-blue: #bfdbfe;
            --text-dark: #0f172a;
            --text-muted: #64748b;
            --bg-main: #f8fafc;
            --bg-card: #ffffff;
            --border-color: #e2e8f0;
        }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', system-ui, sans-serif; }}
        body {{ background-color: var(--bg-main); color: var(--text-dark); line-height: 1.6; min-height: 100vh; display: flex; flex-direction: column; }}
        
        .header {{ background-color: var(--bg-card); border-bottom: 1px solid var(--border-color); padding: 2rem 0; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }}
        .container {{ max-width: 1000px; margin: 0 auto; padding: 0 2rem; width: 100%; }}
        
        h1 {{ font-size: 1.5rem; font-weight: 600; color: var(--text-dark); display: flex; align-items: center; gap: 0.5rem; word-break: break-all; }}
        h1 span {{ color: var(--text-muted); font-weight: 400; font-size: 1.2rem; }}
        
        .main-content {{ flex-grow: 1; padding: 2rem 0; }}
        
        .card {{ background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); overflow: hidden; margin-bottom: 2rem; }}
        
        table {{ width: 100%; border-collapse: collapse; text-align: left; }}
        th {{ background-color: var(--bg-main); color: var(--text-muted); font-weight: 600; font-size: 0.85rem; padding: 1rem 1.5rem; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border-color); }}
        td {{ padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-color); color: var(--text-dark); font-size: 0.95rem; }}
        
        tr:last-child td {{ border-bottom: none; }}
        tr:hover td {{ background-color: var(--light-blue); }}
        
        .name-cell {{ display: flex; align-items: center; gap: 0.75rem; font-weight: 500; }}
        .icon {{ font-size: 1.2rem; }}
        
        a {{ color: var(--text-dark); text-decoration: none; transition: color 0.2s; }}
        tr:hover a {{ color: var(--primary-blue); }}
        
        .size-cell, .date-cell {{ color: var(--text-muted); font-size: 0.9rem; }}
        
        .parent-link {{ display: inline-flex; align-items: center; gap: 0.5rem; color: var(--primary-blue); font-weight: 500; text-decoration: none; margin-bottom: 1.5rem; padding: 0.6rem 1.2rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }}
        .parent-link:hover {{ background: var(--light-blue); border-color: var(--primary-blue); transform: translateY(-2px); }}
        
        .empty-state {{ padding: 3rem; text-align: center; color: var(--text-muted); font-style: italic; }}
        
        .footer {{ text-align: center; padding: 2rem 0; color: var(--text-muted); font-size: 0.9rem; border-top: 1px solid var(--border-color); background: var(--bg-card); mt-auto }}
        
        @media (max-width: 600px) {{
            th:nth-child(3), td:nth-child(3) {{ display: none; }}
            .parent-link {{ width: 100%; justify-content: center; }}
        }}
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <h1><span>Index of</span> {rel_path}</h1>
        </div>
    </header>

    <main class="main-content container">
        {parent_link}
        <div class="card">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Date Modified</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    </main>

    <footer class="footer">
        <div class="container">Code Academy Directory Explorer</div>
    </footer>
</body>
</html>
"""

ROW_TEMPLATE = """
<tr>
    <td>
        <div class="name-cell">
            <span class="icon">{icon}</span>
            <a href="{link}">{name}</a>
        </div>
    </td>
    <td class="size-cell">{size}</td>
    <td class="date-cell">{date}</td>
</tr>
"""

def format_size(size_bytes):
    if size_bytes == 0:
        return "0 B"
    size_name = ("B", "KB", "MB", "GB", "TB")
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = math.pow(1024, i)
    s = round(size_bytes / p, 1)
    return f"{s} {size_name[i]}"

def format_date(timestamp):
    dt = datetime.datetime.fromtimestamp(timestamp)
    return dt.strftime("%b %d, %Y %I:%M %p")

def get_icon(is_dir, filename):
    if is_dir:
        return "📁"
    ext = os.path.splitext(filename)[1].lower()
    if ext == '.html': return "🌐"
    if ext == '.css': return "🎨"
    if ext in ['.js', '.ts', '.json']: return "⚡"
    if ext in ['.png', '.jpg', '.jpeg', '.gif', '.svg']: return "🖼️"
    if ext == '.md': return "📝"
    if ext in ['.zip', '.rar']: return "📦"
    if ext in ['.py', '.java', '.cpp', '.c']: return "💻"
    return "📄"

def generate_index_for_dir(current_dir):
    try:
        items = os.listdir(current_dir)
    except PermissionError:
        return

    dirs = []
    files = []
    
    for item in items:
        # Skip excluded, the index file itself, and the generator script
        if item in EXCLUDE_DIRS or item == 'index.html' or item == 'generate_indexes.py':
            continue
            
        path = os.path.join(current_dir, item)
        try:
            stat = os.stat(path)
            is_dir = os.path.isdir(path)
            
            entry = {
                'name': item,
                'is_dir': is_dir,
                'size': stat.st_size if not is_dir else 0,
                'date': stat.st_mtime,
                'link': item + '/' if is_dir else item
            }
            
            if is_dir:
                dirs.append(entry)
            else:
                files.append(entry)
        except OSError:
            continue

    dirs.sort(key=lambda x: x['name'].lower())
    files.sort(key=lambda x: x['name'].lower())
    
    all_items = dirs + files
    rows_html = ""
    
    if not all_items:
        rows_html = '<tr><td colspan="3"><div class="empty-state">This folder is empty.</div></td></tr>'
    else:
        for item in all_items:
            icon = get_icon(item['is_dir'], item['name'])
            size_str = "-" if item['is_dir'] else format_size(item['size'])
            date_str = format_date(item['date'])
            
            rows_html += ROW_TEMPLATE.format(
                icon=icon,
                link=item['link'],
                name=item['name'],
                size=size_str,
                date=date_str
            )
        
    rel_path = os.path.relpath(current_dir, ROOT_DIR).replace('\\', '/')
    if rel_path == '.':
        rel_path = '/'
    else:
        rel_path = '/' + rel_path + '/'
        
    parent_link = ""
    if current_dir != ROOT_DIR:
        parent_link = '<a href="../" class="parent-link"><span>↖️</span> Go up to Parent Directory</a>'

    html_content = HTML_TEMPLATE.format(
        rel_path=rel_path,
        parent_link=parent_link,
        rows=rows_html
    )
    
    index_path = os.path.join(current_dir, 'index.html')
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

def walk_and_generate(start_dir):
    for root, dirs, files in os.walk(start_dir):
        # Modify dirs in-place to skip excluded directories
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        # Don't overwrite the main root index.html we created earlier
        if root != ROOT_DIR:
            generate_index_for_dir(root)
            print(f"Generated index for: {root}")

if __name__ == "__main__":
    walk_and_generate(ROOT_DIR)
    print("Done generating indexes.")
