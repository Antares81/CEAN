import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './admin-container/admin.component';
import { LoginComponent } from './login/login.component';

import { UserService } from './services/user.service';

const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'login', component: LoginComponent }
        ]
    }
];

@NgModule({
    imports: [  CommonModule,
                FormsModule,
                RouterModule.forChild(AdminRoutes) ],
    declarations: [ AdminComponent,
                    LoginComponent ],
    exports: [ RouterModule, AdminComponent ],
    providers: [UserService]
})
export class AdminModule {

}
