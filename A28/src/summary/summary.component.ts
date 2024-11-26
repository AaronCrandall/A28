import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
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
    const host = window.location.hostname;
    const url = `http://${host}:3000/report`;
    this.http.get(url).subscribe((res: any)=>{
      console.log(res);
      for (var i = 5; i < res.length; i++) {
        this.dataSource.datasets[0].data[i-5] = res[i].number;
        this.dataSource.labels[i-5] = res[i].title;
      }
      console.log(this.dataSource)
      this.createChart(this.dataSource);
    });
  }
  createChart(val: any) {
    var canvas = <HTMLCanvasElement> document.getElementById('myChart')!;
    var ctx = canvas.getContext('2d')!;
    var myPieChart = new Chart(ctx, {
        type: 'bar',
        data: val
    });
  }


}
