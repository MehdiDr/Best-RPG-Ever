new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.turns = []; 
    },
    attack: function() {
      let damage = this.calculateDamage(3, 10);
      this.monsterAttack();
      this.monsterHealth -= damage;
      if(this.checkWin()) {
        return;
      };

      this.turns.unshift({
        isPlayer: true,
        text: `Player hits for ${damage}` 
      })
    },
    specialAttack: function() {
      let damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.monsterAttack();
      if(this.checkWin()) {
        return;
      };

      this.turns.unshift({
        isPlayer: true,
        text: `Player hits for ${damage}` 
      })
    },
    heal: function() {
      this.playerHealth <= 90 ? this.playerHealth += 10 : this.playerHealth = 100;
      this.monsterAttack();
       this.turns.unshift({
         isPlayer: true,
         text: 'Player heal himself for 10'
       })
    },
    giveUp: function() {
      alert('RLY??? YOU DISAPPOINT ME');
      this.gameIsRunning = false;
    }, 
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    monsterAttack: function() {
      let damage = this.calculateDamage(5, 12);
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits for ${damage}` 
      })
      this.playerHealth -= damage;
      this.checkWin();
    },
    checkWin: function() {
      if(this.monsterHealth <= 0) {
        confirm('You won ! Replay?') ? this.startGame() : this.gameIsRunning = false;
        return true;
      } else if(this.playerHealth <= 0) {
        confirm('You lost ! Replay?') ? this.startGame() : this.gameIsRunning = false;
        return true;
      }
      return false;
    }
  }
})