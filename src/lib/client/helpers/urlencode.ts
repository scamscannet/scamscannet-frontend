export type urlParams = {
    [key: string]: any
}

export const urlencodeObject = (data: urlParams ): string | null => {
    let paramArray = [];
    const keys = Object.keys(data);
    for(const k in keys){
        if (data.hasOwnProperty(keys[k])){
            paramArray.push(encodeURIComponent(keys[k]) + "=" + encodeURIComponent(data[keys[k]]));
        }
    }
    return paramArray.length >= 1 ? paramArray.join("&") : null;
}