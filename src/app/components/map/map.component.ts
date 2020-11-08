import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  constructor(private dataService: DataService) { }
  private map;

  ngAfterViewInit(): void {
    this.initMap();
    this.dataService.getData().subscribe((data) => {
      console.log('data', data);
    });;
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [52.5200, 13.4050],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 14,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  

}
