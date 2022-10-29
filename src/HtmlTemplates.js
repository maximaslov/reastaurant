export function generateTablesHtml(res) {
    const { id } = res;
    if (res.status) {
        return`<option class="bills__table" value="${id}" disabled data-id="${id}">№${id}</option>`
    } else {
        return `
        <option class="bills__table" value="${id}" data-id="${id}">№${id}</option>
    `
    }
}

export function defaultTablesValue(){
    return `<option class="bills__table" disabled selected>Оберіть номер стола</option>`
}

export function generateWaitersHtml(res) {
    const { name, id } = res;
        return `
        <option class="bills__waiter" label="${name}" id="${id}">${name}</option>
    `
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

export function menuSettingsHtmlTemplate(list) { {
    let menuItems = '';

    list.forEach((item)=> {
        menuItems += `
        <tr class="settings__menu-item" data-id="${item.id}">
            <td class="settings__menu-title-input-container">
            <input class="menuItem-title" value="${item.title}"></input>
            </td>
            <td>
            <input class="menuItem-price" value="${item.price}"></input>
            </td>
            <td><button class="settings__menu-del-btn">Видалити</button></td>
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
        <button class="settings__menu-btn settings__btn">Нова страва</button>
        <div class="settings__menu-form-area"><div/>
    `;
    }
}

export function waitersSettingsHtmlTemplate(list) { {
    let waitersItems = '';

    list.forEach((item)=> {
        waitersItems += `
        <tr class="settings__waiters-item" data-id="${item.id}">
            <td class="settings__waiters-input-container">
            <input class="waiter-name" value="${item.name}"></input>
            </td>
            <td><button class="settings__waiter-del-btn">Видалити</button></td>
        </tr>
        `
    })
     
    return `
        <div class="settings__waiters">
        <table>
            <tr class="settings____waiters-main">
                <th>Офіціянт</th>
            </tr>
                ${waitersItems}
        </table>
        <button class="settings__waiters-btn settings__btn">Додати офіціянта</button>
        <div class="settings__waiters-form-area"><div/>
    `;
    }
}
export function tablesSettingsHtmlTemplate(list) { {
    let tablesItems = '';

    list.forEach((item)=> {
        tablesItems += `
        <tr class="settings__tables-item" data-id="${item.id}">
            <td class="settings__tables-item-td">
            <p class="table-name" value="${item.id}">Стіл № ${item.id}</p>
            <button class="settings__table-del-btn">Видалити</button>
            </td>
        </tr>
        `
    })
     
    return `
        <div class="settings__tables">
        <table class="settings__tables-table">
            <tr class="settings____tables-main">
                <th>Список столів</th>
            </tr>
                ${tablesItems}
        </table>
        <button class="settings__tables-btn settings__btn">Додати стіл</button>
        <div class="settings__tables-form-area"><div/>
    `;
    }
}

export function addNewMenuItemForm() {
    return `
        <form class="settings__menu-form">
            <input value="" class="settings__menu-title-input" placeholder="Введіть назву нової страви"></input>
            <input value="" class="settings__menu-price-input" placeholder="Введіть ціну нової страви"></input>
            <button type="submit" class="settings__menu-add-item settings__btn">Додати нову страву</button>
            <p class="settings__input-error">
            Заповніть, будь ласка, правильно форму:<br>
            - Поле з назвою страви не повинно бути пустим;<br>
            - Поле з ціною не повинно бути пустим та містити тількі цифри.
            </p>
        </form>
    `
}
export function addNewWaiterForm() {
    return `
        <form class="settings__waiter-form">
            <input value="" class="settings__waiter-name-input" placeholder="Введіть імʼя нового офіціянта"></input>
            <button type="submit" class="settings__waiters-add-item settings__btn">Додати офіціянта</button>
            <p class="settings__waiters-error">
            Заповніть, будь ласка, правильно форму:<br>
            - Поле не повинно бути пустим;
            </p>
        </form>
    `
}

export function addNewTableForm() {
    return `
        <form class="settings__tables-form">
            <input value="" class="settings__table-name-input" placeholder="Введіть номер нового стола"></input>
            <button type="submit" class="settings__tables-add-item settings__btn">Додати стіл</button>
            <p class="settings__tables-error">
            Заповніть, будь ласка, правильно форму:<br>
            - Поле не повинно бути пустим;
            - Поле повинно містити тільки цифри
            </p>
        </form>
    `
}

export function archiveListTemplate (elem) {
    const kitchen = elem.kitchen;
    let kitchenItems = '';
    kitchen.map((e, i) => {
        kitchenItems += `
            <p>${i+1}.${e.title} - </p>
            <p>${e.price} грн.</p>
        `
    })
        if(!elem.status) {
            return `
            <div data-id="${elem.id}" class="archive-bill-item">
                <p class="archive-bill-item-number">Рахунок №${elem.id}</p>
                <p>Від ${elem.data}</p>
                <p>Офіціянт: ${elem.waiter}</p>
                <p>Столик: ${elem.table}</p>
                <p>Замовлення по кухні:
                <div class="kitchen-orders">${kitchenItems}</div>
                </p>
                <p class="archive-bill-item-price">Загальна сумма: ${elem.totalprice} грн.</p>
            </div>
            `
        }
}

export function newBillTemplate(elem) {
    const kitchen = elem.kitchen;
    let kitchenItems = '';
    let totalPrice = 0;
    kitchen.map(e => {
        totalPrice += Number(e.price);
    });
    kitchen.map((e, i) => {
        kitchenItems += `
            <p>${i+1}.${e.title} - </p>
            <p>${e.price} грн.</p>
        `
    })
    if(elem.status) {
        return `
        <div data-id="${elem.id}" class="active-bill-item">
            <p>Рахунок №${elem.id}</p>
            <p>Від ${elem.data}</p>
            <p>Офіціянт: ${elem.waiter}</p>
            <p class="bills__active-bill-table" data-id="${elem.table}">Стіл № ${elem.table}</p>
            <p>Замовлення по кухні:
                <div class="kitchen-orders">
                    ${kitchenItems}
                </div>
            </p>
            <p class="bills__total-price" data-id="${totalPrice.toFixed(2)}">Загальна сумма: ${totalPrice.toFixed(2)} грн.</p>
            <button class="bills__add-kitchen-item-btn bill-btn">Додати до замовлення</button>
            <button class="bills__close-bill-btn bill-btn">Закрити рахунок</button>
            <button class="bills__cancel-bill-btn bills__cancel-btn">Скасувати</button>
        </div>
        `
    }
}

export function modalWindow(billId, tableId, list) {
    let menuItems = '';

    list.forEach((item)=> {
        menuItems += `
        <div class="bills__menu-item" data-id="${item.id}">
            <p class="menuItem-title" data-id="${item.title}">${item.title}</p>
            <p class="menuItem-price" data-id="${item.price}">${item.price}</p>
            <button class="bills__menu-add-btn settings__btn">Додати до замовлення</button>
        </div>
        `
    })
    return `
        <div data-id="${billId}"class="bills__modal-window">
            <div class="bills__menu-items">
            <h3 id=${tableId}>Додати замовлення до столика №${tableId}</h3>
                ${menuItems}
            <button class="bills__cancel-modal-btn bills__cancel-btn">Скасувати</button>
            </div>
            
        </div>
    `
}

