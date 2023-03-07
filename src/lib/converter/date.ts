
export const dateDifferenceToNow = (date: string, output:string = "d") => {
    const now = Date.now();
    const input = Date.parse(date);
    const diffTime = Math.abs(now - input);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;

}

export const dateDifferenceAsString = (date: string, output:string = "d") => {
    const now = Date.now();
    const input = Date.parse(date);
    const diffTime = Math.abs(now - input);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 360) {
        return `${diffDays} days`
    } else {
        const diffYears = Math.floor(diffDays / 360)
        return `${diffYears} years`

    }

}

