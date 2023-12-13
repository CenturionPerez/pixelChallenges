import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { LoginComponent } from "../../auth/pages/login/login.component";
import { InitComponent } from "../../auth/pages/init/init.component";
import { MaterialModule } from "src/app/material/material.module";
import { RegisterComponent } from "../../auth/pages/Register/register.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { ClassificationComponent } from "./classification/classification.component";
@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        InitComponent,
        ClassificationComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        PagesRoutingModule
    ],
    exports: [
        LoginComponent
    ],
    providers: [],
    bootstrap: [LoginComponent]
  })
  export class PagesModule { }