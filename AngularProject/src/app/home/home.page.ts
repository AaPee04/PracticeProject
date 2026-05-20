import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonCard, IonCardContent, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  diceOutline,
  trophyOutline,
  calculatorOutline,
  statsChartOutline,
  albumsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonCard, IonCardContent, IonCol, IonRow, IonGrid],
})
export class HomePage {
  bestScore = 287;
  bestPlayer = "Arttu‑Pekka";

  totalPoints = 5420;
  averagePoints = 215;
  totalGames = 25;

  lastScore = 198;
  lastDate = "19.5.2026";

  constructor(private router: Router) {
    addIcons({
      diceOutline,
      trophyOutline,
      calculatorOutline,
      statsChartOutline,
      albumsOutline
    });
  }

  startNewGame() {
    this.router.navigate(['/tabs/game']);
  }
}
