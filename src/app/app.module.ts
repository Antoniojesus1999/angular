import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClienteService } from './cliente/cliente.service'
import { RouterModule, Routes} from '@angular/router';
import { FormComponent } from './cliente/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DetalleComponent } from './cliente/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';





registerLocaleData(localeEs, 'es');

const routes :Routes =[
  { path:'', redirectTo:'/clientes', pathMatch: 'full' },
  { path: 'directiva', component:DirectivaComponent},
  { path: 'clientes', component:ClienteComponent},
  { path: 'clientes/form', component:FormComponent, canActivate:[AuthGuard, RoleGuard],data:{role: 'ROLE_ADMIN'}},
  { path: 'clientes/page/:page', component:ClienteComponent},
  { path: 'clientes/form/:id', component: FormComponent, canActivate:[AuthGuard, RoleGuard],data:{role: 'ROLE_ADMIN'}},
  { path: 'login', component: LoginComponent},
  { path: 'facturas/:id', component: DetalleFacturaComponent},
  { path: 'facturas/form/:clienteId', component: FacturasComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClienteComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    ClienteService,
     {provide: LOCALE_ID, useValue: 'es'},
     {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true},
     {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
