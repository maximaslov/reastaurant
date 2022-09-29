// import { menuSettingsBtn } from './settings/SettingsConstants';

export function generateTablesHtml(res) {
    const { id } = res;
    if (res.status) {
        return `<option class="bills__table" disabled label="№${id}" id="${id}">№${id}</option>`
    } else {
        return `
        <option class="bills__table" value="${id}" label="№${id}" id="${id}">№${id}</option>
    `
    }
}

export function generateWaitersHtml(res) {
    const { name, id } = res;
        return `
        <option class="bills__waiter" label="${name}" id="${id}">${name}</option>
    `
}

export function newBillTemplate() {
    return `
    <div class="bills__new-bill">
        <h3 class="bills__new-name">Новий рахунок</h3>
    </div>
    `;
}

export function selelctedTableTemplate(id) {
    return `
        <div class="bills__selected_tabel" id="${id}">Стіл: №${id}</div>
    `
}

export function selelctedWaiterTemplate(waiter) {
    return `
        <div class="bills__selected_waiter">Офіціянт: ${waiter}</div>
     `
}

export function menuSettingsHtmlTemplate(menuItem) { {
    let menuItems = '';

    menuItem.forEach((item)=> {
        menuItems += `
        <tr class="settings__menu-list" data-id="${item.id}">
            <td>
            <input class="menuItem-title" value="${item.name}"></input>
            </td>
            <td>
            <input class="menuItem-price" value="${item.price}"></input>
            </td>
            <td class="settings__menu-del-btn"><button class="settings__menu-del-btn">Видалити</button></td>
        </tr>
        `
    })
     
    return `
        <div class="settings__menu">
        <table>
            <tr class="settings__menu-main">
                <th>Назва</th>
                <th>Ціна</th>
                <th></th>
            </tr>
                ${menuItems}
        </table>
        <button>Нова страва<button>
    `;
    }
}
