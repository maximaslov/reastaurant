export default class WaitersApi {
    static URL = 'https://6319d7296b4c78d91b451838.mockapi.io/waiters/';

     static request() {
        return fetch(this.URL)
        .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error();
        })
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

    static create(waiter) {
        return fetch(this.URL, {
        method: 'POST',
        body: JSON.stringify(waiter),
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

    static changeData(id, changes) {
        return fetch(this.URL + id, {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
            'Content-type': 'application/json',
        }
    })
            .catch((e) => alert(e.message));
    }
}