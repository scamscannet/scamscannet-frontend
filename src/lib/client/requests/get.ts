import {checkForError} from "../errors";
import type {RequestType} from "./requestType";
import {authHeader} from "../helpers/auth_header";


export const GET: RequestType = {
    execute: getRequest
}
async function getRequest  ({url = "", payload = {}, auth = true }): Promise<object> {
    let headers: Headers;
    if(auth){
        headers = authHeader();
    } else {
        headers = new Headers();
    }
    let response = await fetch(url, {
            method: "GET",
            headers: headers
        }
    )

    return await checkForError(response)
}