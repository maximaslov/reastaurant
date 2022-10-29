import { WAITERS_FORM_CLASS, WAITERS_LIST_CLASS } from './WaitersSelectors';
import { WAITERS_SETTINGS_BTN_CLASS } from '../settings/SettingsSelectors'

export const waitersForm = document.querySelector('.' + WAITERS_FORM_CLASS);
export const waitersList = document.querySelector('.' + WAITERS_LIST_CLASS);
export const waitersSettingsBtn = document.querySelector('.' + WAITERS_SETTINGS_BTN_CLASS);