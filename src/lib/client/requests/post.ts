import {checkForError} from "../errors";
import type {RequestType} from "./requestType";
import {authHeader} from "../helpers/auth_header";


export const POST: RequestType = {
    execute: postRequest
}

export const CONTENTTYPES = {
    JSON: "application/json"
}

async function postRequest({
   url = "",
   payload = {
       body: undefined,
       contentType: "application/json"
   },
    auth = false
}): Promise<object> {
    let headers: Headers;
    if(auth){
        alert("here");
        headers = authHeader();
        console.log(headers);
    } else {
        headers = new Headers();
    }

    headers.set('Content-Type', payload.contentType)

    let response = await fetch(url, {
            method: "POST",
            headers,
            body: payload.body
        }
    )


    return await checkForError(response)
}