const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Pleas add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: parseInt(amount.value)
    };
    transactions.push(transaction);

    updateLocalStorage();

    init();
  }
}
// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transaction to list
function addTransactionDOM(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? `minus` : `plus`);
  item.innerHTML = `
    ${transaction.text}
    <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
  `;

  list.appendChild(item);
}

// Update balance, income and expense
function updateValues() {
  const total = transactions
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);
  const income = transactions
    .filter(item => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);
  const expense = (
    transactions
      .filter(item => item.amount < 0)
      .reduce((acc, item) => acc + item.amount, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(item => item.id !== id);
  updateLocalStorage();
  init();
}

// Update local storage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
  text.value = '';
  amount.value = '';
}

init();

form.addEventListener('submit', addTransaction);
