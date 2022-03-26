export interface UserWithDetailsAndRolesDto{
    userId:number;
    firstName:string;
    lastName:string;
    email:string;
    userRoleNames:string[]
}