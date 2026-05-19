import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule]
})
export class GamePage {

  dice: number[] = [1, 1, 1, 1, 1];
  locked: boolean[] = [false, false, false, false, false];

  rollsLeft: number = 3;
  rolling: boolean = false;

  selectedCategory: string | null = null;

  usedCategories: { [key: string]: boolean } = {};
  scores: { [key: string]: number } = {};

  categories = [
    'ones', 'twos', 'threes', 'fours', 'fives', 'sixes',
    'threeKind', 'fourKind', 'twoPairs', 'fullHouse',
    'smallStraight', 'largeStraight', 'yatzy'
  ];

  async rollDice() {

    if (this.rollsLeft <= 0 || this.rolling) return;

    this.rolling = true;

    await new Promise(resolve => setTimeout(resolve, 600));

    this.dice = this.dice.map((die, index) => {
      return this.locked[index]
        ? die
        : Math.floor(Math.random() * 6) + 1;
    });

    this.rollsLeft--;
    this.rolling = false;
  }

  get diceSum(): number {
    return this.dice.reduce((sum, value) => sum + value, 0);
  }

  toggleLock(index: number) {

    if (this.rollsLeft === 3 || this.rolling) return;

    this.locked[index] = !this.locked[index];
  }

  selectCategory(key: string) {
    if (this.usedCategories[key]) return;
    this.selectedCategory = key;
  }

  countDice(value: number): number {
    return this.dice.filter(d => d === value).length;
  }

  threeOfAKind(): number {
    const value = this.dice.find(v => this.countDice(v) >= 3);

    if (!value) return 0;

    return value * 3;
  }

  fourOfAKind(): number {
    const value = this.dice.find(v => this.countDice(v) >= 4);

    if (!value) return 0;

    return value * 4;
  }

  twoPairs(): number {
    const pairs = [1, 2, 3, 4, 5, 6].filter(v => this.countDice(v) >= 2);
    return pairs.length >= 2
      ? pairs.reduce((sum, v) => sum + v * 2, 0)
      : 0;
  }

  fullHouse(): number {
    const values = [1, 2, 3, 4, 5, 6];

    const three = values.find(v => this.countDice(v) === 3);
    const two = values.find(v => this.countDice(v) === 2);

    if (three && two) {
      return three * 3 + two * 2;
    }

    return 0;
  }

  smallStraight(): number {
    const required = [1, 2, 3, 4, 5];
    return required.every(v => this.countDice(v) >= 1) ? 15 : 0;
  }

  largeStraight(): number {
    const required = [2, 3, 4, 5, 6];
    return required.every(v => this.countDice(v) >= 1) ? 20 : 0;
  }

  yatzy(): number {
    const value = this.dice.find(v => this.countDice(v) === 5);

    if (!value) return 0;

    return 50;
  }

  saveScore() {

    if (!this.selectedCategory) {
      alert("Valitse ensin mihin pistät pisteet!");
      return;
    }

    let score = 0;

    switch (this.selectedCategory) {

      case 'ones': score = this.countDice(1); break;
      case 'twos': score = this.countDice(2) * 2; break;
      case 'threes': score = this.countDice(3) * 3; break;
      case 'fours': score = this.countDice(4) * 4; break;
      case 'fives': score = this.countDice(5) * 5; break;
      case 'sixes': score = this.countDice(6) * 6; break;

      case 'threeKind': score = this.threeOfAKind(); break;
      case 'fourKind': score = this.fourOfAKind(); break;
      case 'twoPairs': score = this.twoPairs(); break;
      case 'fullHouse': score = this.fullHouse(); break;
      case 'smallStraight': score = this.smallStraight(); break;
      case 'largeStraight': score = this.largeStraight(); break;
      case 'yatzy': score = this.yatzy(); break;
    }

    this.scores[this.selectedCategory] = score;
    this.usedCategories[this.selectedCategory] = true;

    this.selectedCategory = null;
    this.resetTurn();

    if (this.categories.every(c => this.usedCategories[c])) {
      this.saveGameToServer();
    }
  }

  get totalScore(): number {
    return Object.values(this.scores)
      .reduce((sum, val) => sum + (val || 0), 0);
  }

  get isGameFinished(): boolean {
    return this.categories.length > 0 &&
      this.categories.every(c => this.usedCategories[c] === true);
  }

  saveGameToServer() {
    console.log("GAME FINISHED:", this.isGameFinished);
    console.log("USED:", this.usedCategories);

    if (!this.isGameFinished) {
      alert("Peli ei ole vielä valmis!");
      return;
    }

    const payload = {
      player_name: "Player1",
      total_score: this.totalScore,
      scores: this.scores,
      dice_history: this.scores
    };

    fetch("http://localhost/save_game.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Game saved:", data);
        alert("Game saved!");
      });
  }

  resetTurn() {
    this.rollsLeft = 3;
    this.locked = [false, false, false, false, false];
  }
}