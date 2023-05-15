import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotasVentaComponent } from './components/notas-venta/notas-venta.component';
import {DetalleNotaVentaComponent } from './components/detalle-nota-venta/detalle-nota-venta.component';
import { ViajesComponent } from './components/viajes/viajes.component';
import { AuthGuard } from './helpers/auth.guard';
import { NavesComponent } from './components/naves/naves.component';
import { ImprimirComponent } from './components/imprimir/imprimir.component';
import { BalanzaComponent } from './components/balanza/balanza.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'notasventa', component: NotasVentaComponent,canActivate: [AuthGuard]},
  { path: 'imprimir', component: ImprimirComponent,canActivate: [AuthGuard]},
  { path: 'notasventadetalle', component: DetalleNotaVentaComponent,canActivate: [AuthGuard] },
  { path: 'naves', component: NavesComponent,canActivate: [AuthGuard] },
  { path: 'viajes', component: ViajesComponent ,canActivate: [AuthGuard] },
  { path: 'balanza', component: BalanzaComponent ,canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
