import TablesApi from './TablesApi';
import { tablesList, tablesForm, selectTableBtn} from './TablesDomElements';
import { NEW_BILL_CLASS } from '../bills/BillsSelectors';
import { billBtns } from '../bills/BillsDomElements';
import { elementDisplay } from '../index';

export function renderTablesList(list) {
    const tables = list.map(generateTablesHtml).join('');
    tablesList.insertAdjacentHTML('beforeend', tables);
}

export function onSelectTableFormClick(e) {
    e.preventDefault()
    selectTableBtn.addEventListener('click', onSelectTableBtnBtnClick);
}

export function onSelectTableBtnBtnClick(e) {
    e.preventDefault()
    const id = tablesList.value;
    elementDisplay(tablesForm, 'none');
    showSelectedTable(id);
    elementDisplay(billBtns, 'block');
}

export function showSelectedTable(table) {
    const newBill = document.querySelector('.' + NEW_BILL_CLASS);
    const tableItem = selelctedTableTemplate(table);

    newBill.insertAdjacentHTML('beforeend', tableItem);   
}

export function changeTableStatus(id, status) {
    return TablesApi.changeTableStatus(id, status);
}

export function selelctedTableTemplate(id) {
    return `
        <div class="bills__selected_tabel" id="${id}">Стіл: №${id}</div>
    `
}

export function generateTablesHtml(res) {
    const { id } = res;
    if (res.status) {
        return `<option class="bills__table" disabled label="№${id}" id="${id}">№${id}</option>`
    } else {
        return `
        <option class="bills__table" value="${id}" label="№${id}" id="${id}">№${id}</option>
    `
    }
}

export function changeTablesFormDisplay(status) {
    elementDisplay(tablesForm, status);
}

export function getTablesList() {
    return TablesApi.request();
}