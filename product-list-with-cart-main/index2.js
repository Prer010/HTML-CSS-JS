// Sample product data
const products = [
    {
        id: 1,
        name: "Waffle with Berries",
        category: "Waffle",
        price: 6.50,
        image: "https://source.unsplash.com/featured/?waffle"
    },
    {
        id: 2,
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00,
        image: "https://source.unsplash.com/featured/?creme-brulee"
    },
    {
        id: 3,
        name: "Macaron Mix of Five",
        category: "Macaron",
        price: 8.00,
        image: "https://source.unsplash.com/featured/?macaron"
    },
    {
        id: 4,
        name: "Classic Tiramisu",
        category: "Tiramisu",
        price: 5.50,
        image: "https://source.unsplash.com/featured/?tiramisu"
    },
    {
        id: 5,
        name: "Pistachio Baklava",
        category: "Baklava",
        price: 4.00,
        image: "https://source.unsplash.com/featured/?baklava"
    },
    {
        id: 6,
        name: "Lemon Meringue Pie",
        category: "Pie",
        price: 5.00,
        image: "https://source.unsplash.com/featured/?lemon-pie"
    },
    {
        id: 7,
        name: "Red Velvet Cake",
        category: "Cake",
        price: 4.50,
        image: "https://source.unsplash.com/featured/?red-velvet-cake"
    },
    {
        id: 8,
        name: "Salted Caramel Brownie",
        category: "Brownie",
        price: 3.50,
        image: "https://source.unsplash.com/featured/?brownie"
    },
    {
        id: 9,
        name: "Vanilla Panna Cotta",
        category: "Panna Cotta",
        price: 6.50,
        image: "https://source.unsplash.com/featured/?panna-cotta"
    }
];

let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    loadCart();
    
    // Event listeners
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-cart')) {
            const productId = parseInt(e.target.closest('.btn-cart').dataset.productId);
            addToCart(productId);
        }
        if (e.target.closest('.quantity-btn')) {
            const productId = parseInt(e.target.closest('.quantity-btn').dataset.productId);
            const action = e.target.closest('.quantity-btn').dataset.action;
            updateQuantity(productId, action);
        }
    });

    document.getElementById('confirm-order').addEventListener('click', showOrderConfirmation);
    document.getElementById('start-new-order').addEventListener('click', startNewOrder);
});

// Render products
function renderProducts() {
    const productsHtml = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn btn-cart" data-product-id="${product.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7-4h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z"/>
                    </svg>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    
    document.getElementById('products').innerHTML = productsHtml;
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateQuantity(productId, action) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    if (action === 'increase') {
        item.quantity++;
    } else if (action === 'decrease') {
        item.quantity--;
        if (item.quantity === 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }

    updateCart();
}

function updateCart() {
    const cartHtml = cart.map(item => `
        <div class="cart-item">
            <div>
                <div>${item.name}</div>
                <div class="quantity-control">
                    <button class="quantity-btn" data-product-id="${item.id}" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-product-id="${item.id}" data-action="increase">+</button>
                </div>
            </div>
            <div>$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById('cart-items').innerHTML = cartHtml;
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

function showOrderConfirmation() {
    const orderSummary = cart.map(item => `
        <div class="cart-item">
            <div>${item.name} x${item.quantity}</div>
            <div>$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    document.getElementById('order-summary').innerHTML = orderSummary;
    document.getElementById('order-modal').style.display = 'flex';
}

function startNewOrder() {
    cart = [];
    updateCart();
    document.getElementById('order-modal').style.display = 'none';
}

