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

const routes :Routes =[
  { path:'', redirectTo:'/clientes', pathMatch: 'full' },
  { path:'directiva', component:DirectivaComponent},
  { path: 'clientes', component:ClienteComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
