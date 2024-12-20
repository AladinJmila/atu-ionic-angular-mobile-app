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
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
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
export class WeatherPage implements OnInit {
  weather: {} = {};
  constructor(private httpService: HttpService) {}

  async ngOnInit() {
    this.getCountries();
  }

  async getCountries() {
    const { data } = await this.httpService.get({
      url: 'https://api.openweathermap.org/data/2.5/weather?lat=53&lon=-8&units=metric&APPID=e338c79e350d057275731c2ca19af14f',
    });
    this.weather = data;
    console.log(this.weather);
  }
}
