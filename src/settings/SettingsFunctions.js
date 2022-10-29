import { elementDisplay } from '../index';
import { 
    menuSettingsBtn, 
    settingsBtn , 
    menuSettings, 
    settingsBlock , 
    waitersSettingsBtn, 
    waitersSettings, 
    loadingElem, 
    tablesSettingsBtn
} from './SettingsDomElements';
import { billBlock , billsArchiveBtn, billsArchiveSection, mainContainer} from '../bills/BillsDomElements';
import { getMenuList } from '../kitchen/KitchenFunctions';
import {tablesSettings} from '../tables/TablesDomElements'

export function onSettingsBtnClick() {
    settingsBtn.classList.toggle('selected-btn');
    
    if (settingsBtn.classList.contains('selected-btn')) {
        elementDisplay(settingsBlock, 'flex');
        elementDisplay(billBlock, 'none');
        elementDisplay(billsArchiveSection, 'none');
        billsArchiveBtn.classList.remove('selected-btn');
        
    } else {
        elementDisplay(settingsBlock, 'none');
        elementDisplay(billBlock, 'flex');
        elementDisplay(menuSettings, 'none');
        elementDisplay(waitersSettings, 'none');
        elementDisplay(tablesSettings, 'none');
        menuSettingsBtn.classList.remove('selected-btn');
        waitersSettingsBtn.classList.remove('selected-btn');
        tablesSettingsBtn.classList.remove('selected-btn');
    }
}

export function onMenuSettingsBtnClick() {
    menuSettingsBtn.classList.toggle('selected-btn');
    if (menuSettingsBtn.classList.contains('selected-btn')) {
        getMenuList();
        showLoader();
        waitersSettingsBtn.classList.remove('selected-btn');
        tablesSettingsBtn.classList.remove('selected-btn');
        elementDisplay(waitersSettings, 'none');
        elementDisplay(tablesSettings, 'none');
        elementDisplay(menuSettings, 'block');
    } else {
        elementDisplay(menuSettings, 'none');
    }
}

export function showLoader(){
    elementDisplay(loadingElem, 'flex');
    elementDisplay(mainContainer, 'none');

}

export function hideLoader(){
    elementDisplay(loadingElem, 'none');
    elementDisplay(mainContainer, 'block');
}