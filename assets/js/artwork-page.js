document.addEventListener('DOMContentLoaded', () => {
    const artworkData = JSON.parse(localStorage.getItem('selectedArtwork'));

    if (!artworkData) {
        const contentArea = document.querySelector('.product-main-content');
        if(contentArea) {
            contentArea.innerHTML = '<h1>Artwork not found.</h1><p>Please select a piece from our <a href="geobrand-final-local.html">gallery</a>.</p>';
        }
        return;
    }

    // Populate details
    document.getElementById('artwork-title').textContent = artworkData.title;
    document.getElementById('artwork-artist').textContent = artworkData.artist;
    document.getElementById('artwork-image').src = artworkData.img;
    document.getElementById('artwork-description').textContent = artworkData.description;
    document.getElementById('artwork-medium').textContent = artworkData.medium;
    document.getElementById('artwork-dimensions').textContent = artworkData.dimensions;
    document.getElementById('artwork-year').textContent = artworkData.year;

    // Wishlist (Favorites) button logic
    const wishlistBtn = document.querySelector('.btn-add-to-wishlist');
    let wishlist = JSON.parse(localStorage.getItem('geoArtWishlist')) || [];

    const isFavorited = wishlist.some(item => item.id === artworkData.id);
    if(isFavorited) {
        wishlistBtn.classList.add('active');
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Favorited';
    }

    wishlistBtn.addEventListener('click', () => {
        let currentWishlist = JSON.parse(localStorage.getItem('geoArtWishlist')) || [];
        const itemIndex = currentWishlist.findIndex(item => item.id === artworkData.id);
        
        if (itemIndex > -1) {
            // Remove from favorites
            currentWishlist.splice(itemIndex, 1);
            wishlistBtn.classList.remove('active');
            wishlistBtn.innerHTML = '<i class="far fa-heart"></i> Add to Favorites';
        } else {
            // Add to favorites
            currentWishlist.push({id: artworkData.id, title: artworkData.title});
            wishlistBtn.classList.add('active');
            wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Favorited';
        }
        localStorage.setItem('geoArtWishlist', JSON.stringify(currentWishlist));
        
        // Update global icon
        const wishlistCountSpan = document.querySelector('.wishlist-item-count');
        if (wishlistCountSpan) {
            wishlistCountSpan.textContent = currentWishlist.length;
            wishlistCountSpan.classList.add('updated');
            setTimeout(() => wishlistCountSpan.classList.remove('updated'), 300);
        }
    });

    // Inquire Button Logic
    const inquireBtn = document.querySelector('.btn-inquire');
    inquireBtn.addEventListener('click', () => {
        const subject = `Inquiry about: ${artworkData.title} by ${artworkData.artist}`;
        const body = `Hello, I would like to inquire about the artwork "${artworkData.title}". Thank you.`;
        window.location.href = `mailto:info@geoart.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
});