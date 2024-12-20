import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
  IonRadioGroup,
  IonRadio,
  IonList,
  IonItem,
  IonListHeader,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonRadioGroup,
    IonRadio,
    IonList,
    IonItem,
    IonListHeader,
    IonLabel,
  ],
})
export class SettingsPage implements OnInit {
  unit: string = 'metric';
  constructor(private dataService: DataService) {
    addIcons({ chevronBackOutline });
  }

  ngOnInit() {
    this.setData();
  }

  async setData() {
    const storedUnit = await this.dataService.get('unit');
    if (storedUnit) {
      this.unit = storedUnit;
    } else {
      await this.dataService.set('unit', this.unit);
    }
  }

  async handleUnitSelect(event: any) {
    this.unit = event.detail.value;
    await this.dataService.set('unit', this.unit);
  }
}
