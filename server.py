from flask import Flask, jsonify, request, send_from_directory
import json
import os
import uuid

app = Flask(__name__)

# Default wallpapers and categories
default_wallpapers = [
    # Nature wallpapers
    {
        "id": "nature-1",
        "title": "Mountain Lake",
        "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        "category": "Nature",
        "size": {"width": 1080, "height": 1920},
        "downloads": 128
    },
    {
        "id": "nature-2",
        "title": "Forest Path",
        "imageUrl": "https://images.unsplash.com/photo-1511497584788-876760111969",
        "category": "Nature",
        "size": {"width": 1080, "height": 1920},
        "downloads": 95
    },
    {
        "id": "nature-3",
        "title": "Autumn Colors",
        "imageUrl": "https://images.unsplash.com/photo-1507783548227-544c3b8fc065",
        "category": "Nature",
        "size": {"width": 1080, "height": 1920},
        "downloads": 152
    },
    # Abstract wallpapers
    {
        "id": "abstract-1",
        "title": "Color Burst",
        "imageUrl": "https://images.unsplash.com/photo-1541701494587-cb58502866ab",
        "category": "Abstract",
        "size": {"width": 1080, "height": 1920},
        "downloads": 243
    },
    # Space wallpapers
    {
        "id": "space-1",
        "title": "Galaxy Clusters",
        "imageUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
        "category": "Space",
        "size": {"width": 1080, "height": 1920},
        "downloads": 328
    }
]

default_categories = ["Nature", "Abstract", "Animals", "Space"]

# In-memory storage for wallpapers and categories
wallpapers_data = []
categories_data = []

# Ensure data directory exists
if not os.path.exists('data'):
    os.makedirs('data')

# Try to load existing data
try:
    # Try to load from data files if they exist
    if os.path.exists('data/wallpapers.json'):
        with open('data/wallpapers.json', 'r') as f:
            wallpapers_data = json.load(f)
    else:
        # Use default wallpapers if no file exists
        wallpapers_data = default_wallpapers
        # Save default wallpapers to file
        with open('data/wallpapers.json', 'w') as f:
            json.dump(wallpapers_data, f)
    
    if os.path.exists('data/categories.json'):
        with open('data/categories.json', 'r') as f:
            categories_data = json.load(f)
    else:
        # Use default categories if no file exists
        categories_data = default_categories
        # Save default categories to file
        with open('data/categories.json', 'w') as f:
            json.dump(categories_data, f)
except Exception as e:
    print(f"Error loading data: {e}")
    # If loading fails, use default arrays
    wallpapers_data = default_wallpapers
    categories_data = default_categories
    
    # Try to save the defaults
    try:
        with open('data/wallpapers.json', 'w') as f:
            json.dump(wallpapers_data, f)
        with open('data/categories.json', 'w') as f:
            json.dump(categories_data, f)
    except Exception as e:
        print(f"Error saving default data: {e}")

# API Endpoints
@app.route('/api/wallpapers', methods=['GET', 'POST'])
def handle_wallpapers():
    global wallpapers_data
    
    if request.method == 'GET':
        return jsonify({
            'success': True,
            'wallpapers': wallpapers_data,
            'timestamp': 'server-timestamp'
        })
    
    elif request.method == 'POST':
        data = request.json
        if not data or 'wallpapers' not in data:
            return jsonify({
                'success': False,
                'error': 'Invalid data format'
            }), 400
        
        wallpapers_data = data['wallpapers']
        
        # Save to file for persistence
        try:
            with open('data/wallpapers.json', 'w') as f:
                json.dump(wallpapers_data, f)
        except Exception as e:
            print(f"Error saving wallpapers: {e}")
        
        return jsonify({
            'success': True,
            'message': 'Wallpapers updated successfully',
            'count': len(wallpapers_data)
        })

@app.route('/api/categories', methods=['GET', 'POST'])
def handle_categories():
    global categories_data
    
    if request.method == 'GET':
        return jsonify({
            'success': True,
            'categories': categories_data,
            'timestamp': 'server-timestamp'
        })
    
    elif request.method == 'POST':
        data = request.json
        if not data or 'categories' not in data:
            return jsonify({
                'success': False,
                'error': 'Invalid data format'
            }), 400
        
        categories_data = data['categories']
        
        # Save to file for persistence
        try:
            with open('data/categories.json', 'w') as f:
                json.dump(categories_data, f)
        except Exception as e:
            print(f"Error saving categories: {e}")
        
        return jsonify({
            'success': True,
            'message': 'Categories updated successfully',
            'count': len(categories_data)
        })

# Serve static files
@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    print("Server running at http://localhost:5000")
    print("- Main site: http://localhost:5000/index.html")
    print("- Admin panel: http://localhost:5000/admin.html")
    app.run(debug=True, host='0.0.0.0', port=5000) 