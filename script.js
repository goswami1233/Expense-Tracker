let expenseForm = document.getElementById('expense-form');
let titleInput = document.getElementById('title');
let amountInput = document.getElementById('amount');
let expenseList = document.getElementById('expense-list');
let totalDisplay = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let total = 0;

// Function to update the display
function renderExpenses() {
    expenseList.innerHTML = '';
    total = 0;
    expenses.forEach((expense, index) => {
        total += expense.amount;
        let li = document.createElement('li');
        li.innerHTML = `${expense.title} - ₹${expense.amount.toFixed(2)} 
            <button onclick="removeExpense(${index})">❌</button>`;
        expenseList.appendChild(li);
    });
    totalDisplay.textContent = total.toFixed(2);
}

// Add new expense
expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let title = titleInput.value;
    let amount = parseFloat(amountInput.value);

    if (title && amount) {
        expenses.push({ title, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();

        titleInput.value = '';
        amountInput.value = '';
    }
});

// Remove expense
function removeExpense(index) {
    total -= expenses[index].amount;
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

// Show expenses on page load
renderExpenses();

