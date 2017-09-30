import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
    selector: 'g-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    /*public username: string;
    public password: string;
    public imagen: string = '/app/shared/images/monitor.jpg';*/

    constructor(private userService: UserService, private router: Router) {
        this.userService = userService;
    }

    /*public login(username: any, password: any) {
        console.log(`El usuario introducido es ${username} con el password ${password}`);
    }*/

    /*public login() {
        console.log(`El usuario introducido es ${this.username} con el password ${this.password}`);
    }*/

    public login(username: any, password: any) {
        this.userService.login(username, password);
    }

    public cancel() {
        this.router.navigate(['']);
    }
}
