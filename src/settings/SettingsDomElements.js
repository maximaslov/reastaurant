import {
    MENU_SETTINGS_BTN_CLASS,
    WAITERS_SETTINGS_BTN_CLASS,
    TABLES_SETTINGS_BTN_CLASS,
    MENU_SETTINGS_CLASS,
    SETTINGS_MENU_DEL_BTN_CLASS
} from './SettingsSelectors.js';

export const menuSettingsBtn = document.querySelector('.' + MENU_SETTINGS_BTN_CLASS);
export const waitersSettingsBtn = document.querySelector('.' + WAITERS_SETTINGS_BTN_CLASS);
export const tablesSettingsBtn = document.querySelector('.' + TABLES_SETTINGS_BTN_CLASS);
export const menuSettings = document.querySelector('.' + MENU_SETTINGS_CLASS);
export const menuSettingsDelBtn = document.querySelector('.' + SETTINGS_MENU_DEL_BTN_CLASS);