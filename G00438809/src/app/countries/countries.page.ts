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
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
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
export class CountriesPage implements OnInit {
  countries: any[] = [];
  constructor(private httpService: HttpService) {}

  async ngOnInit() {
    this.getCountries();
  }

  async getCountries() {
    const { data } = await this.httpService.get({
      url: 'https://restcountries.com/v3.1/name/ireland',
    });
    this.countries = data;
    console.log(this.countries);
  }
}
