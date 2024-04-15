import { uid } from "uid"

export class Horsegame {
  constructor() {
    this.CONFIG = {
      WIN: 8,
      PENALTY: -1
    }
    this.round = 0
    this.lanes = [
      { card: { suit: 'hearts', variant: 'A' }, pos: 0 },
      { card: { suit: 'spades', variant: 'A' }, pos: 0 },
      { card: { suit: 'clubs', variant: 'A' }, pos: 0 },
      { card: { suit: 'diamonds', variant: 'A' }, pos: 0 }
    ]
    this.cardStack = new PartialDeckOfCards()
    this.penalties = this.initPenalties()
    this.flippedCard = null
    this.blocking = false
    this.winningCard = null

  }

  initPenalties() {
    return [...new Array(this.CONFIG.WIN - 2)].map((_v, i) => {
      return { card: this.cardStack.getCard(), pos: i + 1, flipped: false, applied: false}
    })
  }

  flipCard() {
    this.flippedCard = this.cardStack.getCard()
  }

  moveCard(suit, penalty=false) {
    const suitIdx = this.lanes.findIndex(lane => lane.card.suit === suit)
    if (suitIdx < 0) {
      console.error('Invalid suit', suit)
      return false
    }
    if (!penalty) {
      this.lanes[suitIdx].pos += 1
    } else {
      if (this.CONFIG.PENALTY === 'all') {
        this.lanes[suitIdx].pos = 0
      } else {
        this.lanes[suitIdx].pos += this.CONFIG.PENALTY
      }
    }
  }

  checkWin() {
    const winningSuit = this.lanes.find(lane => lane.pos === this.CONFIG.WIN - 1)
    if (winningSuit) {
      this.winningCard = winningSuit.card
      this.blocking = 'win'
      return true
    }
    return false
  }

  checkPenalty() {
    const lowestPos = Math.min(...this.lanes.map(lane => lane.pos))
    const lowestPenaltyIdx = this.penalties.findIndex(pen => pen.pos === lowestPos)
    if (lowestPenaltyIdx >= 0 && !this.penalties[lowestPenaltyIdx].flipped && !this.penalties[lowestPenaltyIdx].applied) {
      // lowestPenalty found and should be flipped
      this.penalties[lowestPenaltyIdx].flipped = true
      this.blocking = 'penalty'
    }
  }
  doPenalty() {
    const penaltyIdx = this.penalties.findIndex(pen => pen.flipped && !pen.applied)
    if (penaltyIdx < 0) return false;
    this.penalties[penaltyIdx].applied = true
    const penaltySuit = this.penalties[penaltyIdx].card.suit
    this.moveCard(penaltySuit, true)
    this.blocking = false
    return true
  }

  tick() {
    if (this.blocking === 'win') {
      //win here
    } else if (this.blocking === 'penalty') {
      this.doPenalty()
    } else {
      this.round += 1
      this.flipCard()
      this.moveCard(this.flippedCard.suit)
      this.checkPenalty()
      this.checkWin()
    }
    return uid()
  }


}

export class PartialDeckOfCards {
  constructor() {
    this.cards = this.genDeckOfCards()
    this.shuffle()
  }
  genDeckOfCards() {
    const variants = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    const suits = ['hearts', 'clubs', 'spades', 'diamonds']
    let cards = []
    for (let suit of suits) {
      let partial = variants.map(v => ({ suit: suit, variant: v }))
      cards = [...cards, ...partial]
    }
    return cards
  }
  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }
  getCard() {
    return this.cards.pop()
  }
  getCards(n = 1) {
    let returnCards = []
    for (let i; i <= n; i++) {
      returnCards.push(this.getCard())
    }
    return returnCards
  }
  getCardsLeft() {
    return this.cards.length
  }
}