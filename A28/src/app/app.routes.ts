import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component'
import { SummaryComponent } from '../summary/summary.component';
import { ReportComponent } from '../report/report.component';
import { AppComponent } from './app.component';
//still need to do the if/then on the jwt token

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
  },
  {
    //if jwt token
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    //if jwt token
    path: 'summary',
    component: SummaryComponent
  },
  {
    //if jwt token
    path: 'report',
    component: ReportComponent
  }


];
