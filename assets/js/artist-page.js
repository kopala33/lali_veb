document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    const artistName = decodeURIComponent(params.get('artist'));

    if (typeof artworks === 'undefined' || typeof artists === 'undefined') {
        document.getElementById('artist-profile').innerHTML = '<h1>Error: Data could not be loaded.</h1>';
        return;
    }

    if (artistName && artists[artistName]) {
        const artistData = artists[artistName];
        document.title = `${artistName} - Lali Art Gallery`;
        document.getElementById('artist-avatar-img').src = artistData.avatar;
        document.getElementById('artist-name-title').textContent = artistName;
        document.getElementById('artist-statement').textContent = artistData.statement;

        const allArtworks = Object.values(artworks).flat();
        const artistWorks = allArtworks.filter(art => art.artist === artistName);
        
        const grid = document.getElementById('artist-artwork-grid');
        grid.innerHTML = '';

        if (artistWorks.length === 0) {
            grid.innerHTML = '<p>This artist has no available works at the moment.</p>';
        } else {
            artistWorks.forEach(art => {
                const card = document.createElement('div');
                card.className = 'product-card-item';
                card.dataset.id = art.id;
                card.dataset.title = art.title;
                card.dataset.price = art.price;
                card.dataset.img = art.img;

                // --- *** ცვლილება აქ: ბმული დეტალურ გვერდზე *** ---
                card.innerHTML = `
                    <a href="artwork-detail.html?id=${art.id}" class="product-link-wrapper">
                        <div class="product-image-wrapper">
                            <img src="${art.img}" alt="${art.title}">
                        </div>
                        <div class="product-info-wrapper-top">
                            <h3>${art.title}</h3>
                        </div>
                    </a>
                    <div class="product-info-wrapper-bottom">
                        <div class="price-tag">${art.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                        <button class="btn-add-to-cart">Add to Cart</button>
                    </div>
                `;
                grid.appendChild(card);
            });
        }
        
        grid.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-add-to-cart')) {
                e.preventDefault();
                const card = e.target.closest('.product-card-item');
                const productImage = card.querySelector('.product-image-wrapper img');
                createFlyToCartAnimation(productImage);
                const product = { id: card.dataset.id, title: card.dataset.title, price: parseFloat(card.dataset.price), img: card.dataset.img, quantity: 1 };
                addToCart(product);
                e.target.textContent = 'Added!';
                e.target.classList.add('added');
                setTimeout(() => { e.target.textContent = 'Add to Cart'; e.target.classList.remove('added'); }, 2000);
            }
        });

    } else {
        document.getElementById('artist-profile').innerHTML = '<h1>Artist not found.</h1>';
        document.querySelector('.artist-works-section').style.display = 'none';
    }

    // ... დანარჩენი ფუნქციები (addToCart, updateCartIcon, createFlyToCartAnimation) უცვლელია ...
    function createFlyToCartAnimation(imgElement) { const cartIcon = document.querySelector('.cart-icon'); if (!imgElement || !cartIcon) return; const imgRect = imgElement.getBoundingClientRect(); const cartRect = cartIcon.getBoundingClientRect(); const flyingImg = document.createElement('div'); flyingImg.classList.add('fly-to-cart-animation'); flyingImg.style.backgroundImage = `url(${imgElement.src})`; flyingImg.style.left = `${imgRect.left}px`; flyingImg.style.top = `${imgRect.top}px`; flyingImg.style.width = `${imgRect.width}px`; flyingImg.style.height = `${imgRect.height}px`; document.body.appendChild(flyingImg); requestAnimationFrame(() => { setTimeout(() => { flyingImg.style.left = `${cartRect.left + cartRect.width / 2}px`; flyingImg.style.top = `${cartRect.top + cartRect.height / 2}px`; flyingImg.style.width = '20px'; flyingImg.style.height = '20px'; flyingImg.style.opacity = '0'; }, 0); }); setTimeout(() => { flyingImg.remove(); }, 800); }
    function addToCart(product) { let cart = JSON.parse(localStorage.getItem('laliArtCart')) || []; const existingProductIndex = cart.findIndex(item => item.id === product.id); if (existingProductIndex > -1) { cart[existingProductIndex].quantity += 1; } else { cart.push(product); } localStorage.setItem('laliArtCart', JSON.stringify(cart)); updateCartIcon(); }
    function updateCartIcon() { let cart = JSON.parse(localStorage.getItem('laliArtCart')) || []; const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); const cartCountSpan = document.querySelector('.cart-item-count'); if (cartCountSpan) { cartCountSpan.textContent = totalItems; cartCountSpan.dataset.count = totalItems; cartCountSpan.classList.add('updated'); setTimeout(() => cartCountSpan.classList.remove('updated'), 300); } }
    
    updateCartIcon();
});