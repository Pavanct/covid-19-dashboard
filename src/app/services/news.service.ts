import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private url = "http://newsapi.org/v2/everything?q=covid19&apiKey=0e77112837cf40ebbaac370369ccb447";

  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    return this.http.get(this.url)
      .pipe((response) => response);
  }
}
