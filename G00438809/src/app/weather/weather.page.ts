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
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
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
export class WeatherPage implements OnInit {
  capital: string = '';
  weather = {
    icon: '',
    description: '',
    temperature: 0,
  };
  constructor(
    private httpService: HttpService,
    private dataService: DataService
  ) {
    addIcons({ chevronBackOutline });
  }

  async ngOnInit() {
    this.getCountries();
  }

  async getCountries() {
    this.capital = await this.dataService.get('capital');
    const unit = await this.dataService.get('unit');
    const coordinates = JSON.parse(await this.dataService.get('coordinates'));
    try {
      const { data } = await this.httpService.get({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&APPID=e338c79e350d057275731c2ca19af14f`,
      });
      this.weather = {
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        temperature: data.main.temp,
      };
      console.log(data);
      console.log(this.weather);
    } catch (error) {
      console.log(error);
    }
  }
}
