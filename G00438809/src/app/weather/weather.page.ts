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
  weather = {
    icon: '',
    description: '',
    temperature: 0,
  };
  constructor(private httpService: HttpService) {
    addIcons({ chevronBackOutline });
  }

  async ngOnInit() {
    this.getCountries();
  }

  async getCountries() {
    const { data } = await this.httpService.get({
      url: 'https://api.openweathermap.org/data/2.5/weather?lat=53&lon=-8&units=metric&APPID=e338c79e350d057275731c2ca19af14f',
    });
    this.weather = {
      icon: data.weather[0].icon,
      description: data.weather[0].description,
      temperature: data.main.temp,
    };
    console.log(data);
    console.log(this.weather);
  }
}
