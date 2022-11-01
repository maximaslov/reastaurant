import KitchenApi from '../kitchen/KitchenApi';
import { menuSettingsHtmlTemplate , addNewMenuItemForm } from '../HtmlTemplates';
import { menuSettings } from '../settings/SettingsDomElements';
import { elementDisplay } from '../index';
import {
    MENU_SETTINGS_ITEM_CLASS, 
    SETTINGS_MENU_ADD_BTN_CLASS, 
    MENU_SETTINGS_DEL_ITEM_BTN_CLASS, 
    MENU_SETTINGS_ITEM_TITLE_CLASS, 
    MENU_SETTINGS_ITEM_PRICE_CLASS, 
    ADD_NEW_MENU_ITEM_BTN_CLASS, 
    SETTINGS_MENU_FORM_CLASS, 
    SETTINGS_TITLE_INPUT_CLASS, 
    SETTINGS_PRICE_INPUT_CLASS, 
    MENU_FORM_ERROR_CLASS, 
    MENU_FORM_AREA_CLASS
} from './KitchenSelectors'
import { showLoader, hideLoader } from '../settings/SettingsFunctions';
import {SETTINGS_MENU_BTN_STYLE_CLASS} from '../settings/SettingsSelectors';

export let menuList = [];

export function changeMenuItems(id, changes) {
    return KitchenApi.changeData(id, changes)
    .then(() => hideLoader());
}

export function removeMenuItem(id) {
    return KitchenApi.delete(id);
}

export function renderMenuList(list) {
    const menuList = menuSettingsHtmlTemplate(list)
    menuSettings.innerHTML = menuList;
}

export function getMenuList() {
    return KitchenApi.request()
        .then((list) => {
            menuList = list
            renderMenuList(menuList);
            hideLoader();
        });
}

export function onMenuSettingsClick(e) {
    e.stopPropagation();

    const button = e.target;

    if(button.classList.contains(MENU_SETTINGS_DEL_ITEM_BTN_CLASS)){
        showLoader();
        const item = button.closest('.' + MENU_SETTINGS_ITEM_CLASS);
        const id = item.dataset.id;

        removeMenuItem(id)
            .then((list) => {
                menuList = menuList.filter(item => item.id !== list.id);
                renderMenuList(menuList);
                hideLoader();
        });
    }

    if(button.classList.contains(SETTINGS_MENU_ADD_BTN_CLASS)) {
        button.classList.toggle(CANCEL_BTN_CLASS);
        button.classList.toggle(SETTINGS_MENU_BTN_STYLE_CLASS);
        
        if(button.classList.contains(CANCEL_BTN_CLASS)){
            button.textContent = 'Скасувати';
            showCreateNewMenuItemForm(SETTINGS_MENU_ADD_BTN_CLASS);
            
        } else {
            button.textContent = 'Нова страва';
            const form = document.querySelector('.' + SETTINGS_MENU_FORM_CLASS);
            elementDisplay(form, 'none');
        }
    }

    if(button.classList.contains(ADD_NEW_MENU_ITEM_BTN_CLASS)) {
        e.preventDefault();
        showLoader();
        const menuItemTitle = document.querySelector('.' + SETTINGS_TITLE_INPUT_CLASS).value;
        const menuItemPrice = document.querySelector('.' + SETTINGS_PRICE_INPUT_CLASS).value;

        if(!menuItemPrice || !Number(menuItemPrice) || !(menuItemTitle)){
            hideLoader();
            const error = document.querySelector('.' + MENU_FORM_ERROR_CLASS);
            elementDisplay(error, 'block');
        } else {
            CreateNewMenuItem(menuItemTitle, menuItemPrice);
        }
    }
}

export function onMenuSettingsFocusout(e) {
    e.stopPropagation();

    const dataItem = e.target;
    const menuElem = dataItem.closest('.' + MENU_SETTINGS_ITEM_CLASS);

    if (!menuElem) {
        return;
    } else {
        const id = menuElem.dataset.id;

        if (dataItem.classList.contains(MENU_SETTINGS_ITEM_TITLE_CLASS)){
            showLoader();
            changeMenuItems(id, {title: dataItem.value});
        }

        if (dataItem.classList.contains(MENU_SETTINGS_ITEM_PRICE_CLASS)){
            showLoader();
            changeMenuItems(id, {price: dataItem.value});  
            console.log(id, dataItem.value)
        }
    }
}

function showCreateNewMenuItemForm () {
    const formTemplate = addNewMenuItemForm();
    const formArea = document.querySelector('.' + MENU_FORM_AREA_CLASS);
    formArea.innerHTML = formTemplate;
}

function CreateNewMenuItem (title, price) {
    const newMenuItem = {
        title,
        price,
    }

    KitchenApi.create(newMenuItem).
        then(item => {
            menuList.push(item);
            renderMenuList(menuList);
            hideLoader();
        });
}