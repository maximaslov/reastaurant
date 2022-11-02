import style from  './styles/styles.css'
import normalize from  './styles/normalize.css';

import { 
    addBillBtn, 
    createBillBtn, 
    cancelBillBtn, 
    billsArchiveBtn, 
    billList, 
    mainContainer
} from './bills/BillsDomElements';
import { 
    menuSettingsBtn, 
    menuSettings, 
    settingsBtn, 
    waitersSettingsBtn, 
    waitersSettings, 
    tablesSettingsBtn
} from './settings/SettingsDomElements';
import { 
    renderTablesList, 
    getTablesList, 
    onTablesSettingsBtnClick, 
    onTablesSettingsClick 
} from './tables/TablesFunctions';
import { 
    onAddBillBtnClick, 
    onCreateBillBtnClick, 
    onCancelBillBtnClick , 
    onBillsArchiveBtnClick, 
    getOpenBillsList,
    onBillsListClick, 
    onMainContainerClick
} from './bills/BillsFunctions';
import { 
    renderWaitersList, 
    getWaitersList, 
    onWaitersSettingsClick, 
    onWaitersSettingsBtnClick, 
    onWaitersSettingsFocusout
} from './waiters/WaitersFunctions';
import { onMenuSettingsClick, onMenuSettingsFocusout } from './kitchen/KitchenFunctions';
import { onSettingsBtnClick, onMenuSettingsBtnClick } from './settings/SettingsFunctions';
import { tablesSettings } from './tables/TablesDomElements';

showMainContent()

export let tablesArr = [];
getTablesList()
    .then((list) => {
        tablesArr = list;
        renderTablesList(list);
    });

getWaitersList()
    .then(list => renderWaitersList(list));

getOpenBillsList();

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

function showMainContent() {
    const HEADER_BLOCK_CLASS = 'header';
    const BILLS_BLOCK_CLASS = 'bills';

    const HEADER_BLOCK = document.querySelector('.' + HEADER_BLOCK_CLASS);
    const BILLS_BLOCK = document.querySelector('.' + BILLS_BLOCK_CLASS);

    elementDisplay(HEADER_BLOCK, 'flex');
    elementDisplay(BILLS_BLOCK, 'flex');
}
