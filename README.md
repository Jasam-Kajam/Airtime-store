<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Airtime Store</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Buy Airtime Bundles</h1>
  <div id="bundles"></div>

  <div id="checkout" class="hidden">
    <h2>Checkout</h2>
    <p id="selected-bundle"></p>
    <input type="text" id="name" placeholder="Your Name" />
    <input type="text" id="phone" placeholder="Phone Number" />
    <button onclick="pay()">Pay Now</button>
  </div>

  <div id="success" class="hidden">
    <h2>Payment Successful</h2>
    <p id="success-msg"></p>
  </div>

  <script src="script.js"></script>
</body>
</html>body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f4f4f4;
}

h1, h2 {
  color: #333;
}

#bundles {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.bundle {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  width: 200px;
}

button {
  margin-top: 10px;
  padding: 8px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.hidden {
  display: none;
}const bundles = [
  { id: 1, name: 'Daily - 100MB', price: 10 },
  { id: 2, name: 'Weekly - 500MB', price: 50 },
  { id: 3, name: 'Monthly - 5GB', price: 300 }
];

const bundlesDiv = document.getElementById('bundles');
const checkoutDiv = document.getElementById('checkout');
const successDiv = document.getElementById('success');

let selected = null;

bundles.forEach(bundle => {
  const div = document.createElement('div');
  div.className = 'bundle';
  div.innerHTML = `
    <h3>${bundle.name}</h3>
    <p>Price: KES ${bundle.price}</p>
    <button onclick="selectBundle(${bundle.id})">Buy</button>
  `;
  bundlesDiv.appendChild(div);
});

function selectBundle(id) {
  selected = bundles.find(b => b.id === id);
  document.getElementById('selected-bundle').innerText = `You selected: ${selected.name} - KES ${selected.price}`;
  checkoutDiv.classList.remove('hidden');
  successDiv.classList.add('hidden');
}

function pay() {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  if (!name || !phone) {
    alert("Please fill in your name and phone number.");
    return;
  }

  localStorage.setItem('lastOrder', JSON.stringify({ name, phone, bundle: selected.name }));
  document.getElementById('success-msg').innerText = `Thank you ${name}! You purchased ${selected.name}.`;
  checkoutDiv.classList.add('hidden');
  successDiv.classList.remove('hidden');
}
