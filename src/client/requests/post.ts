import {checkForError} from "../errors";
import type {RequestType} from "./requestType";


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
   }
}): Promise<object> {
    let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': payload.contentType
            },
            body: payload.body
        }
    )


    return await checkForError(response)
}