# Image Gallery

A modern, responsive image gallery built with HTML, CSS, and JavaScript featuring smooth animations, lightbox view, and category filtering.

## Features

### ✨ Core Features
- **Responsive Grid Layout** - Adapts to different screen sizes
- **Lightbox View** - Click any image to view in full-screen lightbox
- **Navigation Controls** - Next/Previous buttons in lightbox
- **Keyboard Navigation** - Arrow keys, spacebar, and ESC key support
- **Touch/Swipe Support** - Mobile-friendly swipe navigation
- **Category Filtering** - Filter images by Nature, City, Portrait, Abstract
- **Search Functionality** - Search images by title, description, or category
- **Hover Effects** - Smooth animations and overlay effects
- **Lazy Loading** - Images load as they come into view
- **Error Handling** - Fallback for broken images

### 🎨 Visual Features
- **Smooth Transitions** - CSS animations and transitions throughout
- **Gradient Background** - Beautiful gradient backdrop
- **Glass Morphism** - Modern frosted glass effect on buttons
- **Staggered Loading** - Images appear with cascading animation
- **Responsive Design** - Works on desktop, tablet, and mobile

## File Structure

```
Image Gallery/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## How to Use

1. **Open the Gallery**: Open `index.html` in your web browser
2. **Browse Images**: Scroll through the grid of images
3. **Filter by Category**: Use the filter buttons at the top
4. **Search Images**: Use the search bar to find specific images
5. **View in Lightbox**: Click any image to open in lightbox mode
6. **Navigate**: Use arrow keys, buttons, or swipe gestures to navigate

## Keyboard Shortcuts (in Lightbox)

- `→` or `Space` - Next image
- `←` - Previous image  
- `Esc` - Close lightbox

## Mobile Features

- **Touch Navigation** - Swipe left/right to navigate images
- **Responsive Layout** - Optimized for mobile screens
- **Touch-Friendly Buttons** - Larger touch targets on mobile

## Customization

### Adding Your Own Images

Replace the sample images in `index.html`:

```html
<div class="gallery-item" data-category="your-category">
    <img src="path/to/your/image.jpg" alt="Your Image" loading="lazy">
    <div class="overlay">
        <h3>Your Image Title</h3>
        <p>Your image description</p>
    </div>
</div>
```

### Adding New Categories

1. Add a new filter button in the header:
```html
<button class="filter-btn" data-filter="new-category">New Category</button>
```

2. Add images with the new category:
```html
<div class="gallery-item" data-category="new-category">
    <!-- image content -->
</div>
```

### Styling Customization

- **Colors**: Modify the CSS gradient and color variables
- **Animations**: Adjust transition durations and easing functions
- **Layout**: Change grid columns and spacing in the `.gallery` class
- **Effects**: Customize hover effects and transforms

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Performance Features

- **Lazy Loading** - Images load only when needed
- **Image Preloading** - Adjacent images preload for smooth navigation
- **Optimized Animations** - Hardware-accelerated CSS transforms
- **Efficient Filtering** - Fast DOM manipulation for category filtering

## Technical Details

- **Pure JavaScript** - No external libraries required
- **CSS Grid** - Modern layout system
- **Intersection Observer** - For lazy loading
- **Touch Events** - For mobile swipe navigation
- **CSS Custom Properties** - For easy theming

Enjoy your beautiful image gallery! 🖼️✨
