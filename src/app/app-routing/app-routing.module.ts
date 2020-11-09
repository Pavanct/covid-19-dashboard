import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { CasesCountryComponent } from '../components/cases-country/cases-country.component';
import { MapComponent } from '../components/map/map.component';
import { NewsComponent } from '../components/news/news.component';
import { SummaryData } from '../models/model';

const routes: Routes = [
  { path: 'dashboard', component: CasesCountryComponent, data: SummaryData },
  { path: 'map', component: MapComponent },
  { path: 'news', component: NewsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
