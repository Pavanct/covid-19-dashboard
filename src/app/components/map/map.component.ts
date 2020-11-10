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
    let Stamen = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 3,
      maxZoom: 5,
      ext: "png"
    });

    let DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      minZoom: 3,
      maxZoom: 5
    });

    this.map = L.map('map', {
      center: [40.165691, 18.451526],
      zoom: 3.3,
      layers: [Stamen]
    });
    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 14,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // });
    var baseMaps = {
      "Stamen": Stamen,
      "DarkMatter": DarkMatter
    };

    var overlayMaps = {
      // "Cities": cities
    };
    L.control.layers(baseMaps, overlayMaps).addTo(this.map);



    // tiles.addTo(this.map);

    // let circle = L.circle([51.165691, 10.451526], {
    //   color: "red",
    //   fillColor: "#f03",
    //   fillOpacity: 0.5,
    //   radius: 250000
    // }).addTo(this.map);

    let highCases = [];
    let lowesetCases = [];
    let lowCases = [];
    let radius: number;

    // to add circles on all countries
    highCases = this.data.filter(a => a.active >= 50000).map(a => a.countryInfo);
    lowesetCases = this.data.filter(a => a.active >= 5000 && a.active < 50000).map(a => a.countryInfo);
    lowCases = this.data.filter(a => a.active < 5000).map(a => a.countryInfo);

    console.log("highcases", highCases);

    highCases.forEach(element => {
      L.circle([element.lat, element.long], {
        color: "#FF380E",
        fillColor: "#f03",
        fillOpacity: 0.3,
        radius: 350000
      }).addTo(this.map);
    })

    lowesetCases.forEach(element => {
      L.circle([element.lat, element.long], {
        color: "orange",
        fillColor: "",
        fillOpacity: 0.7,
        radius: 150000
      }).addTo(this.map);
    })

    lowCases.forEach(element => {
      L.circle([element.lat, element.long], {
        color: "yellow",
        fillColor: "",
        fillOpacity: 0.7,
        radius: 150000
      }).addTo(this.map);
    })


    /*Legend specific*/
    let legend = L.control({ position: "bottomleft" });

    legend.onAdd = (() => {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Active Cases</h4>";
      div.innerHTML += '<i style="background-color: #FF380E"></i><span>>= 50000</span><br>';
      div.innerHTML += '<i style="background-color: yellow"></i><span>>= 5000 & < 50000</span><br>';
      div.innerHTML += '<i style="background-color: orange"></i><span>< 5000</span><br>';
      return div;
    })

    legend.addTo(this.map);



    // this.countryInfo.forEach(element => {
    //   L.circle([element.lat, element.long], {
    //     color: "red",
    //     fillColor: "#f03",
    //     fillOpacity: 0.5,
    //     radius: 150000
    //   }).addTo(this.map);
    // })


  }



}
