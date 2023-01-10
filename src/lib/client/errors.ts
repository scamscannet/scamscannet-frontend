type statusErrorMap = {
    [key: number]: string
}

export type HTTPError = {
    error: boolean;
    code: number;
    explanation: string;
    content: object,
}

export type HTTPResponse = {
    error: boolean;
    content: object
}
const errorCodes: statusErrorMap = {
    404: "Page not found",
    401: "Unauthorized"
}

export const checkForError = async (response: Response): Promise<HTTPResponse | HTTPError> => {
    const content = await response.json();
    if(response.status in errorCodes){
        return {
            error: true,
            content: content,
            explanation: errorCodes[response.status],
            code: response.status
        }
    }
    return {
        error: false,
        content: content
    }

}