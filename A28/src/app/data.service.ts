import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public Chart1Observable;
  public Chart2Observable;
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
  constructor(private http: HttpClient) {
    if(this.dataSource.datasets[0].data[0] === undefined){
      this.Chart1Observable = new Observable((observer)=>{
        this.http.get('http://localhost:3000/summary').subscribe((res: any)=>{

          for (var i = 0; i < res.myBudget.length; i++) {
            this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
            this.dataSource.labels[i] = res.myBudget[i].title;
          }
          observer.next(this.dataSource);
        });
      });
      this.Chart2Observable = new Observable((observer)=>{
        if(this.dataSource.datasets[0].data[0] === undefined){
        this.http.get('http://localhost:3000/report').subscribe((res: any)=>{
          for (var i = 0; i < res.myBudget.length; i++) {
            this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
            this.dataSource.labels[i] = res.myBudget[i].title;
          }
          observer.next(this.dataSource);
        });
      }
      });
    }
    else{
      this.Chart1Observable = new Observable((observer) => {
        observer.next(this.dataSource);
      });
      this.Chart2Observable = new Observable((observer) => {
        observer.next(this.dataSource);
      });
    }
  }
}
