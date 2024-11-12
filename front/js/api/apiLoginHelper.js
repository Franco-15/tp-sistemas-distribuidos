const port = 3000


export function postCredentials(username, password) {
    // axios.post('')
    const credentials = {
        username: username,
        password: password
    };

    return axios.post(`http://localhost:${port}/api/login`, JSON.stringify(credentials), {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        
        //console.log(response.status, response.data);
        return response.status;

    }).catch(error => {
        console.error(error);
    });

}