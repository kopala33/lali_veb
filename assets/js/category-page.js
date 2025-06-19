document.addEventListener('DOMContentLoaded', () => {
    // DOM ელემენტები
    const grid = document.getElementById('artwork-grid');
    const titleEl = document.querySelector('.collection-title');
    const artistFilter = document.getElementById('filter-artist');
    const priceMinFilter = document.getElementById('filter-price-min');
    const priceMaxFilter = document.getElementById('filter-price-max');
    const sortByFilter = document.getElementById('sort-by');
    const resetBtn = document.getElementById('reset-filters-btn');

    let currentArtworks = []; // ნამუშევრები, რომლებიც ამ კატეგორიაშია
    let displayedArtworks = []; // ნამუშევრები, რომლებიც ამჟამად ეკრანზეა

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    function initializePage() {
        if (typeof artworks === 'undefined') {
            displayError('Artwork data could not be loaded.');
            return;
        }

        if (category && artworks[category]) {
            const formattedTitle = formatCategoryName(category);
            document.title = `${formattedTitle} - Lali Art Gallery`;
            titleEl.textContent = formattedTitle;
            
            currentArtworks = artworks[category];
            displayedArtworks = [...currentArtworks]; // თავიდან ყველა ნაჩვენებია

            populateArtistFilter(currentArtworks);
            renderArtworks(displayedArtworks);
        } else {
            displayError('Category not found. Please select a category from the <a href="gallery.html">gallery</a>.');
        }

        updateWishlistIcon();
        updateCartIcon();
        addEventListeners();
    }

    function renderArtworks(items) {
        grid.innerHTML = '';
        if (items.length === 0) {
            grid.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1;">No artworks match your criteria.</p>';
            return;
        }
        
        const wishlist = JSON.parse(localStorage.getItem('laliArtWishlist')) || [];

        items.forEach(art => {
            const isFavorited = wishlist.includes(art.id);
            const card = document.createElement('div');
            card.className = 'product-card-item';
            
            card.innerHTML = `
                <div class="product-image-container">
                     <a href="artwork-detail.html?id=${art.id}" class="product-link-wrapper">
                        <div class="product-image-wrapper">
                            <img src="${art.img}" alt="${art.title}">
                        </div>
                    </a>
                    <button class="btn-wishlist ${isFavorited ? 'active' : ''}" data-id="${art.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="product-info-wrapper-top">
                    <h3><a href="artwork-detail.html?id=${art.id}">${art.title}</a></h3>
                </div>
                <div class="product-info-wrapper-middle">
                     <p class="artist-name">By <a href="artist-page.html?artist=${encodeURIComponent(art.artist)}">${art.artist}</a></p>
                </div>
                <div class="product-info-wrapper-bottom">
                    <div class="price-tag">${art.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                    <button class="btn-add-to-cart" data-id="${art.id}">Add to Cart</button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function applyFiltersAndSort() {
        let filtered = [...currentArtworks];

        const selectedArtist = artistFilter.value;
        if (selectedArtist !== 'all') {
            filtered = filtered.filter(art => art.artist === selectedArtist);
        }

        const minPrice = parseFloat(priceMinFilter.value) || 0;
        const maxPrice = parseFloat(priceMaxFilter.value) || Infinity;
        filtered = filtered.filter(art => art.price >= minPrice && art.price <= maxPrice);

        const sortBy = sortByFilter.value;
        switch (sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }
        
        displayedArtworks = filtered;
        renderArtworks(displayedArtworks);
    }
    
    function addEventListeners() {
        artistFilter.addEventListener('change', applyFiltersAndSort);
        priceMinFilter.addEventListener('input', applyFiltersAndSort);
        priceMaxFilter.addEventListener('input', applyFiltersAndSort);
        sortByFilter.addEventListener('change', applyFiltersAndSort);

        resetBtn.addEventListener('click', () => {
            artistFilter.value = 'all';
            priceMinFilter.value = '';
            priceMaxFilter.value = '';
            sortByFilter.value = 'default';
            displayedArtworks = [...currentArtworks];
            renderArtworks(displayedArtworks);
        });

        grid.addEventListener('click', (e) => {
            const wishlistBtn = e.target.closest('.btn-wishlist');
            const cartBtn = e.target.closest('.btn-add-to-cart');

            if (wishlistBtn) {
                toggleWishlist(wishlistBtn.dataset.id, wishlistBtn);
            } else if (cartBtn) {
                const product = currentArtworks.find(art => art.id === cartBtn.dataset.id);
                addToCart(product);

                const card = cartBtn.closest('.product-card-item');
                const productImage = card.querySelector('.product-image-wrapper img');
                createFlyToCartAnimation(productImage);
            }
        });
    }

    function toggleWishlist(id, button) {
        let wishlist = JSON.parse(localStorage.getItem('laliArtWishlist')) || [];
        const buttonIcon = button.querySelector('i');
        if (wishlist.includes(id)) {
            wishlist = wishlist.filter(itemId => itemId !== id);
            button.classList.remove('active');
        } else {
            wishlist.push(id);
            button.classList.add('active');
        }
        localStorage.setItem('laliArtWishlist', JSON.stringify(wishlist));
        updateWishlistIcon();
    }
    
    function populateArtistFilter(items) {
        const artists = [...new Set(items.map(item => item.artist))];
        artistFilter.innerHTML = '<option value="all">All Artists</option>';
        artists.sort().forEach(artist => {
            const option = document.createElement('option');
            option.value = artist;
            option.textContent = artist;
            artistFilter.appendChild(option);
        });
    }
    
    function formatCategoryName(slug) { return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); }
    function displayError(message) { titleEl.textContent = 'Error'; grid.innerHTML = `<p style="text-align: center; width: 100%; grid-column: 1 / -1;">${message}</p>`; document.querySelector('.filters-section').style.display = 'none'; }
    function updateWishlistIcon() { const w = JSON.parse(localStorage.getItem('laliArtWishlist')) || []; document.querySelectorAll('.wishlist-item-count').forEach(s => { s.textContent = w.length; s.dataset.count = w.length; }); }
    function updateCartIcon() { const c = JSON.parse(localStorage.getItem('laliArtCart')) || []; const t = c.reduce((s, i) => s + i.quantity, 0); document.querySelectorAll('.cart-item-count').forEach(s => { s.textContent = t; s.dataset.count = t; }); }
    function addToCart(product) { let cart = JSON.parse(localStorage.getItem('laliArtCart')) || []; const existingProductIndex = cart.findIndex(item => item.id === product.id); if (existingProductIndex > -1) { cart[existingProductIndex].quantity += 1; } else { product.quantity = 1; cart.push(product); } localStorage.setItem('laliArtCart', JSON.stringify(cart)); updateCartIcon(); }
    function createFlyToCartAnimation(imgElement) { const cartIcon = document.querySelector('.cart-icon'); if (!imgElement || !cartIcon) return; const imgRect = imgElement.getBoundingClientRect(); const cartRect = cartIcon.getBoundingClientRect(); const flyingImg = document.createElement('div'); flyingImg.classList.add('fly-to-cart-animation'); flyingImg.style.backgroundImage = `url(${imgElement.src})`; flyingImg.style.left = `${imgRect.left}px`; flyingImg.style.top = `${imgRect.top}px`; flyingImg.style.width = `${imgRect.width}px`; flyingImg.style.height = `${imgRect.height}px`; document.body.appendChild(flyingImg); requestAnimationFrame(() => { setTimeout(() => { flyingImg.style.left = `${cartRect.left + cartRect.width / 2}px`; flyingImg.style.top = `${cartRect.top + cartRect.height / 2}px`; flyingImg.style.width = '20px'; flyingImg.style.height = '20px'; flyingImg.style.opacity = '0'; }, 0); }); setTimeout(() => { flyingImg.remove(); }, 800); }

    initializePage();
});