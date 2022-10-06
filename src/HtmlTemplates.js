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
        <li class="bills__waiter" label="${name}" id="${id}">${name}</li>
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
            <input class="menuItem-title" value="${item.title}"></input>
            </td>
            <td>
            <input class="menuItem-price" value="${item.price}"></input>
            </td>
            <td class="settings__menu-del-btn"><button class="settings__menu-del-btn settings__btn">Видалити</button></td>
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
        <button class="settings__menu-btn settings__btn">Нова страва<button>
    `;
    }
}

export function addNewMenuItemForm() {
    return `
        <form class="settings__menu-form">
            <input class="settings__menu-title-input" placeholder="Введіть назву нової страви"></input>
            <input class="settings__menu-price-input" placeholder="Введіть ціну нової страви"></input>
            <button class="settings__menu-add-item settings__btn">Додати нову страву</button>
            <button class="settings__menu-cancel-item settings__btn">Скасувати</button>
        </form>
    `
}
