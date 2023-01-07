import {checkForError} from "../errors";
import type {RequestType} from "./requestType";


export const GET: RequestType = {
    execute: getRequest
}
async function getRequest  ({url = "", payload = {} }): Promise<object> {
    let response = await fetch(url, {
            method: "GET",
        }
    )
    checkForError(response)
    return response.json()
}