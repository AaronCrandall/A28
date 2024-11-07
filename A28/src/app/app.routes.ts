import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component'
import { SummaryComponent } from '../summary/summary.component';
import { ReportComponent } from '../report/report.component';
import { AppComponent } from './app.component';
import { authGuard } from './auth'
import { LogInComponent } from '../log-in/log-in.component';
//still need to do the if/then on the jwt token

export const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    //if jwt token
    path: 'summary',
    component: SummaryComponent,
    canActivate: [authGuard]
  },
  {
    //if jwt token
    path: 'report',
    component: ReportComponent,
    canActivate: [authGuard]
  }


];
