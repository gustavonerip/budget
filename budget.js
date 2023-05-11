// Select elements
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl  = document.querySelector(".income p");
const outcomeTotalEl = document.querySelector(".outcome p");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

// Select buttons
const allBtn = document.querySelector("#tab-all");
const incomeBtn = document.querySelector("#tab-income");
const expenseBtn = document.querySelector("#tab-expenses");

//  Select inputs

const incomeTitle = document.querySelector("#income-desc-input");
const incomeAmount = document.querySelector("#income-amount-input");
const addIncome = document.querySelector("#add-income");

const expenseTitle = document.querySelector("#expense-desc-input"); 
const expenseAmount = document.querySelector("#expense-amount-input"); 
const addExpense = document.querySelector("#add-expense"); 

// Variables
let ENTRY_LIST = [];
let balance = 0, income = 0, outcome = 0; 

const DELETE = "delete", EDIT = "edit";

// Event listeners
incomeBtn.addEventListener('click', () => {
    show(incomeEl);
    hide([expenseEl,allEl]);
    active(incomeBtn);
    inactive([expenseBtn,allBtn]);
});
expenseBtn.addEventListener('click', () => {
    show(expenseEl);
    hide([incomeEl,allEl]);
    active(expenseBtn);
    inactive([incomeBtn,allBtn]);
});
allBtn.addEventListener('click', () => {
    show(allEl);
    hide([incomeEl,expenseEl]);
    active(allBtn);
    inactive([incomeBtn,expenseBtn]);
});

// Functions
function show(element){
    element.classList.remove('hide');
}

function hide(elements){
    elements.forEach(element => {
        element.classList.add('hide');
    });
}

function active(element){
    element.classList.add('active');
}

function inactive(elements){
    elements.forEach(element => {
        element.classList.remove('active');
    });
}