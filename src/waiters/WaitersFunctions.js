import { elementDisplay } from '../index';
import { waitersList, waitersForm } from './WaitersDomElements';
import { NEW_BILL_CLASS } from '../bills/BillsSelectors';
import { tablesForm , tablesSettings } from '../tables/TablesDomElements';
import { generateWaitersHtml, waitersSettingsHtmlTemplate, addNewWaiterForm } from '../HtmlTemplates';
import WaitersApi from './WaitersApi.js';
import { waitersSettings, waitersSettingsBtn, menuSettingsBtn, menuSettings, tablesSettingsBtn } from '../settings/SettingsDomElements';
import { 
    WAITERS_SETTINGS_DEL_ITEM_BTN_CLASS, 
    WAITERS_SETTINGS_ITEM_CLASS, 
    SETTINGS_WAITERS_ADD_BTN_CLASS, 
    WAITERS_FORM_AREA_CLASS, 
    SETTINGS_WAITERS_FORM_CLASS, 
    ADD_NEW_WAITERS_ITEM_BTN_CLASS, 
    SETTINGS_NAME_INPUT_CLASS, 
    SETTINGS_WAITERS_INPUT_ERROR_CLASS, 
    SETTINGS_INPUT_WAITER_NAME_CLASS 
} from './WaitersSelectors';
import { showLoader, hideLoader } from '../settings/SettingsFunctions';

export let waitersListArr = [];

export function renderWaitersList(list) {
    const waiters = list.map(generateWaitersHtml).join('');
    waitersList.insertAdjacentHTML('beforeend', waiters);
}

export function onWaitersListClick(e) {
    e.preventDefault();
    const selectedWaiter = e.target.textContent;

    elementDisplay(waitersForm, 'none');
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
     `;
}

export function onWaitersSettingsBtnClick() {
    waitersSettingsBtn.classList.toggle('selected-btn');
    if (waitersSettingsBtn.classList.contains('selected-btn')) {
        showLoader();
        menuSettingsBtn.classList.remove('selected-btn');
        tablesSettingsBtn.classList.remove('selected-btn');
        elementDisplay(menuSettings, 'none');
        elementDisplay(tablesSettings, 'none');
        getWaitersList()
            .then(list => {
                waitersListArr = list;
                renderWaitersSettingsList(list);
                hideLoader();
    })
        elementDisplay(waitersSettings, 'block');
    } else {
        elementDisplay(waitersSettings, 'none');
    }
}

export function onWaitersSettingsClick(e) {
    e.stopPropagation();

    const button = e.target;

    if(button.classList.contains(WAITERS_SETTINGS_DEL_ITEM_BTN_CLASS)){
        showLoader();
        const item = button.closest('.' + WAITERS_SETTINGS_ITEM_CLASS);
        const id = item.dataset.id;
        removeWaitersItem(id)
            .then((list) => {
                waitersListArr = waitersListArr.filter(item => item.id !== list.id);
                renderWaitersSettingsList(waitersListArr);
                hideLoader();
        });
    }

    if(button.classList.contains(SETTINGS_WAITERS_ADD_BTN_CLASS)) {
        button.classList.toggle('selected-btn');
        button.classList.toggle('cancel-btn');
        
        if(button.classList.contains('selected-btn')){
            button.textContent = 'Скасувати';
            showCreateNewWaiterForm();
            
        } 
        else {
            button.textContent = 'Додати офіціянта';
            const form = document.querySelector('.' + SETTINGS_WAITERS_FORM_CLASS);
            elementDisplay(form, 'none');
        }
    }

    if(button.classList.contains(ADD_NEW_WAITERS_ITEM_BTN_CLASS)) {
        e.preventDefault();
        showLoader();
        const newWaiterName = document.querySelector('.' + SETTINGS_NAME_INPUT_CLASS).value;
        if(!newWaiterName){
            hideLoader();
            const error = document.querySelector('.' + SETTINGS_WAITERS_INPUT_ERROR_CLASS);
            elementDisplay(error, 'block');
        } else {
            createNewWaiter(newWaiterName);
        }
    }
}

export function onWaitersSettingsFocusout(e) {
    e.stopPropagation();

    const dataItem = e.target;
    const waiter = dataItem.closest('.' + WAITERS_SETTINGS_ITEM_CLASS);

    if (!waiter) {
        return;
    } else {
        showLoader();
        const id = waiter.dataset.id;

        if (dataItem.classList.contains(SETTINGS_INPUT_WAITER_NAME_CLASS)){
            changeWaitersName(id, {name: dataItem.value});
        }
    }
}

export function changeWaitersName(id, changes) {
    return WaitersApi.changeData(id, changes)
        .then(() => hideLoader());
}

function createNewWaiter (name) {
    const newWaiter = {
        name,
    }

    WaitersApi.create(newWaiter).
        then(item => {
            waitersListArr.push(item);
            renderWaitersSettingsList(waitersListArr);
            hideLoader();
        })
}

function showCreateNewWaiterForm () {
    const formTemplate = addNewWaiterForm();
    const formArea = document.querySelector('.' + WAITERS_FORM_AREA_CLASS);
    formArea.innerHTML = formTemplate;
}

export function removeWaitersItem(id) {
    return WaitersApi.delete(id);
}

export function changeWaitersFormDisplay(status) {
    elementDisplay(waitersForm, status);
}

export function getWaitersList() {
    return WaitersApi.request();
}

export function renderWaitersSettingsList(list) {
    const waitersList = waitersSettingsHtmlTemplate(list);
    waitersSettings.innerHTML = waitersList;
}