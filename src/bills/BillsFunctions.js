import { newBillTemplate , archiveListTemplate, modalWindow} from '../HtmlTemplates';
import { 
    addBillBtn, 
    billList, 
    billsSection, 
    billsArchiveSection, 
    billsForm, 
    billsWaitersList, 
    billsTablesList, 
    mainContainer
} from './BillsDomElements';
import { 
    BILLS_CANCEL_BTN_CLASS, 
    ACTIVE_BILL_CLASS, 
    ACTIVE_BILL_TABLE, 
    ADD_ORDER_BTN_CLASS, 
    BILLS_CLOSE_BILL_BTN_CLASS, 
    BILLS_MODAL_CANCEL_BTN_CLASS, 
    BILLS_MODAL_WINDOW_CLASS, 
    BILLS_MENU_ADD_BTN_CLASS, 
    BILLS_TOTAL_PRICE_CLASS
} from './BillsSelectors';
import { elementDisplay } from '../index';
import { changeTableStatus } from '../tables/TablesFunctions';
import BillsApi from './BillsApi';
import KitchenApi from '../kitchen/KitchenApi';
import { showLoader, hideLoader } from '../settings/SettingsFunctions';
import { 
    settingsBtn, 
    settingsBlock, 
    waitersSettings, 
    menuSettings, 
    menuSettingsBtn, 
    waitersSettingsBtn, 
    tablesSettingsBtn
} from '../settings/SettingsDomElements';
import { tablesSettings } from '../tables/TablesDomElements'
import {SELECTED_BTN_CLASS} from '../../GeneralSelectors'

let billsItemsList = [];

export function getOpenBillsList() {
    showLoader();
    return BillsApi.request()
    .then(list => {
        billsItemsList = list.reverse();
        renderOpenBillsList(billsItemsList);
        hideLoader();
    })
}

function addNewBill (table, waiter, data) {
    const newBill = {
        "status": true,
        table,
        waiter,
        data,
        kitchen: [],
        "totalprice":0,
        };
    BillsApi.create(newBill)
        .then(() => {
            getOpenBillsList().then(() => {
                hideLoader();
            });
        });
}

export function renderOpenBillsList(list) {
    const item = list.map(newBillTemplate).join('');
    billList.innerHTML = item;
}

export function onAddBillBtnClick() {
    elementDisplay(addBillBtn, 'none');
    elementDisplay(billsForm, 'block');
}

export function onCreateBillBtnClick(e) {
    e.preventDefault();
    showLoader();
    const selectedWaiter = billsWaitersList.value;
    const selectedTable = billsTablesList.value;
    const now = todayDate();

    changeTableStatus(selectedTable, true);

    addNewBill(selectedTable, selectedWaiter, now);
    elementDisplay(billsForm, 'none');
    elementDisplay(addBillBtn, 'block');
}

function todayDate() {
    const date = new Date;
    const month = date.getMonth().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();

    const now = `${date.getDate()}.${month.padStart(2, "0")}.${date.getFullYear()}
    ${date.getHours()}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`
    
    return now;
}

export function onCancelBillBtnClick(e) {
    e.preventDefault();
    elementDisplay(billsForm, 'none');
    elementDisplay(addBillBtn, 'block');
}

export function onBillsArchiveBtnClick (e) {
    const btn = e.target;
    btn.classList.toggle(SELECTED_BTN_CLASS);

    if(btn.classList.contains(SELECTED_BTN_CLASS)) {
        showOnlyArchiveSection();
        removeSelectedClassFromBtns();
        showLoader();
        showBillsArchive();
    } else {
        elementDisplay(billsSection, 'flex');
        elementDisplay(billsArchiveSection, 'none')
    }
}

function showOnlyArchiveSection() {
    elementDisplay(billsSection, 'none');
    elementDisplay(billsArchiveSection, 'flex');
    elementDisplay(settingsBlock, 'none');
    elementDisplay(waitersSettings, 'none');
    elementDisplay(menuSettings, 'none');
    elementDisplay(tablesSettings, 'none');
}

function removeSelectedClassFromBtns() {
    menuSettingsBtn.classList.remove(SELECTED_BTN_CLASS);
    waitersSettingsBtn.classList.remove(SELECTED_BTN_CLASS);
    tablesSettingsBtn.classList.remove(SELECTED_BTN_CLASS);
    settingsBtn.classList.remove(SELECTED_BTN_CLASS);
}

export function onBillsListClick(e) {
    const button = e.target;
    const bill = button.closest('.' + ACTIVE_BILL_CLASS);
    const table = bill.querySelector('.' + ACTIVE_BILL_TABLE)
    const billId = bill.dataset.id;
    const tableId = table.dataset.id;
    const totalPrice = bill.querySelector('.' + BILLS_TOTAL_PRICE_CLASS).dataset.id;
   
    if (button.classList.contains(BILLS_CANCEL_BTN_CLASS)) {
        showLoader();
        changeTableStatus(tableId, false);
        deleteActiveBill(billId);
    }
    if (button.classList.contains(BILLS_CLOSE_BILL_BTN_CLASS)) {  
        showLoader();      
        changeTableStatus(tableId, false);
        closeBill(billId, totalPrice);
    }
    if (button.classList.contains(ADD_ORDER_BTN_CLASS)) {
        showModalWindow(billId, tableId);
    }
}

function closeBill(id, totalPrice){
    BillsApi.changeBillTotalPrice(id, totalPrice)
        .then(() => {
            BillsApi.changeBillStatus(id, false)
                .then(item => {
                    billsItemsList = billsItemsList.filter(e => e.id !== item.id);
                    renderOpenBillsList(billsItemsList);
                    hideLoader();
             });
        });
}

function deleteActiveBill(id){
    BillsApi.delete(id)
    .then(item => {
        billsItemsList = billsItemsList.filter(e => e.id !== item.id);
        renderOpenBillsList(billsItemsList);
        hideLoader();
    });
}

function showBillsArchive () {
    BillsApi.request()
        .then(list => {
            const reverseList = list.reverse();
            renderBillsArchiveList(reverseList);
            hideLoader();
        });
}

function renderBillsArchiveList(list) {
    const archiveList = list.map(archiveListTemplate).join('');
    billsArchiveSection.innerHTML = archiveList;
}

function showModalWindow(billId, tableId) {
    KitchenApi.request()
        .then(list => {
            renderKitchenList(billId, tableId, list);
        })
}

function renderKitchenList (billId, tableId, list){
    const kitchenList = modalWindow(billId, tableId, list);
    mainContainer.insertAdjacentHTML('afterbegin', kitchenList);
}

export function onMainContainerClick(e) {
    const clickElem = e.target;
    const mainModalWindow = document.querySelector('.' + BILLS_MODAL_WINDOW_CLASS);

    if (clickElem.classList.contains(BILLS_MODAL_CANCEL_BTN_CLASS)
    || clickElem === mainModalWindow){
        mainModalWindow.remove();
    };

    if (clickElem.classList.contains(BILLS_MENU_ADD_BTN_CLASS)) {
        const priceElem = clickElem.previousElementSibling;
        const titleElem = priceElem.previousElementSibling;
        const price = priceElem.dataset.id;
        const title = titleElem.dataset.id;
        const billId = mainModalWindow.dataset.id;
        showLoader();
        addOdrerTobill(billId, title, price);
    }
}

function addOdrerTobill(billId, title, price){
    const mainModalWindow = document.querySelector('.' + BILLS_MODAL_WINDOW_CLASS);

    BillsApi.getOneBill(billId)
    .then(res => {
        let kitchenList = res.kitchen;
        const newItem = { 
            title,
            price,
        }
        kitchenList.push(newItem);
        BillsApi.addOrder(billId, kitchenList)
            .then((item) => {
                billsItemsList = billsItemsList.map(elem => elem.id === item.id ? item : elem);
                renderOpenBillsList(billsItemsList);
                mainModalWindow.remove()
                hideLoader();
            });
    });
}