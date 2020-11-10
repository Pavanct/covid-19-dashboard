import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { CountryData, CountryInfo } from 'src/app/models/model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  constructor(private dataService: DataService) { }
  private map;
  public data: CountryData[];
  public countryInfo: CountryInfo[];

  ngAfterViewInit(): void {
    this.dataService.getCountryData().subscribe((data: CountryData[]) => {
      console.log('country data', data);
      this.data = data;
      this.countryInfo = this.data.map(a => a.countryInfo);
      console.log("countryInfo", this.countryInfo);
      this.initMap();
    });



  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [40.165691, 18.451526],
      zoom: 3.3
    });
    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 14,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // });



    const tiles = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 3,
      maxZoom: 4,
      /* tslint:disable-next-line */
      ext: "png"
    });

    tiles.addTo(this.map);

    // let circle = L.circle([51.165691, 10.451526], {
    //   color: "red",
    //   fillColor: "#f03",
    //   fillOpacity: 0.5,
    //   radius: 250000
    // }).addTo(this.map);

    let latlngarray = [];
    let radius: number;

    // to add circles on all countries
    this.countryInfo.forEach(element => {
      L.circle([element.lat, element.long], {
        color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 150000
      }).addTo(this.map);
    })


  }



}
