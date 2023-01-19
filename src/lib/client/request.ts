import {GET} from "./requests/get";
import type {urlParams} from "./helpers/urlencode";
import {urlencodeObject} from "./helpers/urlencode";
import type {RequestType} from "./requests/requestType";
import {POST} from "./requests/post";

type Method = {
    [key: string]: RequestType
}
export const CLIENTS: Method = {
    GET: GET,
    POST: POST
}

export const makeApiRequest = async (method: RequestType, api: string, path: string, params: urlParams = {}, payload: object = {}, auth: boolean = true) => {
    let url: string = api + path
    let parsed_params = urlencodeObject(params)
    if(parsed_params){
        url = url + "?" + parsed_params
    }
    return method.execute({url , payload, auth})

}