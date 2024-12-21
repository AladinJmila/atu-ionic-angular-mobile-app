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

interface Weather {
  icon: string;
  description: string;
  temperature: number;
}

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
  weather: Weather = {
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

  async ngOnInit() {}

  ionViewWillEnter() {
    this.getWeather();
  }

  async getWeather() {
    const country: Country = JSON.parse(await this.dataService.get('country'));
    this.capital = country.capital;
    const unit = await this.dataService.get('unit');
    try {
      const { data } = await this.httpService.get({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${country.coordinates.lat}&lon=${country.coordinates.lon}&units=${unit}&APPID=e338c79e350d057275731c2ca19af14f`,
      });
      this.weather = {
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        temperature: data.main.temp,
      };
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}
