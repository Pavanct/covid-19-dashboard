import { Component, OnInit } from '@angular/core';
import { Article, News } from 'src/app/models/model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public articles: Article[];
  constructor(private newsService: NewsService) { }
  public breakpoint: any;
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
    this.newsService.getData().subscribe((news: News) =>{
      console.log(news);
      
      this.articles = news.articles;
    })
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
  }
}
