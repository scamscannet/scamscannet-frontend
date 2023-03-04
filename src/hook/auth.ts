import {userStore} from "../store/user";
import {get} from "svelte/store";
import {CLIENTS, makeApiRequest} from "../lib/client/request";
import {PATHS, APIS} from "../lib/client/apis";
import {redirect} from "@sveltejs/kit";
import {browser} from "$app/environment";
import {goto} from "$app/navigation";
import {parseJwt} from "../lib/jwt";
import {page} from "$app/stores";



function jwtTokenExpired(){
    const { exp } = parseJwt("refreshToken");
    if (Date.now() >= exp * 1000) {
        return false;
    }
}

export const isUserLoggedIn = () => {
    const storeContent = get(userStore);
    if(storeContent === null){
        return false;
    }
    try {
        const { exp } = parseJwt(storeContent);
        let valid = Date.now() < exp * 1000
        if(!valid){
            logout()
        }
        return valid;


    } catch (e) {
        logout()
        return false
    }
}

export const authenticate = async (username: string, password: string) => {
    let body_string = `username=${username}&password=${password}`
    let success = false;
    await makeApiRequest(
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
            success = true;
        }
    })
    .catch(error => console.log(error))
    return success
}

export const logout = () => {
    userStore.set(null);
}

export const authToken = () => {
    return get(userStore);
}

export const redirectToLoginIfNotAuthenticated = () => {
    let location = "/authentication/login";
    if(!isUserLoggedIn()){
        if (browser) return goto(location);
        else throw redirect(302, location);    }
}