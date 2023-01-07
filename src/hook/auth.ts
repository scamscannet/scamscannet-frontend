import {userStore} from "../store/user";
import {get} from "svelte/store";
import {CLIENTS, makeApiRequest} from "../client/request";
import {PATHS, APIS} from "../client/apis";

export const isUserLoggedIn = () => {
    return (get(userStore) !== null);
}

export const authenticate = async (username: string, password: string) => {
    let body_string = `username=${username}&password=${password}`
    makeApiRequest(
        CLIENTS.POST,
        APIS.authentication,
        PATHS.authentication.login,
        {},
        {
            contentType: "application/x-www-form-urlencoded",
            body: body_string
        }
    )
    .then(response => userStore.set(response.access_token))
    .catch(error => alert("Invalid Username or Password"))

}

export const logout = () => {
    userStore.set(null);
    console.log(userStore)
}