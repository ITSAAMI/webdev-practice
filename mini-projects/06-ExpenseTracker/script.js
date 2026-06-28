// Tamam transactions ko store karne ke liye array
let transactions = [];

// HTML elements ko grab karte hain
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const addBtn = document.getElementById('addBtn');
const transactionList = document.getElementById('transactionList');
const clearBtn = document.getElementById('clearBtn');

// Transactions ko localStorage se load karne ka function
function loadTransactions() {
    const stored = localStorage.getItem('transactions');
    // Agar pehlay se stored data hai to use load karo, warna empty array
    transactions = stored ? JSON.parse(stored) : [];
    updateUI();
}

// Transactions ko localStorage mein save karne ka function
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Naya transaction add karne ka function
function addTransaction() {
    // Check karo ke description aur amount dono fill hain
    if (!description.value.trim() || !amount.value) {
        alert('Please fill in all fields');
        return;
    }
    
    // Naya transaction object banao
    const transaction = {
        id: Date.now(), // Unique ID as timestamp
        description: description.value, // Kya transaction hai
        amount: parseFloat(amount.value), // Kitna amount hai
        type: type.value, // Income ya Expense
        date: new Date().toLocaleDateString() // Aaj ki date
    };
    
    // Naya transaction list ke shuru mein add karo (newest first)
    transactions.unshift(transaction);
    
    // Input fields ko clear karo
    description.value = '';
    amount.value = '';
    type.value = 'income';
    
    // Changes ko save aur display karo
    saveTransactions();
    updateUI();
}

// Specific transaction ko delete karne ka function
function deleteTransaction(id) {
    // Usi ID waly transaction ko filter karke nikaal do
    transactions = transactions.filter(t => t.id !== id);
    saveTransactions();
    updateUI();
}

// Tamam transactions ko clear karne ka function
function clearAllTransactions() {
    // Confirmation maango pehlay
    if (confirm('Are you sure you want to clear all transactions?')) {
        transactions = [];
        saveTransactions();
        updateUI();
    }
}

// Total income, expense aur balance calculate karne ka function
function calculateTotals() {
    let income = 0;
    let expense = 0;
    
    // Har transaction ko loop karke income ya expense mein add karo
    transactions.forEach(t => {
        if (t.type === 'income') {
            income += t.amount;
        } else {
            expense += t.amount;
        }
    });
    
    // Teeno values return karo
    return { income, expense, balance: income - expense };
}

// UI ko update karne ka main function
function updateUI() {
    // Totals calculate karo
    const { income, expense, balance } = calculateTotals();
    
    // Display mein balance, income aur expense dikhaao
    document.getElementById('totalBalance').textContent = `$${balance.toFixed(2)}`;
    document.getElementById('totalIncome').textContent = `$${income.toFixed(2)}`;
    document.getElementById('totalExpense').textContent = `$${expense.toFixed(2)}`;
    
    // Transaction list ko clear karo
    transactionList.innerHTML = '';
    
    // Agar koi transaction nahi hai to empty message dikhaao
    if (transactions.length === 0) {
        transactionList.innerHTML = '<div class="empty-message">No transactions yet. Add one to get started!</div>';
    } else {
        // Har transaction ko display karo
        transactions.forEach(t => {
            const li = document.createElement('li');
            li.className = `transaction-item ${t.type}`;
            li.innerHTML = `
                <div class="transaction-info">
                    <p class="transaction-description">${escapeHtml(t.description)}</p>
                    <p class="transaction-date">${t.date}</p>
                </div>
                <span class="transaction-amount ${t.type}">${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)}</span>
                <button class="delete-transaction" onclick="deleteTransaction(${t.id})">Delete</button>
            `;
            transactionList.appendChild(li);
        });
    }
}

// HTML special characters ko escape karne ka function (security ke liye)
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Add button ke liye event listener
addBtn.addEventListener('click', addTransaction);

// Description field mein Enter press karne par transaction add ho
description.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTransaction();
});

// Clear button ke liye event listener
clearBtn.addEventListener('click', clearAllTransactions);

// Page load hone par transactions load karo
loadTransactions();