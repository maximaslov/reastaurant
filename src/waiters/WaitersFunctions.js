import { elementDisplay } from '../index';
import { addNewBillTemplate } from '../bills/BillsFunctions';
import { waitersList, waitersForm, selectWaiterBtn } from './WaitersDomElements';
import { NEW_BILL_CLASS } from '../bills/BillsSelectors';
import { tablesForm } from '../tables/TablesDomElements';
import { generateWaitersHtml } from '../HtmlTemplates';
import WaitersApi from './WaitersApi.js';

export function renderWaitersList(list) {

    const waiters = list.map(generateWaitersHtml).join('');

    waitersList.insertAdjacentHTML('beforeend', waiters);
}

export function onSelectWaiterFormClick(e) {
    e.preventDefault()
    selectWaiterBtn.addEventListener('click', onSelectWaiterBtnClick);
}

export function onWaitersListClick(e) {
    e.preventDefault();
    const selectedWaiter = e.target.textContent

    elementDisplay(waitersForm, 'none')
    addNewBillTemplate();
    showSelectedWaiter(selectedWaiter);
    elementDisplay(tablesForm, 'block');
    
}

export function showSelectedWaiter(waiter) {
    const newBill = document.querySelector('.' + NEW_BILL_CLASS);
    const waiterItem = selelctedWaiterTemplate(waiter);

    newBill.insertAdjacentHTML('beforeend', waiterItem);   
}

export function selelctedWaiterTemplate(waiter) {
    return `
        <div class="bills__selected_waiter">Офіціянт: ${waiter}</div>
     `
}


export function changeWaitersFormDisplay(status) {
    elementDisplay(waitersForm, status);
}

export function getWaitersList() {
    return WaitersApi.request();
}
