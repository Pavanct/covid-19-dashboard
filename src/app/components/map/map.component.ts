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

    var baseMaps = {
      "Stamen": Stamen,
      "DarkMatter": DarkMatter
    };

    var overlayMaps = {
      // "ActiveCases": Stamen
    };
    L.control.layers(baseMaps, overlayMaps).addTo(this.map);

    let highActive = [];
    let lowestActive = [];
    let lowActive = [];
    let radius: number;
    let activeGroup = L.featureGroup();

    // to add circles on all countries
    highActive = this.data.filter(a => a.active >= 50000).map(a => a.countryInfo);
    lowestActive = this.data.filter(a => a.active >= 5000 && a.active < 50000).map(a => a.countryInfo);
    lowActive = this.data.filter(a => a.active < 5000).map(a => a.countryInfo);

    highActive.forEach(element => {
      L.circle([element.lat, element.long], {
        color: "#FF380E",
        fillColor: "#f03",
        fillOpacity: 0.3,
        radius: 350000
      }).addTo(activeGroup);
    })

    lowestActive.forEach(element => {
      L.circle([element.lat, element.long], {
        color: "orange",
        fillColor: "",
        fillOpacity: 0.7,
        radius: 150000
      }).addTo(activeGroup);
    })

    lowActive.forEach(element => {
      L.circle([element.lat, element.long], {
        color: "yellow",
        fillColor: "",
        fillOpacity: 0.7,
        radius: 150000
      }).addTo(activeGroup);
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

    // this.map.on('overlayadd', function (eventLayer) {
    //   // Switch the legends...
    //   if (eventLayer.name === 'overlay1_name') {
    //     legend1.addTo(this.map);
    //     this.map.removeControl(legend2);
    //   } else if (eventLayer.name === 'overlay2_name') {
    //     legend2.addTo(this.map);
    //     this.map.removeControl(legend1);
    //   }
    // });

    // this.map.on('overlayremove', function (eventLayer) {
    //   if (eventLayer.name === 'overlay1_name') {
    //     this.map.removeControl(legend1);
    //   } else if (eventLayer.name === 'overlay2_name') {
    //     this.map.removeControl(legend2);
    //   }
    // });

    this.map.addLayer(activeGroup);

  }
}
