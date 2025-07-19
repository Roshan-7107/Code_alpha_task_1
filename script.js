
class ImageGallery {
    constructor() {
        this.currentImageIndex = 0;
        this.filteredImages = [];
        this.allImages = [];
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightboxImg');
        this.lightboxTitle = document.getElementById('lightboxTitle');
        this.lightboxDesc = document.getElementById('lightboxDesc');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFilterButtons();
        this.loadAllImages();
        this.setupKeyboardNavigation();
    }

    setupEventListeners() {

        document.addEventListener('click', (e) => {
            const galleryItem = e.target.closest('.gallery-item');
            if (galleryItem && !galleryItem.classList.contains('hidden')) {
                this.openLightbox(galleryItem);
            }
        });

        document.getElementById('nextBtn').addEventListener('click', () => this.nextImage());
        document.getElementById('prevBtn').addEventListener('click', () => this.prevImage());
        

        document.querySelector('.close-btn').addEventListener('click', () => this.closeLightbox());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });


        this.setupTouchNavigation();
    }

    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {

                filterButtons.forEach(b => b.classList.remove('active'));

                btn.classList.add('active');
                

                const filter = btn.getAttribute('data-filter');
                this.filterImages(filter);
            });
        });
    }

    loadAllImages() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        this.allImages = Array.from(galleryItems);
        this.filteredImages = [...this.allImages];
        

        this.originalOrder = this.allImages.map((item, index) => ({
            element: item,
            originalIndex: index
        }));
        

        this.allImages.forEach((item, index) => {
            const img = item.querySelector('img');
            img.style.animationDelay = `${index * 0.1}s`;
        });
    }

    filterImages(category) {
        const gallery = document.querySelector('.gallery');
        
        if (category === 'all') {

            gallery.innerHTML = '';
            

            this.originalOrder
                .sort((a, b) => a.originalIndex - b.originalIndex)
                .forEach(item => gallery.appendChild(item.element));
            

            this.allImages.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove('hidden');
                }, index * 50);
            });
            
            this.filteredImages = [...this.allImages];
        } else {
            const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
            
            const filteredItems = [];
            const nonFilteredItems = [];
            
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === category) {
                    filteredItems.push(item);
                } else {
                    nonFilteredItems.push(item);
                }
            });
            
  
            const reorderedItems = [...filteredItems, ...nonFilteredItems];
            

            gallery.innerHTML = '';
            reorderedItems.forEach(item => gallery.appendChild(item));

            filteredItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove('hidden');
                }, index * 50);
            });
            
            nonFilteredItems.forEach(item => {
                item.classList.add('hidden');
            });
            

            this.filteredImages = filteredItems;
        }
    }

    openLightbox(galleryItem) {
        const img = galleryItem.querySelector('img');
        const title = galleryItem.querySelector('.overlay h3').textContent;
        const desc = galleryItem.querySelector('.overlay p').textContent;
        
        
        this.currentImageIndex = this.filteredImages.indexOf(galleryItem);
        
        
        this.lightboxImg.src = img.src;
        this.lightboxImg.alt = img.alt;
        this.lightboxTitle.textContent = title;
        this.lightboxDesc.textContent = desc;
        
    
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        
        this.preloadAdjacentImages();
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    nextImage() {
        if (this.filteredImages.length === 0) return;
        
        this.currentImageIndex = (this.currentImageIndex + 1) % this.filteredImages.length;
        this.updateLightboxContent();
    }

    prevImage() {
        if (this.filteredImages.length === 0) return;
        
        this.currentImageIndex = this.currentImageIndex === 0 
            ? this.filteredImages.length - 1 
            : this.currentImageIndex - 1;
        this.updateLightboxContent();
    }

    updateLightboxContent() {
        const currentItem = this.filteredImages[this.currentImageIndex];
        const img = currentItem.querySelector('img');
        const title = currentItem.querySelector('.overlay h3').textContent;
        const desc = currentItem.querySelector('.overlay p').textContent;
        

        this.lightboxImg.style.opacity = '0';
        
        setTimeout(() => {
            this.lightboxImg.src = img.src;
            this.lightboxImg.alt = img.alt;
            this.lightboxTitle.textContent = title;
            this.lightboxDesc.textContent = desc;
            this.lightboxImg.style.opacity = '1';
        }, 150);
        
        this.preloadAdjacentImages();
    }

    preloadAdjacentImages() {

        const nextIndex = (this.currentImageIndex + 1) % this.filteredImages.length;
        const prevIndex = this.currentImageIndex === 0 
            ? this.filteredImages.length - 1 
            : this.currentImageIndex - 1;
        
        if (this.filteredImages[nextIndex]) {
            const nextImg = new Image();
            nextImg.src = this.filteredImages[nextIndex].querySelector('img').src;
        }
        
        if (this.filteredImages[prevIndex]) {
            const prevImg = new Image();
            prevImg.src = this.filteredImages[prevIndex].querySelector('img').src;
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextImage();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevImage();
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.closeLightbox();
                    break;
            }
        });
    }

    setupTouchNavigation() {
        let startX = 0;
        let startY = 0;
        
        this.lightboxImg.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.lightboxImg.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextImage(); 
                } else {
                    this.prevImage(); 
                }
            }
            
            startX = 0;
            startY = 0;
        });
    }
}


class ImageLoader {
    static addLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    static addImageErrorHandling() {
        const images = document.querySelectorAll('.gallery-item img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTE1MCAyMDBIMjUwVjIyNUgxNTBWMjAwWiIgZmlsbD0iI0QxRDVEQiIvPgo8L3N2Zz4K';
                this.alt = 'Image not available';
            });
        });
    }
}




document.addEventListener('DOMContentLoaded', () => {
    const gallery = new ImageGallery();
    

    ImageLoader.addLazyLoading();
    ImageLoader.addImageErrorHandling();
    

    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('Image Gallery initialized successfully!');
});
