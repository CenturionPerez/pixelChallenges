import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MaterialModule } from "src/app/material/material.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LayoutComponent } from "./pages/layout/layout.component";
import { RegisterComponent } from "./pages/register/register.component";
import { InitComponent } from "./pages/init/init.component";

@NgModule({
    declarations: [
        LayoutComponent,
        RegisterComponent,
        InitComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AuthRoutingModule
    ],
    exports: [
        LayoutComponent
    ],
    providers: [],
    bootstrap: [LayoutComponent]
  })
  export class AuthModule { }