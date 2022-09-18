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
            'Content-type': 'application/json',
        }
    })
            .catch((e) => alert(e.message));
    }
}