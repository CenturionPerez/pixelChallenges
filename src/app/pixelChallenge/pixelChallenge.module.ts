import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { InitComponent } from "../auth/pages/init/init.component";
import { MaterialModule } from "src/app/material/material.module";
import { ClassificationComponent } from "./pages/classification/classification.component";
import { PagesRoutingModule } from "./pixelChallenge-routing.module";
import { LayoutComponent } from "./pages/layout/layout.component";
import { GameComponent } from "./pages/game/game.component";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileComponent } from "./pages/profile/profile.component";



@NgModule({
    declarations: [
        LayoutComponent,
        GameComponent,
        WelcomeComponent,
        ClassificationComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    exports: [

    ],
    providers: [],
    bootstrap: [InitComponent]
  })
  export class PagesModule { }
