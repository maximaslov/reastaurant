import {
  MENU_SETTINGS_BTN_CLASS,
  WAITERS_SETTINGS_BTN_CLASS,
  TABLES_SETTINGS_BTN_CLASS,
  MENU_SETTINGS_CLASS,
  SETTINGS_MENU_DEL_BTN_CLASS,
  HEADER_SETTINGS_BTN_CLASS, 
  SETTINGS_BLOCK_CLASS, 
  WAITERS_SETTINGS_CLASS, 
  LOADING_CLASS
} from './SettingsSelectors';

export const menuSettingsBtn = document.querySelector('.' + MENU_SETTINGS_BTN_CLASS);
export const waitersSettingsBtn = document.querySelector('.' + WAITERS_SETTINGS_BTN_CLASS);
export const tablesSettingsBtn = document.querySelector('.' + TABLES_SETTINGS_BTN_CLASS);
export const menuSettings = document.querySelector('.' + MENU_SETTINGS_CLASS);
export const waitersSettings = document.querySelector('.' + WAITERS_SETTINGS_CLASS);
export const menuSettingsDelBtn = document.querySelector('.' + SETTINGS_MENU_DEL_BTN_CLASS);
export const settingsBlock = document.querySelector('.' + SETTINGS_BLOCK_CLASS);
export const settingsBtn = document.querySelector('.' + HEADER_SETTINGS_BTN_CLASS);
export const loadingElem = document.querySelector('.' + LOADING_CLASS);