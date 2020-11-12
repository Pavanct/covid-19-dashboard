import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private url = "http://newsapi.org/v2/everything?q=covid19";

  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    return this.http.get(this.url)
      .pipe((response) => response);
  }
}
