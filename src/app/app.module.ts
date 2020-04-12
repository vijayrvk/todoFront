import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ViewTaskComponent } from './pages/task/view-task/view-task.component';
import { HeaderComponent } from './component/header/header.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {Interceptor} from './interceptor';
import { CreateTaskComponent } from './pages/task/create-task/create-task.component';
import { NotFoundComponent } from './pages/not-found/not-found.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ViewTaskComponent,
    HeaderComponent,
    CreateTaskComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbDatepickerModule,
    NgbModule
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  },
{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
