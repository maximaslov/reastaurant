import TablesApi from './TablesApi';
import { tablesList, tablesSettings } from './TablesDomElements';
import { elementDisplay } from '../index';
import { generateTablesHtml, tablesSettingsHtmlTemplate } from '../HtmlTemplates';
import { hideLoader, showLoader } from '../settings/SettingsFunctions';
import { 
    menuSettings, 
    tablesSettingsBtn, 
    waitersSettings, 
    menuSettingsBtn, 
    waitersSettingsBtn
} from '../settings/SettingsDomElements';
import {TABLES_SETTINGS_DEL_ITEM_BTN_CLASS, TABLES_SETTINGS_ITEM_CLASS, SETTINGS_TABLES_ADD_BTN_CLASS } from './TablesSelectors';
import {SELECTED_BTN_CLASS} from '../../GeneralSelectors';

let tablesListArr = [];

export function renderTablesList(list) {
    const tables = list.map(generateTablesHtml).join('');
    tablesList.innerHTML = tables;
}

export function onTablesSettingsBtnClick() {
    tablesSettingsBtn.classList.toggle(SELECTED_BTN_CLASS);
    if (tablesSettingsBtn.classList.contains(SELECTED_BTN_CLASS)) {
        showLoader();
        showTablesSettingsSection();
        getTablesList()
            .then(list => {
                tablesListArr = list;
                renderTablesSettingsList(tablesListArr);
                hideLoader();
            });
    } else {
        hideTablesSettingsSection();
    }
}

function showTablesSettingsSection() {
    menuSettingsBtn.classList.remove(SELECTED_BTN_CLASS);
    waitersSettingsBtn.classList.remove(SELECTED_BTN_CLASS);
    elementDisplay(menuSettings, 'none');
    elementDisplay(waitersSettings, 'none');
    elementDisplay(tablesSettings, 'block');
}

function hideTablesSettingsSection() {
    elementDisplay(tablesSettings, 'none');
}

export function onTablesSettingsClick(e) {
    const button = e.target;

    if(button.classList.contains(TABLES_SETTINGS_DEL_ITEM_BTN_CLASS)){
        showLoader();
        const item = button.closest('.' + TABLES_SETTINGS_ITEM_CLASS);
        const id = item.dataset.id;

        removeTablseItem(id)
            .then((list) => {
                tablesListArr = tablesListArr.filter(item => item.id !== list.id);
                renderTablesSettingsList(tablesListArr);
                hideLoader();
        });
    }

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
    return TablesApi.create();
}

export function getTablesList() {
    return TablesApi.request();
}