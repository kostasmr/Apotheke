import { Order } from "./Order";

export class User{
    id!:string;
    email!:string;
    password!:string;
    name!:string;
    token!:string;
    resetToken!:string;
    isAdmin!:boolean;
    tokens!:[];
}