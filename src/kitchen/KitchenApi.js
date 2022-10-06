export default class KitchenApi {
    static URL = 'https://6319d7296b4c78d91b451838.mockapi.io/kitchen/';

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