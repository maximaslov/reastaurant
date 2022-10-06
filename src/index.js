import style from  './styles/styles.css'
import normalize from  './styles/normalize.css'

import { tablesForm } from './tables/TablesDomElements';
import { waitersList } from './waiters/WaitersDomElements';
import { addBillBtn, createBillBtn, cancelBillBtn } from './bills/BillsDomElements';
import { menuSettingsBtn, menuSettings, settingsBtn } from './settings/SettingsDomElements';

import { renderTablesList, getTablesList, onSelectTableFormClick } from './tables/TablesFunctions';
import { onAddBillBtnClick, onCreateBillBtnClick, onCancelBillBtnClick } from './bills/BillsFunctions';
import { onWaitersListClick, renderWaitersList, getWaitersList } from './waiters/WaitersFunctions';
import { onMenuSettingsClick, onMenuSettingsFocusout , onMenuSettingsAddBtnClick} from './kitchen/KitchenFunctions';
import {onSettingsBtnClick, onMenuSettingsBtnClick} from './settings/SettingsFunctions'

export let tablesArr = [];

getTablesList()
    .then((list) => {
        tablesArr = list;
        renderTablesList(list);
    });

getWaitersList()
    .then(list => renderWaitersList(list));

addBillBtn.addEventListener('click', onAddBillBtnClick);
waitersList.addEventListener('click', onWaitersListClick);
tablesForm.addEventListener('change', onSelectTableFormClick);
cancelBillBtn.addEventListener('click', onCancelBillBtnClick);
createBillBtn.addEventListener('click', onCreateBillBtnClick);
settingsBtn.addEventListener('click', onSettingsBtnClick);
menuSettingsBtn.addEventListener('click', onMenuSettingsBtnClick);
menuSettings.addEventListener('click', onMenuSettingsClick);
menuSettings.addEventListener('focusout', onMenuSettingsFocusout);
menuSettings.addEventListener('click', onMenuSettingsAddBtnClick);

export function elementDisplay(elem, status) {
    elem.style.display = status;
}