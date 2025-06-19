document.addEventListener('DOMContentLoaded', () => {

    // --- Gallery Page Category Filter Logic ---
    const galleryFilters = document.querySelector('.category-filters');
    if (galleryFilters) {
        const filterButtonsContainer = galleryFilters.querySelector('.filter-buttons');
        const categoryCards = document.querySelectorAll('.category-grid .category-card');

        filterButtonsContainer.addEventListener('click', (e) => {
            const target = e.target;
            // Exit if a non-button element is clicked
            if (!target.matches('.filter-btn')) {
                return;
            }

            // Remove active class from all buttons
            filterButtonsContainer.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to the clicked button
            target.classList.add('active');

            const filterValue = target.getAttribute('data-filter');

            categoryCards.forEach(card => {
                const cardTags = card.getAttribute('data-tags');
                
                // Use 'block' for inline-block masonry items to make them visible
                if (filterValue === 'all' || cardTags.includes(filterValue)) {
                    card.style.display = 'inline-block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }


    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.primary-navigation');
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            const isVisible = primaryNav.getAttribute('data-visible') === 'true';
            primaryNav.setAttribute('data-visible', !isVisible);
            mobileNavToggle.setAttribute('aria-expanded', !isVisible);
        });
    }

    // --- Search Overlay Logic ---
    const searchIconToggle = document.querySelector('.search-icon-toggle');
    const searchOverlay = document.getElementById('search-overlay'); // Assuming you add an ID to your search overlay
    const searchCloseBtn = document.getElementById('search-close-btn'); // Assuming you add an ID to your search close button
    
    // Create search overlay if it doesn't exist
    if (searchIconToggle && !searchOverlay) {
        const overlay = document.createElement('div');
        overlay.className = 'search-overlay';
        overlay.id = 'search-overlay';
        overlay.innerHTML = `
            <button class="search-close-btn" id="search-close-btn">×</button>
            <form class="search-form">
                <input type="search" class="search-input" placeholder="Search for art, artists...">
                <button type="submit" class="search-submit-btn"><i class="fas fa-search"></i></button>
            </form>
        `;
        document.body.appendChild(overlay);
    }
    
    // Re-select elements after potential creation
    const searchIconToggleUpdated = document.querySelector('.search-icon-toggle');
    const searchOverlayUpdated = document.getElementById('search-overlay');
    const searchCloseBtnUpdated = document.getElementById('search-close-btn');
    
    if (searchIconToggleUpdated) {
        searchIconToggleUpdated.addEventListener('click', (e) => {
            e.preventDefault();
            if (searchOverlayUpdated && !searchOverlayUpdated.classList.contains('active')) {
                searchOverlayUpdated.classList.add('active');
                searchOverlayUpdated.querySelector('.search-input').focus();
            }
        });
    }
    if (searchCloseBtnUpdated) {
        searchCloseBtnUpdated.addEventListener('click', () => searchOverlayUpdated.classList.remove('active'));
    }
    

    // --- Update Cart Icon ---
    const updateCartIcon = () => {
        try {
            const cart = JSON.parse(localStorage.getItem('laliArtCart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const cartCountSpan = document.querySelector('.cart-item-count');
            if (cartCountSpan) {
                cartCountSpan.textContent = totalItems;
                cartCountSpan.dataset.count = totalItems;
            }
        } catch (e) {
            console.error("Error updating cart icon:", e);
        }
    };
    
    // --- Update Wishlist Icon ---
    const updateWishlistIcon = () => {
        try {
            const wishlist = JSON.parse(localStorage.getItem('laliArtWishlist')) || [];
            const wishlistCountSpan = document.querySelector('.wishlist-item-count');
            if(wishlistCountSpan){
                wishlistCountSpan.textContent = wishlist.length;
                wishlistCountSpan.dataset.count = wishlist.length;
            }
        } catch(e) {
            console.error("Error updating wishlist icon:", e);
        }
    };


    // --- Swiper.js Initialization for Homepage Gallery ---
    const swiperContainer = document.querySelector('.mySwiper');
    if (swiperContainer) {
        const swiper = new Swiper(".mySwiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            loop: true,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            on: {
                init: function () {
                    this.slides[this.activeIndex].classList.add('is-active-slide');
                },
                transitionEnd: function () {
                    this.slides.forEach(slide => {
                        slide.classList.remove('is-active-slide');
                    });
                    this.slides[this.activeIndex].classList.add('is-active-slide');
                },
            }
        });

        const swiperWrapper = document.querySelector('.swiper-container-wrapper');
        let slideInterval;

        swiperWrapper.addEventListener('mousemove', (e) => {
            const rect = swiperWrapper.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const containerWidth = rect.width;
            
            clearInterval(slideInterval);

            if (mouseX > containerWidth * 0.6) {
                slideInterval = setInterval(() => { swiper.slideNext(400); }, 500);
            } else if (mouseX < containerWidth * 0.4) {
                slideInterval = setInterval(() => { swiper.slidePrev(400); }, 500);
            }
        });

        swiperWrapper.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
        });
    }

    // --- User Authentication UI Management ---
    const checkUserStatus = () => {
        const userToken = localStorage.getItem('laliUserToken');
        const guestActions = document.getElementById('guest-actions');
        const userActions = document.getElementById('user-actions');

        if (!guestActions || !userActions) return;

        if (userToken) {
            // User is "logged in"
            guestActions.style.display = 'none';
            userActions.style.display = 'flex';
        } else {
            // User is a guest
            guestActions.style.display = 'flex';
            userActions.style.display = 'none';
        }
    };

    // --- Hide redundant auth links based on current page ---
    const hideRedundantLinks = () => {
        const pathname = window.location.pathname;
        const loginLink = document.getElementById('header-login-link');
        const registerLink = document.getElementById('header-register-link');
        const separator = document.getElementById('header-auth-separator');

        if (!loginLink || !registerLink || !separator) return; // Exit if elements not found

        if (pathname.includes('login.html')) {
            loginLink.style.display = 'none';
            separator.style.display = 'none';
        } else if (pathname.includes('register.html')) {
            registerLink.style.display = 'none';
            separator.style.display = 'none';
        }
    };

    const logout = () => {
        localStorage.removeItem('laliUserToken');
        localStorage.removeItem('laliUserName');
        alert('You have been logged out.');
        checkUserStatus(); // Update UI immediately
        window.location.href = 'index.html'; // Redirect to home
    };

    // Add event listener for logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // --- Initial Page Load Functions ---
    updateCartIcon();
    updateWishlistIcon();
    checkUserStatus();
    hideRedundantLinks();
});