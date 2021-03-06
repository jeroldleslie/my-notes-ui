import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

/* Components */
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


import { AuthService } from './services/auth.service';
import { NotesCardViewComponent } from './components/notes-card-view/notes-card-view.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { NotesCreateFormComponent } from './components/notes-create-form/notes-create-form.component';
import { NotesService } from './services/notes.service';
import { DataService } from './services/data.service';
import { ReminderComponent } from './components/reminder/reminder.component';
import { SearchComponent } from './components/search/search.component';
import { NotesMainViewComponent } from './components/notes-main-view/notes-main-view.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    NotesCardViewComponent,
    TruncatePipe,
    NotesCreateFormComponent,
    ReminderComponent,
    SearchComponent,
    NotesMainViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, NotesService, DataService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
