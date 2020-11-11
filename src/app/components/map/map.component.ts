import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
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
    let highActive = [], lowestActive = [], lowActive = [];
    let highCases = [], lowestCases = [], lowCases = [];
    let highDeaths = [], lowDeaths = [], lowestDeaths = [];
    let highRecovery = [], lowRecovery = [], lowestRecovery = [];
    let radius: number;
    let activeGroup = L.layerGroup();
    let casesGroup = L.layerGroup();
    let deathGroup = L.layerGroup();
    let recoveryGroup = L.layerGroup();

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

    let baseMaps = {
      "Stamen": Stamen,
      "DarkMatter": DarkMatter
    };

    // to add circles on all countries with active cases
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



    // to add circles on all countries with total cases
    highCases = this.data.filter(a => a.cases >= 1000000).map(a => a.countryInfo);
    lowestCases = this.data.filter(a => a.cases >= 50000 && a.cases < 1000000).map(a => a.countryInfo);
    lowCases = this.data.filter(a => a.cases < 50000).map(a => a.countryInfo);

    highCases.forEach(element => {
      L.circle([element.lat, element.long], {
        color: "#FF380E",
        fillColor: "#f03",
        fillOpacity: 0.3,
        radius: 350000
      }).addTo(casesGroup);
    })

    lowestCases.forEach(element => {
      L.circle([element.lat, element.long], {
        color: "orange",
        fillColor: "",
        fillOpacity: 0.7,
        radius: 150000
      }).addTo(casesGroup);
    })

    lowCases.forEach(element => {
      L.circle([element.lat, element.long], {
        color: "yellow",
        fillColor: "",
        fillOpacity: 0.7,
        radius: 150000
      }).addTo(casesGroup);
    })


    // to add circles on all countries with total deaths
    highDeaths = this.data.filter(a => a.deaths >= 80000).map(a => a.countryInfo);
    lowestDeaths = this.data.filter(a => a.cases >= 10000 && a.cases < 80000).map(a => a.countryInfo);
    lowDeaths = this.data.filter(a => a.cases < 10000).map(a => a.countryInfo);

    highDeaths.forEach(element => {
      L.circle([element.lat, element.long], {
        color: "#FF380E",
        fillColor: "#f03",
        fillOpacity: 0.3,
        radius: 350000
      }).addTo(deathGroup);
    })

    lowestDeaths.forEach(element => {
      L.circle([element.lat, element.long], {
        color: "orange",
        fillColor: "",
        fillOpacity: 0.7,
        radius: 150000
      }).addTo(deathGroup);
    })

    lowDeaths.forEach(element => {
      L.circle([element.lat, element.long], {
        color: "yellow",
        fillColor: "",
        fillOpacity: 0.7,
        radius: 150000
      }).addTo(deathGroup);
    })


    // casesLegend.addTo(this.map);


    this.map.addLayer(activeGroup);
    // this.map.addLayer(casesGroup);
    var overlayMaps = {
      "Active Cases": activeGroup,
      "Total Cases": casesGroup,
      "Total Deaths": deathGroup
    };
    L.control.layers(baseMaps).addTo(this.map);
    L.control.layers(overlayMaps, null,{ collapsed: false }).addTo(this.map);

    /*Legend specific*/
    // active cases
    let activeLegend = L.control({ position: "bottomleft" });

    activeLegend.onAdd = (() => {
      let div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Active Cases</h4>";
      div.innerHTML += '<i style="background-color: #FF380E"></i><span>>= 50,000</span><br>';
      div.innerHTML += '<i style="background-color: yellow"></i><span>>= 5,000 & < 50,000</span><br>';
      div.innerHTML += '<i style="background-color: orange"></i><span>< 5,000</span><br>';
      return div;
    })
    activeLegend.addTo(this.map);

    // total cases
    let casesLegend = L.control({ position: "bottomleft" });

    casesLegend.onAdd = (() => {
      let div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Total Cases</h4>";
      div.innerHTML += '<i style="background-color: #FF380E"></i><span>>= 1,000,000</span><br>';
      div.innerHTML += '<i style="background-color: yellow"></i><span>>= 500,00 & < 1000,000</span><br>';
      div.innerHTML += '<i style="background-color: orange"></i><span>< 500,00</span><br>';
      return div;
    })

    // total deaths
    let deathsLegend = L.control({ position: "bottomleft" });

    deathsLegend.onAdd = (() => {
      let div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Total Deaths</h4>";
      div.innerHTML += '<i style="background-color: #FF380E"></i><span>>= 80,000</span><br>';
      div.innerHTML += '<i style="background-color: yellow"></i><span>>= 10,000 & < 80,000</span><br>';
      div.innerHTML += '<i style="background-color: orange"></i><span>< 10,000</span><br>';
      return div;
    })

    const setLegend = (legend: any) =>  {
      if(legend == "Active Cases"){
        activeLegend.addTo(this.map);
        this.map.removeControl(casesLegend);
      }else if(legend == "Total Cases"){
        casesLegend.addTo(this.map);
        this.map.removeControl(activeLegend);
      }else if(legend == "Total Deaths"){
        console.log("adding death legend")
        deathsLegend.addTo(this.map);
        this.map.removeControl(casesLegend);
        this.map.removeControl(activeLegend);
      }
    }

    // const removeLegend = (legend: any) => {

    // }

    this.map.on('baselayerchange', function (eventLayer) {

      if (eventLayer.name == 'Active Cases') {
        setLegend(eventLayer.name);
      } else if (eventLayer.name == 'Total Cases') {
        setLegend(eventLayer.name);
      } else if (eventLayer.name == 'Recovered'){
        setLegend(eventLayer.name);
      } else if (eventLayer.name == 'Total Deaths') {
        setLegend(eventLayer.name);
      } 

    });
  }
}
