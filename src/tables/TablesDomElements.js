import { 
    SELECT_TABLE_BTN_CLASS, 
    TABLES_LIST_CLASS, 
    TABLES_FORM_CLASS, 
    SETTINGS_TABLES_BTN_CLASS, 
    TABLES_SETTINGS_BLOCK
} from './TablesSelectors';

export const tablesList = document.querySelector('.' + TABLES_LIST_CLASS);
export const selectTableBtn = document.querySelector('.' + SELECT_TABLE_BTN_CLASS);
export const tablesForm = document.querySelector('.' + TABLES_FORM_CLASS);
export const tablesSettingsBtn = document.querySelector('.' + SETTINGS_TABLES_BTN_CLASS);
export const tablesSettings = document.querySelector('.' + TABLES_SETTINGS_BLOCK);