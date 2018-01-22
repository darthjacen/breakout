import Phaser from 'phaser'
import { clone } from 'lodash'
import globals from './globals/index'

export default class extends Phaser.State {
  init () {}
  preload () {}


  create () {
    this.topScoresSet()
    let rank = this.topScoresFind()
    let text = this.add.text(
        this.game.width / 2, this.game.height / 2,
        `Game over\n\nYou reached level ${this.game.global.level} with score ${this.game.global.score}`,
        {
           font: '24px Arial' ,
           fill: '#000',
           align: 'center'
        }
    )

    text.anchor.set(0.5)

    let text2 = this.add.text(
      this.game.width / 2, this.game.height / 2,
      `Your score is ranked ${rank} out of ${this.game.global.topScores.length}`,
      {
         font: '24px Arial' ,
         fill: '#000',
         align: 'center'
      }
  )

  text2.anchor.set(0.5)

    this.input.onDown.add(this.restartGame, this)
  }

  topScoresSet () {
    this.game.global.topScores.push(this.game.global.score)
    this.game.global.topScores.sort((a, b) => {
      return b - a
    })
  }

  topScoresFind () {
    let temp
    for(let i = 0; i < this.game.global.topScores.length; i++){
      if (this.game.global.score >= this.game.global.topScores[i]) {
        return i + 1;
      }
    }
  }

  resetGlobalVariables () {
    this.game.global = clone(globals)
  }

  restartGame () {
    this.resetGlobalVariables()
    this.game.state.start('Game')
  }
}
