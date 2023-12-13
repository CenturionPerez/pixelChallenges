import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', 
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    { path: '404',
      loadChildren: () => import('./error/error.module').then(m => m.ErrorModule),
    },
    { path: '**', redirectTo: '404'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
