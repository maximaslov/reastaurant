import { WAITERS_FORM_CLASS, WAITERS_LIST_CLASS, SELECT_WAITER_BTN_CLASS } from "./WaitersSelectors.js";

export const waitersForm = document.querySelector('.' + WAITERS_FORM_CLASS);
export const waitersList = document.querySelector('.' + WAITERS_LIST_CLASS);
export const selectWaiterBtn = document.querySelector('.' + SELECT_WAITER_BTN_CLASS);

// const waiters = document.querySelectorAll('.' + WAITER_CLASS);