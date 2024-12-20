import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class NewsPage implements OnInit {
  news: any[] = [];
  constructor(private httpService: HttpService) {}

  async ngOnInit() {
    this.getCountries();
  }

  async getCountries() {
    const { data } = await this.httpService.get({
      url: 'https://newsdata.io/api/1/latest?apikey=pub_62893a1e897ad0c0637bae96b2a805093ac6a&country=ie',
    });
    this.news = data.results;
    console.log(this.news);
  }
}
