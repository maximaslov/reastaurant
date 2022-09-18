import TablesApi from "./tables/TablesApi.js";
import WaitersApi from "./waiters/WaitersApi.js";
import KitchenApi from "./menu/KitchenApi.js";
import BillsApi from "./bills/BillsApi.js";

import { tablesList, tablesForm, selectTableBtn } from "./tables/TablesDomElements.js";
import { waitersList, waitersForm, selectWaiterBtn } from "./waiters/WaitersDomElements.js";
import { NEW_BILL_CLASS, BILLS_SELCETED_TABBLE_CLASS, NEW_BILL_NAME_CLASS } from "./bills/BillsSelectors.js";
import {
    billBlock, addBillBtn, billBtns,
    createBillBtn, cancelBillBtn, newBillElem, billList
} from "./bills/BillsDomElements.js";

import {
    generateTablesHtml, 
    generateWaitersHtml, newBillTemplate, selelctedTableTemplate,
    selelctedWaiterTemplate
} from "./HtmlTemplates.js"

const ADD_FOOD_BTN_CLASS = 'bills__add-food-btn';
const CLOSE_BILL_BTN_CLASS = 'bills__close-bill-btn';

const HEADER_SETTINGS_BTN_CLASS = "btn-settings";
const SETTINGS_BLOCK_CLASS = 'settings';
const settinsBlock = document.querySelector('.' + SETTINGS_BLOCK_CLASS);
const settingsBtn = document.querySelector('.' + HEADER_SETTINGS_BTN_CLASS)

//СОЗДАТЬ НОВЫЙ ДИВ В СПИСКЕ СТОЛОВ И СТОЛЫ ЗАПИХИВАТЬ ТУДА ПРИ ПОМОЩИ ИННЕРХТМЛ
// ТОГДА НЕ ДОЛЖЕН ДУБЛИРОВАТЬСЯ СПИСОК


let tablesArr = []

getWaitersList()
    .then(list => renderWaitersList(list));

getTablesList()
    .then((list) => {
        tablesArr = list;
        renderTablesList(list);
    });
  
addBillBtn.addEventListener('click', onAddBillBtnClick);
waitersForm.addEventListener('change', onSelectWaiterFormClick);
tablesForm.addEventListener('change', onSelectTableFormClick);
cancelBillBtn.addEventListener('click', onCancelBtnClick);
createBillBtn.addEventListener('click', onCreateBillBtnClick)
settingsBtn.addEventListener('click', onSettingsBtnClick);

function renderWaitersList(list) {
    const waitersHtml = list.map(generateWaitersHtml).join('');

    waitersList.insertAdjacentHTML('beforeend', waitersHtml);
}

function renderTablesList(list) {
    const tables = list.map(generateTablesHtml).join('');
    tablesList.insertAdjacentHTML('beforeend', tables);
    // tablesList.innerHTML = `${tables}`;
}

function onAddBillBtnClick() {
    changeAddBillBtnDisplay('none');
    changeWaitersFormDisplay('block');
}

function onSelectWaiterFormClick(e) {
    e.preventDefault()
    selectWaiterBtn.addEventListener('click', onSelectWaiterBtnClick);
}

function onSelectTableFormClick(e) {
    e.preventDefault()
    selectTableBtn.addEventListener('click', onSelectTableBtnBtnClick);
}

function onSelectWaiterBtnClick(e) {
    e.preventDefault()
    const selectedWaiter = waitersList.value;
    
    //НЕ ПОНЯТНО КАК ПРОВАЛИДИРОВАТЬ ФОРМУ

        changeWaitersFormDisplay('none');
        addNewBillTemplate();
        showSelectedWaiter(selectedWaiter);
        changeTablesFormDisplay('block');
    
    
    //Прочитать айди у элемента и передать в функцию
    //обработчика событий кнопки добавить
    //ЕСЛИ НЕ ВЫБРАН ОФИЦИАНТ ТО АЛЕРТ
}

function onSelectTableBtnBtnClick(e) {
    e.preventDefault()
    const id = tablesList.value;
    changeTablesFormDisplay('none');
    showSelectedTable(id);
    changeTablesFormDisplay('none');
    changeBillBtnsDisplay('block');
}

function onCreateBillBtnClick() {
    const selectedTable = document.querySelector('.' + BILLS_SELCETED_TABBLE_CLASS);
    const id = selectedTable.id;
    changeTableStatus(id, 'true');
    getTablesList()
    .then((list) => {
        tablesArr = list;
        renderTablesList(tablesArr);
    });
    const newBill = document.querySelector('.' + NEW_BILL_CLASS);
    changeBillName();
    billList.prepend(newBill);
    createdBillTemplate(newBill);
    changeBillBtnsDisplay('none');
    changeAddBillBtnDisplay('block');
    clearBillForm();
}

function createdBillTemplate(newBill) {
    const addFoodBtn = `<button class="bills__add-food-btn">Додати до замовлення</button>`;
    const closeBillBtn = `<button class="bills__close-bill-btn">Закрити рахунок</button>`
    const totalPrice = `<p>Загальна сумма: 777грн</p>`;

    insertDataToBill(newBill, totalPrice, addFoodBtn, closeBillBtn)
}

function onCancelBtnClick() {
    deleteNewBill();
    changeAddBillBtnDisplay('block');
    changeBillBtnsDisplay('none');
    clearBillForm();
}

function changeBillName() {
    const id = 1 //Нужно передать сюда id c апи счетов
    const billName = document.querySelector('.' + NEW_BILL_NAME_CLASS);
    const now = todayDate();

    billName.innerHTML = `Рахунок № ${id} <br/><span class="bills__date">від ${now} </span>`
}

function insertDataToBill(newBill, totalPrice, addFoodBtn, closeBillBtn) {
    newBill.insertAdjacentHTML('beforeend', totalPrice);
    newBill.insertAdjacentHTML('beforeend', addFoodBtn);
    newBill.insertAdjacentHTML('beforeend', closeBillBtn);
}

function todayDate() {
    const date = new Date;
    const now = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}
     ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return now
}

function onSettingsBtnClick() {
    console.log(42)
    changeAddBillBtnDisplay('none');
    changeSettingsBlockDisplay('block');

}

function addNewBillTemplate() {
    const newBill = newBillTemplate();
    newBillElem.insertAdjacentHTML('afterbegin', newBill);
}

function deleteNewBill() {
    const newBill = document.querySelector('.' + NEW_BILL_CLASS);
    newBill.remove();
}

function showSelectedWaiter(waiter) {
    const newBill = document.querySelector('.' + NEW_BILL_CLASS);
    const waiterItem = selelctedWaiterTemplate(waiter);

    newBill.insertAdjacentHTML('beforeend', waiterItem);   
}

function showSelectedTable(table) {
    const newBill = document.querySelector('.' + NEW_BILL_CLASS);
    const tableItem = selelctedTableTemplate(table);

    newBill.insertAdjacentHTML('beforeend', tableItem);   
}

function changeTableStatus(id, status) {
    return TablesApi.changeTableStatus(id, status);
}

// function selelctedWaiterTemplate(waiter) {
//     return `
//         <div class="bills__selected_waiter">Офіціянт: ${waiter}</div>
//      `
// }
// function selelctedTableTemplate(id) {
//     return `
//         <div class="bills__selected_tabel" id="${id}">Стіл: №${id}</div>
//     `
// }

// function newBillTemplate() {
//     return `
//     <div class="bills__new-bill">
//         <h3 class="bills__new-name">Новий рахунок</h3>
//     </div>
//     `;
// }

// function generateWaitersHtml(res) {
//     const { name, id } = res;
//         return `
//         <option class="bills__waiter" label="${name}" id="${id}">${name}</option>
//     `
// }

// function generateTablesHtml(res) {
//     const { id } = res;
//     if (res.status) {
//         return `<option class="bills__table" disabled label="№${id}" id="${id}">№${id}</option>`
//     } else {
//         return `
//         <option class="bills__table" value="${id}" label="№${id}" id="${id}">№${id}</option>
//     `
//     }
// }

function changeWaitersFormDisplay(status) {
    elementDisplay(waitersForm, status);
}

function changeTablesFormDisplay(status) {
    elementDisplay(tablesForm, status);
}

function changeAddBillBtnDisplay(status) {
    elementDisplay(addBillBtn, status);
}
function changeBillBtnsDisplay(status) {
    elementDisplay(billBtns, status);
}

function changeSettingsBlockDisplay(status) {
    elementDisplay(settinsBlock, status);
}

function elementDisplay(elem, status) {
    elem.style.display = status;
}

function getWaitersList() {
    return WaitersApi.request();
}

function getTablesList() {
    return TablesApi.request();
}

function clearBillForm() {
    waitersList.value = 'Оберіть офіціянта';
    tablesList.value = 'Оберіть номер стола';
}

//перед закрытием статус отобразить общий счет и обнулить статус и счет
//Офииант на апи чтобы тоже передавался и выводился как и счет и потом обнулялся

//апи с меню формата имя категории и айди категории
//в определенной айти категории массив объектов имя, цена

//добавить на сервере раздел с открытми счетами и туда передавать 
//номер столика, сумма заказа, время и дата, официант

//функция открытия счета(отдельный модуль)и передать дату и время открытия
// закрытия счетa