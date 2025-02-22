import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { MeetOurTeamComponent } from './components/meet-our-team/meet-our-team.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContentComponent } from './components/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HomeComponent } from './components/home/home.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './components/admin/admin.component';
import { TableModule } from 'primeng/table';
import { ApplicantsComponent } from './components/applicants/applicants.component';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { AlumniComponent } from './components/alumni/alumni.component';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeroComponent,
    FooterComponent,
    ContactFormComponent,
    MeetOurTeamComponent,
    StatisticsComponent,
    AboutUsComponent,
    ContentComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    ApplicantsComponent,
    AlumniComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    TableModule,
    CalendarModule,
    CheckboxModule,
    CardModule,
    FileUploadModule,
    ProgressBarModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
