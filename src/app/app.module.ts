import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FilmesComponent } from './components/filmes/filmes.component';
import { GeneroComponent } from './components/genero/genero.component';
import { DialogComponent } from './components/dialog-usuario/dialog.component';
import { DialogGeneroComponent } from './components/dialog-genero/dialog-genero.component';
import { DialogFilmeComponent } from './components/dialog-filme/dialog-filme.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UsuariosComponent,
    FilmesComponent,
    GeneroComponent,
    DialogComponent,
    DialogGeneroComponent,
    DialogFilmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
