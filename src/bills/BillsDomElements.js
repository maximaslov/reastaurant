import {
    ADD_BILL_BTN_CLASS, 
    BILL_BLOCK_CLASS, 
    BILL_BTNS_CLASS,
    CREATE_BILL_BTN_CLASS, 
    CANCEL_BILL_BTN_CLASS, 
    BILLS_LIST_CLASS,
    NEW_BILL_TEMPLATE_CLASS,
    MAIN_CONTAINER_CLASS,
    BILL_ARCHIVE_BTN_CLASS, 
    BILLS_SECTION_CLASS, 
    BILLS_ARCHIVE_SECTION, 
    BILLS_FORM_CLASS, 
    BILLS_WAITERS_LIST_CLASS, 
    BILLS_TABLES_LIST_CLASS, 
    ACTIVE_BILL_CLASS, 
  BILLS_TEXT_CLASS
} from './BillsSelectors'

export const billBlock = document.querySelector('.' + BILL_BLOCK_CLASS);
export const addBillBtn = document.querySelector('.' + ADD_BILL_BTN_CLASS);
export const createBillBtn = document.querySelector('.' + CREATE_BILL_BTN_CLASS);
export const cancelBillBtn = document.querySelector('.' + CANCEL_BILL_BTN_CLASS);
export const billBtns = document.querySelector('.' + BILL_BTNS_CLASS);
export const billList = document.querySelector('.' + BILLS_LIST_CLASS);
export const newBillElem = document.querySelector('.' + NEW_BILL_TEMPLATE_CLASS);
export const billsArchiveBtn = document.querySelector('.' + BILL_ARCHIVE_BTN_CLASS);
export const billsSection = document.querySelector('.' + BILLS_SECTION_CLASS);
export const billsArchiveSection = document.querySelector('.' + BILLS_ARCHIVE_SECTION);
export const billsForm = document.querySelector('.' + BILLS_FORM_CLASS);
export const billsWaitersList = document.querySelector('.' + BILLS_WAITERS_LIST_CLASS);
export const billsTablesList = document.querySelector('.' + BILLS_TABLES_LIST_CLASS);
export const activeBill = document.querySelector('.' + ACTIVE_BILL_CLASS);
export const mainContainer = document.querySelector('.' + MAIN_CONTAINER_CLASS);