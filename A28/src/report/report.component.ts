import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from '../app/data.service';
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
  //dataservice: DataService = inject(DataService);
  constructor(private dataService: DataService) {
    this.dataService.Chart1Observable!.subscribe((val:any) => {
      this.createChart(val);
    })
  }
  createChart(val: any) {
    var canvas = <HTMLCanvasElement> document.getElementById('myChart')!;
    var ctx = canvas.getContext('2d')!;
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: val
    });
  }

}
