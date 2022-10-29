import style from  './styles/styles.css'
import normalize from  './styles/normalize.css';

import { waitersList } from './waiters/WaitersDomElements';
import { addBillBtn, createBillBtn, cancelBillBtn , billsArchiveBtn, activeBill, billList, mainContainer} from './bills/BillsDomElements';
import { menuSettingsBtn, menuSettings, settingsBtn , waitersSettingsBtn, waitersSettings, tablesSettingsBtn} from './settings/SettingsDomElements';

import { renderTablesList, getTablesList, onTablesListClick, onTablesSettingsBtnClick, onTablesSettingsClick } from './tables/TablesFunctions';
import { onAddBillBtnClick, onCreateBillBtnClick, onCancelBillBtnClick , onBillsArchiveBtnClick, getOpenBillsList, renderOpenBillsList, onBillsListClick, onMainContainerClick} from './bills/BillsFunctions';
import { onWaitersListClick, renderWaitersList, getWaitersList , onWaitersSettingsClick, onWaitersSettingsBtnClick, onWaitersSettingsFocusout} from './waiters/WaitersFunctions';
import { onMenuSettingsClick, onMenuSettingsFocusout } from './kitchen/KitchenFunctions';
import {onSettingsBtnClick, onMenuSettingsBtnClick , showLoader, hideLoader} from './settings/SettingsFunctions'
import {tablesList, tablesSettings} from './tables/TablesDomElements'
import { BILLS_MODAL_CANCEL_BTN_CLASS , BILLS_MODAL_WINDOW_CLASS} from './bills/BillsSelectors';
import { modalWindow } from './HtmlTemplates';


export let tablesArr = [];

showLoader();
getTablesList()
    .then((list) => {
        tablesArr = list;
        renderTablesList(list);
    });

getWaitersList()
    .then(list => renderWaitersList(list));
    hideLoader();

getOpenBillsList()
    

addBillBtn.addEventListener('click', onAddBillBtnClick);
cancelBillBtn.addEventListener('click', onCancelBillBtnClick);
createBillBtn.addEventListener('click', onCreateBillBtnClick);
settingsBtn.addEventListener('click', onSettingsBtnClick);
menuSettingsBtn.addEventListener('click', onMenuSettingsBtnClick);
waitersSettingsBtn.addEventListener('click', onWaitersSettingsBtnClick);
tablesSettingsBtn.addEventListener('click', onTablesSettingsBtnClick);

menuSettings.addEventListener('click', onMenuSettingsClick);
menuSettings.addEventListener('focusout', onMenuSettingsFocusout);
waitersSettings.addEventListener('click', onWaitersSettingsClick);
waitersSettings.addEventListener('focusout', onWaitersSettingsFocusout);
tablesSettings.addEventListener('click', onTablesSettingsClick);
billsArchiveBtn.addEventListener('click', onBillsArchiveBtnClick);
billList.addEventListener('click', onBillsListClick);
mainContainer.addEventListener('click', onMainContainerClick);

export function elementDisplay(elem, status) {
    elem.style.display = status;
}

