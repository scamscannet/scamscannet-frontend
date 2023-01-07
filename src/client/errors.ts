type statusErrorMap = {
    [key: number]: string
}
const errorCodes: statusErrorMap = {
    404: "Page not found"
}

export const checkForError = (response: Response): Response => {
    if(response.status in errorCodes){
        throw new Error(errorCodes[response.status])
    }
    return response

}