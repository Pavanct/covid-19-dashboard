import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CountryData, GlobalData, SummaryData } from 'src/app/models/model';
import { DataService } from 'src/app/services/data.service';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cases-country',
  templateUrl: './cases-country.component.html',
  styleUrls: ['./cases-country.component.css']
})
export class CasesCountryComponent implements AfterViewInit {
  public globalData: GlobalData;
  public countries: CountryData[];
  displayedColumns: string[] = ['TotalConfirmed', 'Country'];
  dataSource: MatTableDataSource<CountryData>;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dataService: DataService) {
    
  }

  ngOnInit(): void{
    this.dataService.getData().subscribe((data: SummaryData) => {
      console.log('data', data);
      this.globalData = data.Global;
      this.countries = data.Countries;
      this.dataSource = new MatTableDataSource<CountryData>(this.countries);
      this.dataSource.sort = this.sort;
    });;
  }

  ngAfterViewInit(): void {
    
  }

}
