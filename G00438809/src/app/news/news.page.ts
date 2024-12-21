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
import { Country } from '../countries/countries.page';

interface Story {
  title: string;
  description: string;
  image_url: string;
}

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
  countryName: string = '';
  news: Story[] = [];
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
    const country: Country = JSON.parse(await this.dataService.get('country'));
    this.countryName = country.name;
    try {
      const { data } = await this.httpService.get({
        url: `https://newsdata.io/api/1/latest?apikey=pub_62893a1e897ad0c0637bae96b2a805093ac6a&country=${country.code}`,
      });
      this.news = data.results.map((story: any) => ({
        title: story.title,
        description: story.description,
        image_url: story.image_url,
      }));
      console.log(data.results);
      console.log(this.news);
    } catch (error) {
      console.log(error);
    }
  }
}
