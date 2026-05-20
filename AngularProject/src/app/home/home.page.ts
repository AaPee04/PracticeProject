import { Component, OnInit } from '@angular/core';
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
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonIcon, IonCard, IonCardContent,
    IonCol, IonRow, IonGrid
  ],
})
export class HomePage implements OnInit {

  totalPoints = 0;
  averagePoints = 0;
  totalGames = 0;

  bestScore = 0;
  bestPlayer = "Arttu‑Pekka";

  lastScore = 0;
  lastDate = "";

  constructor(private router: Router) {
    addIcons({
      diceOutline,
      trophyOutline,
      calculatorOutline,
      statsChartOutline,
      albumsOutline
    });
  }

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    fetch("http://localhost/api/get_game_stats.php")
      .then(res => res.json())
      .then(data => {

        if (!data.success) {
          console.error("Stats API error", data);
          return;
        }

        this.totalGames = data.total_games;
        this.totalPoints = data.total_points;
        this.averagePoints = data.average_points;

        this.bestScore = data.highest_score;
        this.lastScore = data.latest_score;

        this.lastDate = data.latest_date || "";
      })
      .catch(err => {
        console.error("API error", err);
      });
  }

  startNewGame() {
    this.router.navigate(['/tabs/game']);
  }
}
