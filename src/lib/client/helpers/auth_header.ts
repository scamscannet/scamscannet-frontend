import {isUserLoggedIn, authToken} from "../../../hook/auth";

export const authHeader = () => {
    if(!isUserLoggedIn()){
        throw new Error("User isn't logged in");
    }
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + authToken());
    return headers
}