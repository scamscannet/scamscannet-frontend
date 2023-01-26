type Domain = {
    subdomain: String,
    domain:String,
    tld:String,
    path:String,
    query:Object,
    fragment:String,
    parameters:Array<String>,
}


export const domainObjectToUrl = (domain: Domain) => {
    let url = "";

    if (domain.subdomain){
        url += domain.subdomain + ".";
    }

    url += domain.domain;
    url += "." + domain.tld;
    if (domain.path){
        url += domain.path.startsWith("/") ? domain.path : "/" + domain.path ;
    }

    return url

}