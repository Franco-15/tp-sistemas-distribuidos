

const port = 3000;

export function postCredentials(username, password) {
    const port = 3000;
    // axios.post('')
    const credentials = {
        username: username,
        password: password
    };

    

    return axios.post(`http://localhost:${port}/api/login`, '',{
        headers: {
            authorization: `Basic ${btoa(username + ":" + password)}`
        }
    })
    .then((response) => {
        // console.log(response.status, response.data);
        localStorage.setItem("accessToken",response.data.accessToken)
        localStorage.setItem("refreshToken",response.data.refreshToken)
        return response.status;

    }).catch(error => {
        console.error(error);
    });

}

export function refresh(){
    return axios.post(`http://localhost:${port}/api/refresh`, '',{
         headers: {
             authorization: `Bearer ${localStorage.getItem("refreshToken")}`
         }
     }) 
     .then((response) => {
         console.log(response.status, response.data);
         localStorage.setItem("accessToken",response.data.accessToken)
         localStorage.setItem("refreshToken",response.data.refreshToken)
     }).catch(error => {
        console.error(error);  //! ACA HABRIA QUE DESLOGUEAR AL USUARIO DEL SISTEMA
        window.location.hash = '#/login';
     });

}