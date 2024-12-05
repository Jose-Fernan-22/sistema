import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { LoginComponent } from './pages/users/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'create-user', component: CreateUserComponent},
  { path: 'listar-productos', component: ListarProductosComponent},
  { path: '**', redirectTo:'', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
