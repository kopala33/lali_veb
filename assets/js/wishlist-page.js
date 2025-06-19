document.addEventListener('DOMContentLoaded', () => {
    const wishlistGrid = document.getElementById('wishlist-grid');
    const wishlist = JSON.parse(localStorage.getItem('laliArtWishlist')) || [];
    const allArtworks = Object.values(artworks).flat();

    const renderWishlist = () => {
        wishlistGrid.innerHTML = '';
        const currentWishlist = JSON.parse(localStorage.getItem('laliArtWishlist')) || [];

        if (currentWishlist.length === 0) {
            wishlistGrid.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1;">Your wishlist is empty. <a href="gallery.html">Start exploring!</a></p>';
            return;
        }

        const wishlistItems = allArtworks.filter(art => currentWishlist.includes(art.id));

        wishlistItems.forEach(art => {
            const card = document.createElement('div');
            card.className = 'product-card-item';
            card.innerHTML = `
                <a href="artwork-detail.html?id=${art.id}" class="product-link-wrapper">
                    <div class="product-image-wrapper">
                        <img src="${art.img}" alt="${art.title}">
                    </div>
                    <div class="product-info-wrapper-top">
                        <h3>${art.title}</h3>
                    </div>
                </a>
                <div class="product-info-wrapper-middle">
                     <p class="artist-name">By <a href="artist-page.html?artist=${encodeURIComponent(art.artist)}">${art.artist}</a></p>
                </div>
                <div class="product-info-wrapper-bottom">
                    <div class="price-tag">${art.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                    <button class="btn-remove-from-wishlist" data-id="${art.id}"><i class="fas fa-times"></i> Remove</button>
                </div>
            `;
            wishlistGrid.appendChild(card);
        });

        // ღილაკებზე ივენთების დამატება
        document.querySelectorAll('.btn-remove-from-wishlist').forEach(button => {
            button.addEventListener('click', (e) => {
                const artworkId = e.target.dataset.id;
                removeFromWishlist(artworkId);
            });
        });
    };

    const removeFromWishlist = (id) => {
        let currentWishlist = JSON.parse(localStorage.getItem('laliArtWishlist')) || [];
        currentWishlist = currentWishlist.filter(itemId => itemId !== id);
        localStorage.setItem('laliArtWishlist', JSON.stringify(currentWishlist));
        updateWishlistIcon();
        renderWishlist(); // ხელახლა დავხატოთ სია
    };

    const updateWishlistIcon = () => {
        const wishlist = JSON.parse(localStorage.getItem('laliArtWishlist')) || [];
        document.querySelectorAll('.wishlist-item-count').forEach(span => {
            span.textContent = wishlist.length;
            span.dataset.count = wishlist.length;
        });
    };
    
    const updateCartIcon = () => {
        const cart = JSON.parse(localStorage.getItem('laliArtCart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-item-count').forEach(span => {
            span.textContent = totalItems;
            span.dataset.count = totalItems;
        });
    };

    renderWishlist();
    updateWishlistIcon();
    updateCartIcon();
});