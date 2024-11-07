import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  constructor(private http: HttpClient){

  }
  public dataSource: any = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#abc4ff',
                '#b8e0d2',
                '#e8dff5',
            ]
        }
    ],
    labels: []
  };

  ngOnInit(): void{
    let value = this.getMethod()
  }

  public getMethod(){
    this.http.get("http://localhost:3000/report").subscribe((res: any)=>{
      console.log(res);
      for (var i = 0; i < 5; i++) {
        this.dataSource.datasets[0].data[i] = res[i].number;
        this.dataSource.labels[i] = res[i].title;
      }
      this.createChart(this.dataSource);
    });
  }


  createChart(val: any) {
    console.log(val)
    var canvas = <HTMLCanvasElement> document.getElementById('myChart')!;
    var ctx = canvas.getContext('2d')!;
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: val
    });
  }

}
