import TablesApi from "./tables/TablesApi.js";
import WaitersApi from "./waiters/WaitersApi.js";
import KitchenApi from "./menu/KitchenApi.js";
import BillsApi from "./bills/BillsApi.js";

import { SETTINGS_MENU_DEL_BTN_CLASS, SETTINGS_MENU_ITEM } from "./settings/SettingsSelectors.js";
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
    selelctedWaiterTemplate, menuSettingsHtmlTemplate
} from "./HtmlTemplates.js";

import {
    menuSettingsBtn, menuSettings,
    waitersSettingsBtn, tablesSettingsBtn
} from './settings/SettingsDomElements.js'

const ADD_FOOD_BTN_CLASS = 'bills__add-food-btn';
const CLOSE_BILL_BTN_CLASS = 'bills__close-bill-btn';


const HEADER_SETTINGS_BTN_CLASS = "btn-settings";
const SETTINGS_BLOCK_CLASS = 'settings';
const settinsBlock = document.querySelector('.' + SETTINGS_BLOCK_CLASS);
const settingsBtn = document.querySelector('.' + HEADER_SETTINGS_BTN_CLASS);

let tablesArr = [];
let menuList = [];

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
createBillBtn.addEventListener('click', onCreateBillBtnClick);
settingsBtn.addEventListener('click', onSettingsBtnClick);
menuSettingsBtn.addEventListener('click', onMenuSettingsBtnClick);
menuSettings.addEventListener('click', onMenuSettingsClick);
menuSettings.addEventListener('focusout', onMenuSettingsFocusout);

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
    elementDisplay(addBillBtn, 'none');
    elementDisplay(waitersForm, 'block');
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
    elementDisplay(waitersForm, 'none')
    addNewBillTemplate();
    showSelectedWaiter(selectedWaiter);
    elementDisplay(tablesForm, 'block');
    
    //Прочитать айди у элемента и передать в функцию
    //обработчика событий кнопки добавить
    //ЕСЛИ НЕ ВЫБРАН ОФИЦИАНТ ТО АЛЕРТ
}

function onSelectTableBtnBtnClick(e) {
    e.preventDefault()
    const id = tablesList.value;
    elementDisplay(tablesForm, 'none');
    showSelectedTable(id);
    elementDisplay(billBtns, 'block');
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
    elementDisplay(billBtns, 'none');
    elementDisplay(addBillBtn, 'block');
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
    elementDisplay(addBillBtn, 'block');
    elementDisplay(billBtns, 'none');
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
    settingsBtn.classList.toggle('selected-btn');
    if (settingsBtn.classList.contains('selected-btn')) {
        elementDisplay(settinsBlock, 'block');
        elementDisplay(billBlock, 'none');
        
    } else {
        elementDisplay(settinsBlock, 'none');
        elementDisplay(billBlock, 'flex');
        hideMenuSettings();
        menuSettingsBtn.classList.remove('selected-btn');
    }
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

function onMenuSettingsBtnClick() {
    menuSettingsBtn.classList.toggle('selected-btn');
    if (menuSettingsBtn.classList.contains('selected-btn')) {
        showMenuSettings();
    } else {
        hideMenuSettings()
    }
}

function onMenuSettingsClick(e) {
    const button = e.target;
    const item = button.closest('.settings__menu-list');
    const id = item.dataset.id;
    if (button.classList.contains('settings__menu-del-btn')) {
        removeMenuItem(id)
            .then((list) => {
                menuList = menuList.filter(item => item.id !== list.id);
                renderMenuList(menuList);
            })
    }
}               

function onMenuSettingsFocusout(e) {
    const dataItem = e.target;
    const menuElem = dataItem.closest('.settings__menu-list');
    const id = menuElem.dataset.id;
    console.log(id)
    if (dataItem.classList.contains('menuItem-title') ||
        dataItem.classList.contains('menuItem-price')) {
        changeMenuItems(id, dataItem.value)
        .then(list => console.log(list))
    }//НУЖНО В АПИ СДЕЛАТЬ ЧТОБЫ ПРИЛЕТАЛО ИМЕННО ТАЙТЛ И ПРАЙС ТАЙТЛ НЕЙМ ТАЙТЛ ПРАЙС
}

function changeMenuItems(id, data) {
    return KitchenApi.changeData(id, data);
}

function removeMenuItem(id) {
    return KitchenApi.delete(id);
}
function hideMenuSettings() {
    elementDisplay(menuSettings, 'none')
}

function showMenuSettings() {
    getMenuList();
    elementDisplay(menuSettings, 'block')
}

function getMenuList() {
    return KitchenApi.request()
        .then((list) => {
            menuList = list
            renderMenuList(menuList);
        });
}

function renderMenuList(list) {
    const menuList = menuSettingsHtmlTemplate(list)
    menuSettings.innerHTML = menuList;
}

function changeTableStatus(id, status) {
    return TablesApi.changeTableStatus(id, status);
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