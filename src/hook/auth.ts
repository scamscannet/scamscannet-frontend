import {userStore} from "../store/user";
import {get} from "svelte/store";
const user = 't'
const pass = '123456'

export const getUserDetails = async ( username:string, password:string ) => {
    console.log(username);
    console.log(password);
    return username == user && password === pass ? 1 : 0;
}

export const isUserLoggedIn = () => {
    return (get(userStore) !== null);
}
function handleErrors(response: Response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
export const authenticate = async (username: string, password: string) => {
    let body_string = `username=${username}&password=${password}`
    fetch("http://127.0.0.1:8000/user/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: body_string
    })
        .then(response => handleErrors(response))
        .then(response => response.json())
        .then(data => {
            alert("success")
            let token = data.access_token;
            userStore.set(token);
            return true;
        })
        .catch(error => {
            console.log(error);
            alert("login Failed");
            return 0;
        })

}

export const logout = () => {
    userStore.set(null);
    console.log(userStore)
}