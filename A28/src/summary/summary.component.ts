import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from '../app/data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
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
