import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonButton,
  ],
})
export class HomePage {
  constructor() {
    addIcons({ settingsOutline });
  }
}
