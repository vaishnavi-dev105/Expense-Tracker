
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const form = document.getElementById('transaction-form');
const list = document.getElementById('transaction-list');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const netBalance = document.getElementById('net-balance');
const filter = document.getElementById('filter-category');
function updateSummary(){
    const income = transactions.filter(t => t.category  === 'Income') .reduce((acc, t) => acc + t.amount,0);
    const expense = transactions.filter(t => t.category !== 'Income') .reduce((acc, t) => acc + t.amount, 0);
    totalIncome.textContent = income;
    totalExpense.textContent = expense;
    netBalance.textContent = income - expense;
 }
    function renderTransactions(filterCat = "All"){
        list.innerHTML = '';
        transactions.filter(t => filterCat ==='All' || t.category === filterCat).forEach((transaction,index) =>
           {
            const li = document.createElement('li');
            li.classList.add(transaction.category === 'Income' ? 'income' : 'expense');
            li.innerHTML = `${transaction.date} - ${transaction.description}(${transaction.category}):₹${transaction.amount} <button onclick="deleteTransaction(${index})">❌</button>`;
            list.appendChild(li);             
        });
        updateSummary();
  }
  function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveAndRender();
  }
  function saveAndRender(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
    renderTransactions(filter.value);
  }
  form.addEventListener('submit ', e => {
    e.preventDefault();
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    if(!date || !description || isNaN(amount) || !category) {
        alert('please fill all fields with valid data.');
        return;
    }
    transactions.push({ date,description,amount,category });
    saveAndRender();
    form.reset ();
  });
  filter.addEventListener('change',() => renderTransactions(filter.value));
  window.onload = () => renderTransactions();