import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { InitComponent } from "../auth/pages/init/init.component";
import { MaterialModule } from "src/app/material/material.module";
import { ClassificationComponent } from "./pages/classification/classification.component";
import { PagesRoutingModule } from "./pixelChallenge-routing.module";

@NgModule({
    declarations: [
        ClassificationComponent,


    ],
    imports: [
        CommonModule,
        MaterialModule,
        PagesRoutingModule
    ],
    exports: [

    ],
    providers: [],
    bootstrap: [InitComponent]
  })
  export class PagesModule { }
