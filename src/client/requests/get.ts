import {checkForError} from "../errors";

export const GET = (url: string, path: string, params = {}): object => {
    fetch(
        url + "/" + path + new URLSearchParams(params),
        {
            method: "GET",
        }
    )
        .then(response => checkForError(response))
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch((error) => {
            throw new Error(error)
        })
    return {}
}