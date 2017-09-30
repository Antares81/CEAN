import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    public userLogged: boolean = false;

    public login(username: string, password: string) {
        console.log(`LOGIN en el server con credenciales ${username} - ${password}`);
    }

}
