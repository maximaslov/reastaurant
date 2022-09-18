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

// export function restaurantSettingsTemplate () {
//     return `
    
//     `
// }