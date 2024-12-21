import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  IonButton,
  IonImg,
} from '@ionic/angular/standalone';
import { HttpService } from '../services/http.service';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { DataService } from '../services/data.service';

export interface Country {
  imageUrl: string;
  name: string;
  capital: string;
  code: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
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
    IonButton,
    IonImg,
  ],
})
export class CountriesPage implements OnInit {
  searchTerm: string = '';
  countries: Country[] = [];
  constructor(
    private httpService: HttpService,
    private dataService: DataService,
    private router: Router
  ) {
    addIcons({ chevronBackOutline });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getCountries();
  }

  async getCountries() {
    this.searchTerm = await this.dataService.get('searchTerm');

    try {
      const { data } = await this.httpService.get({
        url: `https://restcountries.com/v3.1/name/${this.searchTerm}`,
      });
      this.countries = data.map((country: any) => ({
        imageUrl: country.flags.png,
        name: country.name.official,
        capital: country.capital[0],
        code: country.cca2,
        coordinates: {
          lat: country.latlng[0],
          lon: country.latlng[1],
        },
      }));
      console.log(this.countries);
    } catch (error: any) {
      if (error.status === 404) {
        console.log('Country not found');
      }
    }
  }

  async handleNews(country: Country) {
    await this.dataService.set('country', JSON.stringify(country));
    this.router.navigate(['/news']);
  }

  async handleWeather(country: Country) {
    await this.dataService.set('country', JSON.stringify(country));
    this.router.navigate(['/weather']);
  }
}
