import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpRequestService } from "./services/http-request.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader/loader.component';
import { HttpRequestInterceptor } from './services/http-request.interceptor';
import { TokenInterceptor } from './services/token.interceptor';
import { AddResortDialog, DeleteResortDialog, EditResortDialog, ResortsBoardComponent } from './dashboard/resorts/resorts-board/resorts-board.component';
import { ResortsBoardModule } from './dashboard/resorts/resorts-board/resorts-board.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddAvailabeTimeDialog, AvailabeTimeComponent, DeleteAvailabeTimeDialog, EditAvailabeTimeDialog } from './dashboard/availabe-time/availabe-time.component';
import { AddUserDialog, DeleteUserDialog, EditUserDialog, UsersComponent } from './dashboard/users/users.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    ResortsBoardComponent,
    DashboardComponent,
    AddResortDialog,
    DeleteResortDialog,
    EditResortDialog,
    AvailabeTimeComponent,
    UsersComponent,
    AddUserDialog,
    EditUserDialog,
    DeleteUserDialog,
    AddAvailabeTimeDialog,
    EditAvailabeTimeDialog,
    DeleteAvailabeTimeDialog,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ResortsBoardModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [
    HttpRequestService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
