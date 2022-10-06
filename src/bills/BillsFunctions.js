import { newBillTemplate } from '../HtmlTemplates';
import { newBillElem , addBillBtn, billList, billBtns} from './BillsDomElements';
import { NEW_BILL_NAME_CLASS, NEW_BILL_CLASS, BILLS_SELCETED_TABBLE_CLASS } from './BillsSelectors';
import { elementDisplay} from '../index';
import { waitersForm, waitersList } from '../waiters/WaitersDomElements';
import { changeTableStatus, getTablesList, renderTablesList } from '../tables/TablesFunctions';
import {tablesList} from '../tables/TablesDomElements';

export function addNewBillTemplate() {
    const newBill = newBillTemplate();
    newBillElem.insertAdjacentHTML('afterbegin', newBill);
}

export function createdBillTemplate(newBill) {
    const addFoodBtn = `<button class="bills__add-food-btn">Додати до замовлення</button>`;
    const closeBillBtn = `<button class="bills__close-bill-btn">Закрити рахунок</button>`
    const totalPrice = `<p>Загальна сумма: 777грн</p>`;

    insertDataToBill(newBill, totalPrice, addFoodBtn, closeBillBtn)
}

function insertDataToBill(newBill, totalPrice, addFoodBtn, closeBillBtn) {
    newBill.insertAdjacentHTML('beforeend', totalPrice);
    newBill.insertAdjacentHTML('beforeend', addFoodBtn);
    newBill.insertAdjacentHTML('beforeend', closeBillBtn);
}

export function changeBillName() {
    const id = 1 //Нужно передать сюда id c апи счетов
    const billName = document.querySelector('.' + NEW_BILL_NAME_CLASS);
    const now = todayDate();

    billName.innerHTML = `Рахунок № ${id} <br/><span class="bills__date">від ${now} </span>`
}

function todayDate() {
    const date = new Date;
    const now = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}
     ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return now
}

export function onAddBillBtnClick() {
    elementDisplay(addBillBtn, 'none');
    elementDisplay(waitersForm, 'block');
}

export function onCreateBillBtnClick() {
    const selectedTable = document.querySelector('.' + BILLS_SELCETED_TABBLE_CLASS);
    const id = selectedTable.id;
    changeTableStatus(id, 'true');
    getTablesList()
    .then(list => renderTablesList(list));
    const newBill = document.querySelector('.' + NEW_BILL_CLASS);
    changeBillName();
    billList.prepend(newBill);
    createdBillTemplate(newBill);
    elementDisplay(billBtns, 'none');
    elementDisplay(addBillBtn, 'block');
    clearBillForm();
}

export function onCancelBillBtnClick() {
    deleteNewBill();
    elementDisplay(addBillBtn, 'block');
    elementDisplay(billBtns, 'none');
    clearBillForm();
}

export function clearBillForm() {
    waitersList.value = 'Оберіть офіціянта';
    tablesList.value = 'Оберіть номер стола';
}


function deleteNewBill() {
    const newBill = document.querySelector('.' + NEW_BILL_CLASS);
    newBill.remove();
}