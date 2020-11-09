import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private url = "http://newsapi.org/v2/everything?q=covid-19&apiKey=" + environment.API_KEY.toString();

  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    return this.http.get(this.url)
      .pipe((response) => response);
  }
}
