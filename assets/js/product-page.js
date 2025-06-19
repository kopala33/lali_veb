document.addEventListener('DOMContentLoaded', () => {
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));

    if (!productData) {
        const contentArea = document.querySelector('.product-main-content');
        if(contentArea) {
            contentArea.innerHTML = '<h1>Product not found.</h1><p>Please select a product from our <a href="geobrand-final-local.html">collection</a>.</p>';
        }
        return;
    }

    // Populate main details
    document.getElementById('product-title').textContent = productData.title;
    document.getElementById('product-artisan').textContent = productData.artisan;
    document.getElementById('product-price').textContent = `$${parseFloat(productData.price).toFixed(2)}`;
    document.getElementById('product-description').textContent = productData.description;
    document.getElementById('main-product-image').src = productData.img;
    document.getElementById('main-product-image').alt = productData.title;

    // Add to cart button on this page
    const mainAddToCartBtn = document.querySelector('.btn-add-to-cart-main');
    if(mainAddToCartBtn) {
        mainAddToCartBtn.addEventListener('click', () => {
             const quantity = parseInt(document.getElementById('quantity').value) || 1;
             const product = {
                id: productData.id,
                title: productData.title,
                price: parseFloat(productData.price),
                img: productData.img,
                quantity: quantity
            };
            
            // Re-use global logic
            let cart = JSON.parse(localStorage.getItem('geoBrandCart')) || [];
            const existingProductIndex = cart.findIndex(item => item.id === product.id);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += product.quantity;
            } else {
                cart.push(product);
            }

            localStorage.setItem('geoBrandCart', JSON.stringify(cart));
            
            // Update icon
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const cartCountSpan = document.querySelector('.cart-item-count');
            cartCountSpan.textContent = totalItems;
            cartCountSpan.dataset.count = totalItems;
            cartCountSpan.classList.add('updated');
            setTimeout(() => cartCountSpan.classList.remove('updated'), 300);
        });
    }

});