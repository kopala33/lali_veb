document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('artwork-detail-content');
    const params = new URLSearchParams(window.location.search);
    const artworkId = params.get('id');

    if (!artworkId || typeof artworks === 'undefined') {
        displayError();
        return;
    }

    const allArtworks = Object.values(artworks).flat();
    const artwork = allArtworks.find(art => art.id === artworkId);

    if (!artwork) {
        displayError();
        return;
    }

    displayArtwork(artwork);
    updateWishlistIcon();
    updateCartIcon();

    function displayError() {
        contentArea.innerHTML = `
            <div class="artwork-detail-layout error-layout">
                <h1>Artwork Not Found</h1>
                <p>The artwork you are looking for does not exist or has been removed.</p>
                <a href="gallery.html" class="cta-button">Back to Gallery</a>
            </div>`;
    }

    function displayArtwork(art) {
        document.title = `${art.title} by ${art.artist} - Lali Art Gallery`;
        const wishlist = JSON.parse(localStorage.getItem('laliArtWishlist')) || [];
        const isFavorited = wishlist.includes(art.id);

        contentArea.innerHTML = `
            <div class="artwork-detail-layout">
                <div class="artwork-image-column">
                    <!-- Drift ბიბლიოთეკას სჭირდება data-zoom ატრიბუტი -->
                    <img src="${art.img}" alt="${art.title}" id="detail-image" data-zoom="${art.img}">
                </div>
                <div class="artwork-info-column">
                    <h1 class="artwork-title">${art.title}</h1>
                    <h2 class="artwork-artist">By <a href="artist-page.html?artist=${encodeURIComponent(art.artist)}">${art.artist}</a></h2>
                    
                    <div class="artwork-actions">
                         <div class="artwork-price">${art.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                         <button class="btn-wishlist-detail ${isFavorited ? 'active' : ''}" data-id="${art.id}">
                            <i class="fas fa-heart"></i> <span>${isFavorited ? 'In Wishlist' : 'Add to Wishlist'}</span>
                         </button>
                    </div>

                    <p class="artwork-description">${art.description}</p>
                    
                    <div class="artwork-meta">
                        <p><strong>Medium:</strong> ${art.medium}</p>
                        <p><strong>Dimensions:</strong> ${art.dimensions}</p>
                        <p><strong>Year:</strong> ${art.year}</p>
                    </div>

                    <button class="cta-button btn-add-to-cart-detail">Add to Cart</button>
                </div>
            </div>`;
        
        setupZoom();
        addEventListeners(art);
    }
    
    function addEventListeners(art) {
        // ... (დანარჩენი ლოგიკა უცვლელია, ამიტომ შეგვიძლია დავტოვოთ)
        const addToCartBtn = contentArea.querySelector('.btn-add-to-cart-detail');
        addToCartBtn.addEventListener('click', (e) => {
            const productImage = document.getElementById('detail-image');
            createFlyToCartAnimation(productImage);
            const product = { id: art.id, title: art.title, price: art.price, img: art.img, quantity: 1 };
            addToCart(product);
            e.target.textContent = 'Added!';
            e.target.classList.add('added');
            setTimeout(() => {
                e.target.textContent = 'Add to Cart';
                e.target.classList.remove('added');
            }, 2000);
        });
        const wishlistBtn = contentArea.querySelector('.btn-wishlist-detail');
        wishlistBtn.addEventListener('click', () => {
             toggleWishlist(art.id, wishlistBtn);
        });
    }

    // --- ახალი, ბიბლიოთეკაზე დაფუძნებული ზუმის ლოგიკა ---
    function setupZoom() {
        const image = document.querySelector('#detail-image');
        if (image) {
            new Drift(image, {
                // ზუმის პანელი გამოჩნდება სურათის გვერდით
                paneContainer: document.querySelector('.artwork-image-column'),
                inlinePane: false, // არ ჩაშენდეს სურათში
                hoverBoundingBox: true // გამოჩნდეს ჩარჩო მაუსის მიტანისას
            });
        }
    }
    
    // --- UTILITY FUNCTIONS (უცვლელი) ---
    function addToCart(product) { let cart = JSON.parse(localStorage.getItem('laliArtCart')) || []; const existingProductIndex = cart.findIndex(item => item.id === product.id); if (existingProductIndex > -1) { cart[existingProductIndex].quantity += 1; } else { product.quantity = 1; cart.push(product); } localStorage.setItem('laliArtCart', JSON.stringify(cart)); updateCartIcon(); }
    function toggleWishlist(id, button) { let wishlist = JSON.parse(localStorage.getItem('laliArtWishlist')) || []; const span = button.querySelector('span'); if (wishlist.includes(id)) { wishlist = wishlist.filter(itemId => itemId !== id); button.classList.remove('active'); if(span) span.textContent = 'Add to Wishlist'; } else { wishlist.push(id); button.classList.add('active'); if(span) span.textContent = 'In Wishlist'; } localStorage.setItem('laliArtWishlist', JSON.stringify(wishlist)); updateWishlistIcon(); }
    function updateCartIcon() { let cart = JSON.parse(localStorage.getItem('laliArtCart')) || []; const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); document.querySelectorAll('.cart-item-count').forEach(s => { s.textContent = totalItems; s.dataset.count = totalItems; s.classList.add('updated'); setTimeout(() => s.classList.remove('updated'), 300); }); }
    function updateWishlistIcon() { const wishlist = JSON.parse(localStorage.getItem('laliArtWishlist')) || []; document.querySelectorAll('.wishlist-item-count').forEach(span => { span.textContent = wishlist.length; span.dataset.count = wishlist.length; }); }
    function createFlyToCartAnimation(imgElement) { const cartIcon = document.querySelector('.cart-icon'); if (!imgElement || !cartIcon) return; const imgRect = imgElement.getBoundingClientRect(); const cartRect = cartIcon.getBoundingClientRect(); const flyingImg = document.createElement('div'); flyingImg.classList.add('fly-to-cart-animation'); flyingImg.style.backgroundImage = `url(${imgElement.src})`; flyingImg.style.left = `${imgRect.left}px`; flyingImg.style.top = `${imgRect.top}px`; flyingImg.style.width = `${imgRect.width}px`; flyingImg.style.height = `${imgRect.height}px`; document.body.appendChild(flyingImg); requestAnimationFrame(() => { setTimeout(() => { flyingImg.style.left = `${cartRect.left + cartRect.width / 2}px`; flyingImg.style.top = `${cartRect.top + cartRect.height / 2}px`; flyingImg.style.width = '20px'; flyingImg.style.height = '20px'; flyingImg.style.opacity = '0'; }, 0); }); setTimeout(() => { flyingImg.remove(); }, 800); }
});