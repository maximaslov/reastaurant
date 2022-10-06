import { elementDisplay } from '../index';
import { menuSettingsBtn, settingsBtn , menuSettings, settinsBlock } from './SettingsDomElements';
import { billBlock } from '../bills/BillsDomElements';
import { getMenuList } from '../kitchen/KitchenFunctions';
import {newMenuItemForm} from '../kitchen/KitchenDomElements'

export function onSettingsBtnClick() {
    settingsBtn.classList.toggle('selected-btn');
    if (settingsBtn.classList.contains('selected-btn')) {
        elementDisplay(settinsBlock, 'block');
        elementDisplay(billBlock, 'none');
        
    } else {
        elementDisplay(settinsBlock, 'none');
        elementDisplay(billBlock, 'flex');
        hideMenuSettings();
        menuSettingsBtn.classList.remove('selected-btn');
    }
}

export function onMenuSettingsBtnClick() {
    menuSettingsBtn.classList.toggle('selected-btn');
    if (menuSettingsBtn.classList.contains('selected-btn')) {
        showMenuSettings();
        console.log(33)
        console.log(newMenuItemForm)
    } else {
        hideMenuSettings()
        console.log(newMenuItemForm)
    }
}

function hideMenuSettings() {
    elementDisplay(menuSettings, 'none')
}

function showMenuSettings() {
    getMenuList();
    elementDisplay(menuSettings, 'block');
}