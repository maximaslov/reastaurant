

export function renderWaitersList(list) {

    const waiters = list.map(generateWaitersHtml).join('');

    waitersList.insertAdjacentHTML('beforeend', waiters);
}

export function onSelectWaiterFormClick(e) {
    e.preventDefault()
    selectWaiterBtn.addEventListener('click', onSelectWaiterBtnClick);
}

export function onSelectWaiterBtnClick(e) {
    e.preventDefault()
    const selectedWaiter = waitersList.value;
    
    //НЕ ПОНЯТНО КАК ПРОВАЛИДИРОВАТЬ ФОРМУ
    if (selectedWaiter) {
        changeWaitersFormDisplay('none');
        addNewBillTemplate();
        showSelectedWaiter(selectedWaiter);
        changeTablesFormDisplay('block');
    } else {
        alert('Оберіть офіціянта');
    }
    
    
    //Прочитать айди у элемента и передать в функцию
    //обработчика событий кнопки добавить
    //ЕСЛИ НЕ ВЫБРАН ОФИЦИАНТ ТО АЛЕРТ
}

export function showSelectedWaiter(waiter) {
    const newBill = document.querySelector('.' + NEW_BILL_CLASS);
    const waiterItem = selelctedWaiterTemplate(waiter);

    newBill.insertAdjacentHTML('beforeend', waiterItem);   
}

export function selelctedWaiterTemplate(waiter) {
    return `
        <div class="bills__selected_waiter">Офіціянт: ${waiter}</div>
     `
}

export function generateWaitersHtml(res) {
    const { name, id } = res;
        return `
        <option class="bills__waiter" label="${name}" id="${id}">${name}</option>
    `
}

export function changeWaitersFormDisplay(status) {
    elementDisplay(waitersForm, status);
}

// renderWaitersList()
// onSelectWaiterFormClick()
// onSelectWaiterBtnClick()
// showSelectedWaiter()
// selelctedWaiterTemplate()
// generateWaitersHtml()
// changeWaitersFormDisplay()
// changeWaitersFormDisplay()