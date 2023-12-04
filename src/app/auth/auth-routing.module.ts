import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { InitComponent } from './pages/init/init.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'init',
                component: InitComponent,
            }
        ]
    }

]


@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ],
})
export class AuthRoutingModule { }