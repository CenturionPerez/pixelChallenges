import { ClientAuthentication } from "src/app/auth/interfaces/auth.interface";

export interface User extends ClientAuthentication{
    img: string,
    name: string
}