document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.querySelector('.cart-items-list');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.querySelector('.btn-checkout');
    
    // --- *** ცვლილება აქ: ვიყენებთ სწორ კალათას *** ---
    let cart = JSON.parse(localStorage.getItem('laliArtCart')) || [];

    const renderCart = () => {
        cartItemsList.innerHTML = ''; // ვასუფთავებთ სიას

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<div class="cart-item-placeholder">Your cart is currently empty. <a href="gallery.html">Explore the gallery!</a></div>';
            checkoutBtn.disabled = true;
            updateSummary();
            return;
        }

        checkoutBtn.disabled = false;
        cart.forEach((item, index) => {
            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="cart-item-info">
                    <h3>${item.title}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-qty">
                    <label for="qty-${item.id}">Qty:</label>
                    <input type="number" id="qty-${item.id}" value="${item.quantity}" min="1" data-id="${item.id}">
                </div>
                <div class="cart-item-subtotal">
                    $${(item.quantity * item.price).toFixed(2)}
                </div>
                <button class="cart-item-remove" data-id="${item.id}">×</button>
            `;
            cartItemsList.appendChild(cartItemEl);
        });
        
        updateSummary();
        addEventListeners();
    };

    const updateSummary = () => {
        const subtotal = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        cartTotalEl.textContent = `$${subtotal.toFixed(2)}`;
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) {
            quantity = 1;
        }
        const itemIndex = cart.findIndex(item => item.id === id);
        if(itemIndex > -1) {
            cart[itemIndex].quantity = quantity;
            localStorage.setItem('laliArtCart', JSON.stringify(cart));
            renderCart();
            updateGlobalCartIcon();
        }
    };
    
    const removeItem = (id) => {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('laliArtCart', JSON.stringify(cart));
        renderCart();
        updateGlobalCartIcon();
    };

    function updateGlobalCartIcon() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountSpan = document.querySelector('.cart-item-count');
        if(cartCountSpan){
            cartCountSpan.textContent = totalItems;
            cartCountSpan.dataset.count = totalItems;
        }
    }

    const addEventListeners = () => {
        document.querySelectorAll('.cart-item-qty input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = e.target.dataset.id;
                const quantity = parseInt(e.target.value);
                updateQuantity(id, quantity);
            });
        });

        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                removeItem(id);
            });
        });
    };

    renderCart();
    updateGlobalCartIcon(); // თავიდანვე რომ სწორი ციფრი ეწეროს
});