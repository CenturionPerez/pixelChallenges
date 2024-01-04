import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ClassificationComponent } from './pages/classification/classification.component';
import { GameComponent } from './pages/game/game.component';


const routes: Routes = [
  { 
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'classification',
        component: ClassificationComponent
      },
      {
        path: 'game',
        component: GameComponent
      },
      {
        path: 'playAsInvited',
        component: GameComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ],
})
export class PagesRoutingModule { }