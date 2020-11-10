import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CountryData, GlobalData, SummaryData } from 'src/app/models/model';
import { DataService } from 'src/app/services/data.service';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cases-country',
  templateUrl: './cases-country.component.html',
  styleUrls: ['./cases-country.component.css']
})
export class CasesCountryComponent implements AfterViewInit  {
  // @Input() data: SummaryData;
  public data: GlobalData;
  public globalData: GlobalData;
  public countries: CountryData[];
  displayedColumns: string[] = ['cases', 'active','deaths', 'recovered', 'todayCases', 'todayDeaths', 'todayRecovered', 'country'];
  dataSource: MatTableDataSource<CountryData>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    // this.dataService.getData().subscribe((data: SummaryData) => {
    //   console.log('data', data);
    //   this.data = data;
    //   this.globalData = this.data.Global;
    //   this.countries = this.data.Countries;
    //   this.dataSource = new MatTableDataSource<CountryData>(this.countries);
    //   this.dataSource.sort = this.sort;
    // });  
    this.dataService.getWorldData().subscribe((data: GlobalData)=> {
      this.data = data;
      this.globalData = data;
    });

    this.dataService.getCountryData().subscribe((data: CountryData[])=>{
      this.countries = data;
      this.dataSource = new MatTableDataSource<CountryData>(this.countries);
      this.dataSource.sort = this.sort;
    })

  }

  ngAfterViewInit(): void {

  }

}
