import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login.component";
import { InitiateAccountComponent } from "./init/init.component";
import { MaterialModule } from "src/app/material/material.module";
import { RegisterComponent } from "./Register/register.component";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
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