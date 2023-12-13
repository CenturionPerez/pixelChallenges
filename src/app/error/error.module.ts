import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MaterialModule } from "src/app/material/material.module";
import { ErrorComponent } from "./error.component";
import { ErrorRoutingModule } from "./error-routing.module";

@NgModule({
    declarations: [
        ErrorComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ErrorRoutingModule
    ],
    providers: [],
    bootstrap: [ErrorComponent]
  })
  export class ErrorModule { }