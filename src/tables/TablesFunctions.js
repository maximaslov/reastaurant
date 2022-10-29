import TablesApi from './TablesApi';
import { tablesList, tablesForm , tablesSettings } from './TablesDomElements';
import { NEW_BILL_CLASS } from '../bills/BillsSelectors';
import { billBtns } from '../bills/BillsDomElements';
import { elementDisplay } from '../index';
import { generateTablesHtml, tablesSettingsHtmlTemplate , addNewWaiterForm, addNewTableForm} from '../HtmlTemplates';
import { hideLoader , showLoader} from '../settings/SettingsFunctions';
import { 
    menuSettings, 
    tablesSettingsBtn, 
    waitersSettings, 
    menuSettingsBtn, 
    waitersSettingsBtn
} from '../settings/SettingsDomElements';
import {TABLES_SETTINGS_DEL_ITEM_BTN_CLASS, TABLES_SETTINGS_ITEM_CLASS, SETTINGS_TABLES_ADD_BTN_CLASS, TABLES_FORM_AREA_CLASS, SETTINGS_TABLES_FORM_CLASS, ADD_NEW_TABLES_ITEM_BTN_CLASS, SETTINGS_TABLE_INPUT_CLASS, SETTINGS_TABLES_INPUT_ERROR_CLASS} from './TablesSelectors'
import {removeWaitersItem} from '../waiters/WaitersFunctions'

let tablesListArr = [];

export function renderTablesList(list) {
    const tables = list.map(generateTablesHtml).join('');
    tablesList.innerHTML = tables;
}

export function onTablesListClick(e) {
    e.stopPropagation();
    const table = e.target;
    const id = table.dataset.id;

    elementDisplay(tablesForm, 'none');
    showSelectedTable(id);
    elementDisplay(billBtns, 'block');
}

export function showSelectedTable(id) {
    const newBill = document.querySelector('.' + NEW_BILL_CLASS);
    const tableItem = selelctedTableTemplate(id);

    newBill.insertAdjacentHTML('beforeend', tableItem);   
}

export function onTablesSettingsBtnClick() {
    tablesSettingsBtn.classList.toggle('selected-btn');
    if (tablesSettingsBtn.classList.contains('selected-btn')) {
        showLoader();
        menuSettingsBtn.classList.remove('selected-btn');
        waitersSettingsBtn.classList.remove('selected-btn');
        elementDisplay(menuSettings, 'none');
        elementDisplay(waitersSettings, 'none');
        getTablesList()
            .then(list => {
                tablesListArr = list;
                renderTablesSettingsList(tablesListArr);
                hideLoader();
            });
        elementDisplay(tablesSettings, 'block');
    } else {
        elementDisplay(tablesSettings, 'none');
    }
}

export function onTablesSettingsClick(e) {
    e.stopPropagation();

    const button = e.target;

    if(button.classList.contains(TABLES_SETTINGS_DEL_ITEM_BTN_CLASS)){
        showLoader();
        const item = button.closest('.' + TABLES_SETTINGS_ITEM_CLASS);
        const id = item.dataset.id;

        removeTablseItem(id)
            .then((list) => {
                console.table(list)
                tablesListArr = tablesListArr.filter(item => item.id !== list.id);
                renderTablesSettingsList(tablesListArr);
                hideLoader();
        });
    }

    // if(button.classList.contains(SETTINGS_TABLES_ADD_BTN_CLASS)) {
    //     button.classList.toggle('selected-btn');
        
    //     if(button.classList.contains('selected-btn')){
    //         button.textContent = 'Скасувати';
    //         showCreateNewTableForm();
            
    //     } 
    //     else {
    //         button.textContent = 'Додати стіл';
    //         const form = document.querySelector('.' + SETTINGS_TABLES_FORM_CLASS);
    //         elementDisplay(form, 'none');
    //     }
    // }

    if(button.classList.contains(SETTINGS_TABLES_ADD_BTN_CLASS)) {
        showLoader();
        createNewTable()
            .then ((item) =>  {
                tablesListArr.push(item);
                renderTablesSettingsList(tablesListArr);
                hideLoader();
            });
    }
}

// function showCreateNewTableForm () {
//     const formTemplate = addNewTableForm();
//     const formArea = document.querySelector('.' + TABLES_FORM_AREA_CLASS);
//     formArea.innerHTML = formTemplate;
// }

function removeTablseItem(id) {
    return TablesApi.delete(id);
}

export function changeTableStatus(id, status) {
    return TablesApi.changeTableStatus(id, status)
    .then(() => {
        getTablesList()
            .then(list => renderTablesList(list))
    })
}

export function renderTablesSettingsList(list) {
    const tablesList = tablesSettingsHtmlTemplate(list)
    tablesSettings.innerHTML = tablesList;
}

function createNewTable() {
    return TablesApi.create()
}

export function getTablesList() {
    return TablesApi.request();
}