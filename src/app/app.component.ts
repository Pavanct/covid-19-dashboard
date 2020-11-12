import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SummaryData } from './models/model';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'COVID-19 Dashboard';
  public data: SummaryData;

  constructor(private dataService: DataService){}
  public API_KEY;
  ngOnInit(): void {
      // this.dataService.getData().subscribe((data: SummaryData) => {
      //   console.log('data', data);
      //   this.data = data;
      // });    
  }
}
