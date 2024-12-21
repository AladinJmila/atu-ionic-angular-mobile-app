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
  IonButton,
  IonImg,
} from '@ionic/angular/standalone';
import { HttpService } from '../services/http.service';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { DataService } from '../services/data.service';

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
  countries: any[] = [];
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
    this.searchTerm = await this.dataService.get('searchTerm');

    try {
      const { data } = await this.httpService.get({
        url: `https://restcountries.com/v3.1/name/${this.searchTerm}`,
      });
      this.countries = data;
      console.log(this.countries);
    } catch (error: any) {
      if (error.status === 404) {
        console.log('Country not found');
      }
      this.countries = [];
    }
  }

  handleNews() {
    console.log('news');
  }

  handleWeather() {
    console.log('weather');
  }
}
