export interface TokenPayloadModel{
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': number,
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name':string,
    email:string,
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role':string[]

}