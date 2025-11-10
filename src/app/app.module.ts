import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ViajesComponent } from './components/viajes/viajes.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NotasVentaComponent } from './components/notas-venta/notas-venta.component';
import { TopComponent } from './components/shared/top/top.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { DetalleNotaVentaComponent } from './components/detalle-nota-venta/detalle-nota-venta.component';
import { NavesComponent } from './components/naves/naves.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { ImprimirComponent } from './components/imprimir/imprimir.component';
import { BalanzaComponent } from './components/balanza/balanza.component'
import {MatDialogModule} from "@angular/material/dialog";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ZkitComponent } from './components/zkit/zkit.component';
import { ZkitArmadoComponent } from './components/zkit-armado/zkit-armado.component';
@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    SweetAlert2Module

],
declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ViajesComponent,
    NotasVentaComponent,
    TopComponent,
    FooterComponent,
    MenuComponent,
    DetalleNotaVentaComponent,
    NavesComponent,
    LoadingComponent,
    ImprimirComponent,
    BalanzaComponent,
    ZkitComponent,
    ZkitArmadoComponent,

],
providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
],

bootstrap: [AppComponent]
})
export class AppModule { }
/*{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }*/