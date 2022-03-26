export interface UserForUpdateDto{
    userId:number;
    newEmail:string;
    currentPassword:string;
    newPassword:string;
    firstName:string;
    lastName:string
}