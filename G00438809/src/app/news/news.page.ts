import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonIcon,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
} from '@ionic/angular/standalone';
import { HttpService } from '../services/http.service';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonIcon,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,

    IonCardContent,
    IonImg,
  ],
})
export class NewsPage implements OnInit {
  country: string = '';
  news: any[] = [];
  constructor(
    private httpService: HttpService,
    private dataService: DataService
  ) {
    addIcons({ chevronBackOutline });
  }

  async ngOnInit() {}

  ionViewWillEnter() {
    this.getNews();
  }

  async getNews() {
    this.country = await this.dataService.get('searchTerm');
    const countryCode = await this.dataService.get('countryCode');
    try {
      const { data } = await this.httpService.get({
        url: `https://newsdata.io/api/1/latest?apikey=pub_62893a1e897ad0c0637bae96b2a805093ac6a&country=${countryCode}`,
      });
      this.news = data.results;
      console.log(this.news);
    } catch (error) {
      console.log(error);
    }
  }
}
