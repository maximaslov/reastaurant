import {
    ADD_BILL_BTN_CLASS, BILL_BLOCK_CLASS, BILL_BTNS_CLASS,
    CREATE_BILL_BTN_CLASS, CANCEL_BILL_BTN_CLASS, BILLS_LIST_CLASS,
    NEW_BILL_TEMPLATE_CLASS
} from "./BillsSelectors.js";

export const billBlock = document.querySelector('.' + BILL_BLOCK_CLASS);
export const addBillBtn = document.querySelector('.' + ADD_BILL_BTN_CLASS);
export const createBillBtn = document.querySelector('.' + CREATE_BILL_BTN_CLASS);
export const cancelBillBtn = document.querySelector('.' + CANCEL_BILL_BTN_CLASS);
export const billBtns = document.querySelector('.' + BILL_BTNS_CLASS);
export const billList = document.querySelector('.' + BILLS_LIST_CLASS);
export const newBillElem = document.querySelector('.' + NEW_BILL_TEMPLATE_CLASS);
