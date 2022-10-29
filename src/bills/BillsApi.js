export default class BillsApi {
    static URL = 'https://6319d7296b4c78d91b451838.mockapi.io/bills/';

    static request() {
        return fetch(this.URL)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error();
            })
    }

    static getOneBill(id) {
        return fetch(this.URL+id)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error();
            })
    }

    static changeBillStatus(id, status) {
        return fetch(this.URL + id, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error();
        })
    }

    static changeBillTotalPrice(id, price) {
        return fetch(this.URL + id, {
        method: 'PUT',
        body: JSON.stringify({ totalprice: price }),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error();
        })
    }

    static create(newBill) {
        return fetch(this.URL, {
        method: 'POST',
        body: JSON.stringify(newBill),
        headers: {
            'Content-type': 'application/json',
        }
    })  
        .then(item => {
            if(item.ok){
                return item.json();
            }
        })
        .catch((e) => alert(e.message));
    }

    static delete(id) {
        return fetch(this.URL + id, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
    }

    static addOrder(id, kitchen) {
        return fetch(this.URL + id, {
        method: 'PUT',
        body: JSON.stringify( {kitchen} ),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error();
        })
    }
}