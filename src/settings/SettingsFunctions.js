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
import { tablesSettings } from '../tables/TablesDomElements'
import { SELECTED_BTN_CLASS , SETTINGS_SELECTED_BTN_CLASS} from '../../GeneralSelectors'

export function onSettingsBtnClick() {
    settingsBtn.classList.toggle(SELECTED_BTN_CLASS);
    
    if (settingsBtn.classList.contains(SELECTED_BTN_CLASS)) {
        showOnlySettingsSection();
        
    } else {
        hideSettingsSection();
    }
}

function showOnlySettingsSection() {
    elementDisplay(settingsBlock, 'flex');
    elementDisplay(billBlock, 'none');
    elementDisplay(billsArchiveSection, 'none');
    billsArchiveBtn.classList.remove(SELECTED_BTN_CLASS);
}

function hideSettingsSection() {
    elementDisplay(settingsBlock, 'none');
    elementDisplay(billBlock, 'flex');
    elementDisplay(menuSettings, 'none');
    elementDisplay(waitersSettings, 'none');
    elementDisplay(tablesSettings, 'none');
    menuSettingsBtn.classList.remove(SETTINGS_SELECTED_BTN_CLASS);
    waitersSettingsBtn.classList.remove(SETTINGS_SELECTED_BTN_CLASS);
    tablesSettingsBtn.classList.remove(SETTINGS_SELECTED_BTN_CLASS);
}

export function onMenuSettingsBtnClick() {
    menuSettingsBtn.classList.toggle(SETTINGS_SELECTED_BTN_CLASS);
    if (menuSettingsBtn.classList.contains(SETTINGS_SELECTED_BTN_CLASS)) {
        getMenuList();
        showLoader();
        showMenuSettings();
    } else {
        hideMenuSettings()
    }
}

function showMenuSettings() {
    waitersSettingsBtn.classList.remove(SETTINGS_SELECTED_BTN_CLASS);
    tablesSettingsBtn.classList.remove(SETTINGS_SELECTED_BTN_CLASS);
    elementDisplay(waitersSettings, 'none');
    elementDisplay(tablesSettings, 'none');
    elementDisplay(menuSettings, 'block');
}

function hideMenuSettings() {
    elementDisplay(menuSettings, 'none');
}

export function showLoader(){
    elementDisplay(loadingElem, 'flex');
    elementDisplay(mainContainer, 'none');
}

export function hideLoader(){
    elementDisplay(loadingElem, 'none');
    elementDisplay(mainContainer, 'block');
}