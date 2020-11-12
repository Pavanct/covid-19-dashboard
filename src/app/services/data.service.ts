import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private url = "https://api.covid19api.com/summary";
  private baseUrl = "https://disease.sh/v3/covid-19/"

  getData(): Observable<any> {
    return this.http.get(this.url)
      .pipe((response) => response);
  }

  getWorldData(): Observable<any> {
    const urlSlug: String = "all";
    return this.http.get(this.baseUrl + urlSlug).pipe((response) => response);;
  }

  getCountryData(): Observable<any> {
    const urlSlug: String = "countries"
    return this.http.get(this.baseUrl + urlSlug).pipe((response) => response);;
  }
}
