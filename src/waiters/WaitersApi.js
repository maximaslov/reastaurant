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
}