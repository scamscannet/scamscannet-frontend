import {userStore} from "../store/user";
import {get} from "svelte/store";
import {CLIENTS, makeApiRequest} from "../lib/client/request";
import {PATHS, APIS} from "../lib/client/apis";
import type {HTTPError} from "../lib/client/errors";
import jwt_decode from 'jwt-decode';

export const isUserLoggedIn = () => {
    const storeContent = get(userStore);
    if(storeContent === null){
        return false;
    }
    try {
        const content = jwt_decode(storeContent);
        // TODO: check for expiry
        return true
    } catch (e) {
        logout()
        return false
    }
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
    .then(response => {
        if (response.error){
            alert(response.content.detail)
        } else {
            userStore.set(response.content.access_token)
        }
    })
    .catch(error => console.log(error))
}

export const logout = () => {
    userStore.set(null);
}

export const authToken = () => {
    return get(userStore);
}