import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToggle,
  IonToolbar,
  IonRange,
} from '@ionic/angular/standalone';
import { ThemeService } from 'src/theme/theme.service';
import { addIcons } from 'ionicons';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonTitle,
    IonToggle,
    IonToolbar,
    IonRange
  ],
})
export class SettingsPage implements OnInit {
  debugInfo = "";

  paletteToggle = false;

  constructor(public theme: ThemeService) {
    addIcons({ personCircle, personCircleOutline, sunny, sunnyOutline });
  }

  ngOnInit() { }

  onThemeToggle() {
    const state = this.theme.toggleTheme();
    this.debugInfo = JSON.stringify(state, null, 2);
  }

  onBoldToggle() {
    const state = this.theme.toggleFontWeight();
    this.debugInfo = JSON.stringify(state, null, 2);
  }

  onFontSizeChange(event: any) {
    const state = this.theme.setFontSizeMode(event.detail.value as 0 | 1 | 2);
    this.debugInfo = JSON.stringify(state, null, 2);
  }
}