import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
  }

  async set(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  async get(key: string): Promise<any> {
    return await this.storage.get(key);
  }
}
