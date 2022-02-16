import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './cliente/cliente.service'
import { RouterModule, Routes} from '@angular/router';
import { FormComponent } from './cliente/form.component';
import { FormsModule } from '@angular/forms';

const routes :Routes =[
  { path:'', redirectTo:'/clientes', pathMatch: 'full' },
  { path:'directiva', component:DirectivaComponent},
  { path: 'clientes', component:ClienteComponent},
  { path: 'clientes/form', component:FormComponent},
  { path: 'clientes/form/:id', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClienteComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
