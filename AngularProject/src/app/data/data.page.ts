import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class DataPage implements OnInit {

  games: any[] = [];

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    fetch("http://localhost/yatzy/get_game.php")
      .then(res => res.json())
      .then(data => {

        if (!data.success) {
          console.error(data);
          return;
        }

        this.games = data.games || [];
      })
      .catch(err => {
        console.error("API error", err);
      });
  }

  deleteGame(sessionId: number) {
    if (!confirm("Haluatko varmasti poistaa tämän pelin?")) {
      return;
    }

    fetch("http://localhost/yatzy/delete_game.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ session_id: sessionId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.games = this.games.filter(g => g.id !== sessionId);
        } else {
          alert("Poisto epäonnistui: " + data.message);
        }
      })
      .catch(err => {
        console.error(err);
        alert("Virhe poistaessa peliä");
      });
  }

  scoreOrder = [
    "ones",
    "twos",
    "threes",
    "fours",
    "fives",
    "sixes",
    "threeKind",
    "fourKind",
    "twoPairs",
    "fullHouse",
    "smallStraight",
    "largeStraight",
    "yatzy"
  ];

  scoreNames: any = {
    ones: "1",
    twos: "2",
    threes: "3",
    fours: "4",
    fives: "5",
    sixes: "6",

    threeKind: "3 samaa",
    fourKind: "4 samaa",
    twoPairs: "2 paria",
    fullHouse: "Full House",

    smallStraight: "1–5 suora",
    largeStraight: "2–6 suora",

    yatzy: "Yatzy"
  };


  sortScores = (a: { key: string, value: any }, b: { key: string, value: any }): number => {
    return this.scoreOrder.indexOf(a.key) - this.scoreOrder.indexOf(b.key);
  };

  getScoreName(key: unknown): string {
    if (typeof key === "string") {
      return this.scoreNames[key] || key;
    }
    return "";
  }

  getTotal(scores: any): number {
    return Object.values(scores || {})
      .reduce((sum: number, val: any) => sum + val, 0);
  }
}
