export function getRedirectPath(type, avatar) {
    let url = type === "boss"? "/boss":"/genius";
    if(!avatar){
        return `${url}info`;
    }
    return url;
}