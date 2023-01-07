export type urlParams = {
    [key: string]: string
}

export const urlencodeObject = (data: urlParams ): string | null => {
    let paramArray = [];
    for(let k in Object.keys(data)){
        if (data.hasOwnProperty(k)){
            paramArray.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k]));
        }
    }
    return paramArray.length >= 1 ? paramArray.join("&") : null;
}