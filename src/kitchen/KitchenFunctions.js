import KitchenApi from '../kitchen/KitchenApi';
import { menuSettingsHtmlTemplate , addNewMenuItemForm} from '../HtmlTemplates';
import { menuSettings } from '../settings/SettingsDomElements';
import {MENU_SETTINGS_ITEM, SETTINGS_MENU_ADD_CLASS} from './KitchenSelectors'
import {elementDisplay} from '../index';

export let menuList = [];

export function changeMenuItems(id, changes) {
    return KitchenApi.changeData(id, changes);
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
        });
}

export function onMenuSettingsClick(e) {
    const button = e.target;
    const item = button.closest('.settings__menu-list');
    const id = item.dataset.id;
    if (button.classList.contains('settings__menu-del-btn')) {
        removeMenuItem(id)
            .then((list) => {
                menuList = menuList.filter(item => item.id !== list.id);
                renderMenuList(menuList);
        })
    }
}

export function onMenuSettingsFocusout(e) {
    e.stopPropagation();

    const dataItem = e.target;
    const menuElem = dataItem.closest('.settings__menu-list');
    const id = menuElem.dataset.id;
    console.log(menuElem);
    console.log(id);

    if (dataItem.classList.contains('menuItem-title')){
        changeMenuItems(id, {title: dataItem.value});
    }
    if (dataItem.classList.contains('menuItem-price')){
        changeMenuItems(id, {price: dataItem.value});  
    }
}

export function onMenuSettingsAddBtnClick(e) {
    e.stopPropagation();
    const button = e.target;
    if(button.classList.contains(SETTINGS_MENU_ADD_CLASS)) {
        elementDisplay(button, 'none');
        showCreateNewMenuItemForm();
    }
    
    //показать форму
    //отправить запрос Пут на сервер
}

function showCreateNewMenuItemForm () {
    const form = addNewMenuItemForm();
    menuSettings.insertAdjacentHTML('beforeend', form);
}