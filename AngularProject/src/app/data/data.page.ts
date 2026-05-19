import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DataPage implements OnInit {

  games: any[] = [];

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    fetch("http://localhost/get_game.php")
      .then(res => res.json())
      .then(data => {
        this.games = data.games;
      });
  }

  getTotal(scores: any): number {
    return Object.values(scores || {})
      .reduce((sum: number, val: any) => sum + val, 0);
  }
}
