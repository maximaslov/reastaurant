export default class TablesApi {
    static URL = 'https://6319d7296b4c78d91b451838.mockapi.io/tables/';

    static request() {
        return fetch(this.URL)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error();
            })
    }

    static changeTableStatus(id, status) {
        return fetch(this.URL + id, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
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

    static create() {
        return fetch(this.URL, {
        method: 'POST',
        body: JSON.stringify(),
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
}