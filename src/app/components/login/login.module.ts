import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login.component";
import { CreateAccountComponent } from "./createAccount/createAccount.component";
import { InitiateAccountComponent } from "./initiateAccount/initiateAccount.component";
import { MaterialModule } from "src/app/material/material.module";

@NgModule({
    declarations: [
        LoginComponent,
        CreateAccountComponent,
        InitiateAccountComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        LoginComponent
    ],
    providers: [],
    bootstrap: [LoginComponent]
  })
  export class LoginModule { }