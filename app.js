new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.turns = [];
    },
    attack() {
      let damage = this.calculateDamage(3, 10);
      this.monsterAttack();
      this.monsterHealth -= damage;
      this.checkWin();
      
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits for ${damage}` 
      })
    },
    specialAttack() {
      let damage = this.calculateDamage(10, 20);
      if(this.turns.length > 2) {
        damage = this.calculateDamage(1, 2);
        alert("You're exhausted, it's useless now !")
      } 
      this.monsterHealth -= damage;
      this.monsterAttack();
      this.checkWin();
      
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits for ${damage}` 
      })
    },
    heal() {
      this.playerHealth <= 90 ? this.playerHealth += 10 : this.playerHealth = 100;
      this.monsterAttack();
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heal himself for 10'
      })
    },
    giveUp() {
      alert('RLY??? YOU DISAPPOINT ME');
      this.gameIsRunning = false;
    }, 
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    monsterAttack() {
      let damage = this.calculateDamage(5, 12);
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits for ${damage}` 
      })
      this.playerHealth -= damage;
      this.checkWin();
    },
    checkWin() {
      if(this.monsterHealth <= 0) {
        confirm('You won ! Replay?') ? this.startGame() : !this.gameIsRunning;
        return true;
      } else if(this.playerHealth <= 0) {
        confirm('You lost ! Replay?') ? this.startGame() : !this.gameIsRunning;
        return true;
      }
      return false;
    }
  }
})