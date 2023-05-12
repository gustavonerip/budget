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
let ENTRY_LIST;
let balance = 0, income = 0, outcome = 0; 
const DELETE = "delete", EDIT = "edit";

// Check if there's any data in the local storage
ENTRY_LIST = JSON.parse(localStorage.getItem('entry_list')) || [];
updateUI();

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
addIncome.addEventListener('click', ()=>{
    // If one of the fields are empty, exit the function
    if(!incomeTitle.value || !incomeAmount.value) return;

    // Save entry to ENTRY_LIST
    let income = {
        type: 'income',
        title: incomeTitle.value,
        amount: parseInt(incomeAmount.value) 
    }
    ENTRY_LIST.push(income);
    updateUI();
    clearInput([incomeTitle, incomeAmount]);
});

addExpense.addEventListener('click', ()=>{
    // If one of the fields are empty, exit the function
    if(!expenseTitle.value || !expenseAmount.value) return;

    // Save entry to ENTRY_LIST
    let expense = {
        type: 'expense',
        title: expenseTitle.value,
        amount: parseInt(expenseAmount.value) 
    }
    ENTRY_LIST.push(expense);
    updateUI();
    clearInput([expenseTitle, expenseAmount]);
});

incomeList.addEventListener('click', deleteOrEdit);
expenseList.addEventListener('click', deleteOrEdit);
allList.addEventListener('click', deleteOrEdit);

// Functions
function deleteOrEdit(event){
    const targetBtn = event.target;

    const entry = targetBtn.parentNode;

    if(targetBtn.id == DELETE){
        deleteEntry(entry);
    }else if(targetBtn.id == EDIT){
        editEntry(entry);
    }
}

function deleteEntry(entry){
    ENTRY_LIST.splice(entry.id, 1);
    updateUI();
}

function editEntry(entry){
    let ENTRY = ENTRY_LIST[entry.id];
    
    if(ENTRY.type == 'income'){
        incomeAmount.value = ENTRY.amount;
        incomeTitle.value = ENTRY.title;
        show(incomeEl);
        hide([expenseEl,allEl]);
        active(incomeBtn);
        inactive([expenseBtn,allBtn]);

    }else  if(ENTRY.type == 'expense'){
        expenseAmount.value = ENTRY.amount;
        expenseTitle.value = ENTRY.title;
        show(expenseEl);
        hide([incomeEl,allEl]);
        active(expenseBtn);
        inactive([incomeBtn,allBtn]);
    }
    deleteEntry(entry);
}

function updateUI(){
    income = calculateTotal('income', ENTRY_LIST);
    outcome  = calculateTotal('expense', ENTRY_LIST);
    balance = Math.abs(calculateBalance(income, outcome));

    // Determine sign of the balance
    let sign = (income >= outcome) ? '$' :'-$';

    // Update UI
    balanceEl.innerHTML = `<small>${sign}</small>${balance}`;
    incomeTotalEl.innerHTML = `<small>$</small>${income}`;
    outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;

    clearElement([incomeList, expenseList, allList]);

    ENTRY_LIST.forEach((entry, index)=>{
        if(entry.type == 'expense'){
            showEntry(expenseList, entry.type, entry.title, entry.amount, index);
        }else if(entry.type == 'income'){
            showEntry(incomeList, entry.type, entry.title, entry.amount, index);
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index);
    });

    // Save to local storage
    localStorage.setItem('entry_list',JSON.stringify(ENTRY_LIST));
}

function showEntry(list, type, title, amount, id){
    const entry = `
        <li id="${id}" class="${type}">
            <span class="entry-title">${title}</span>
            <span class="entry-amount">$${amount}</span>
            <i id="edit" class="fa-regular fa-pen-to-square entry-edit-btn"></i>
            <i id="delete" class="fa-regular fa-trash-can entry-delete-btn"></i>
        </li>
    `;
    const position = 'afterbegin';

    list.insertAdjacentHTML(position, entry);
}

function clearElement(elements){
    elements.forEach(element=>{
        element.innerHTML = "";
    });
}

function calculateTotal(type, list){
    let sum = 0;
    list.forEach(entry=>{
        if(entry.type == type){
            sum += entry.amount;
        }
    });

    return sum;
}

function calculateBalance(income, outcome){   
    return income - outcome;
}

function clearInput(inputs){
    inputs.forEach(input=>{
        input.value = "";
    });
}

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