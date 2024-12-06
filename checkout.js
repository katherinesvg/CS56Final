const username = localStorage.getItem('username');
document.getElementById('welcome-message').textContent = `Welcome, ${username}`;
const checkoutTotal = parseFloat(localStorage.getItem('checkoutTotal')) || 0;
const balance = parseFloat(localStorage.getItem('balance')) || 0;
const cartSummary = document.getElementById('cart-summary');
const totalPriceElement = document.getElementById('total-price');


function renderCart() {
    if (checkoutTotal === 0) {
        cartSummary.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = '$0.00';
        return;
    }

    cartSummary.innerHTML = `
        <div class="cart-item">
            <p>Total Items</p>
            <p>$${checkoutTotal.toFixed(2)}</p>
        </div>
    `;
    totalPriceElement.textContent = `$${checkoutTotal.toFixed(2)}`;
}


document.getElementById('checkoutForm').addEventListener('submit', (event) => {
    event.preventDefault();

    if (balance < checkoutTotal) {
        alert("Not enough money.");
        return;
    }

    const newBalance = balance - checkoutTotal;
    localStorage.setItem('balance', newBalance.toFixed(2));
    localStorage.removeItem('cart');
    localStorage.removeItem('checkoutTotal');

    alert(`Thank you for your order! Remaining balance: $${newBalance.toFixed(2)}`);
    window.location.href = 'cart.html';
});

renderCart();

