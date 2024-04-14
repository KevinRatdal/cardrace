/* eslint-disable react/prop-types */
// import { useAtom } from "jotai"
// import { playerDataState } from "../state/common"
import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Hearts from './components/Hearts'
import Clubs from './components/Clubs'
import Diamonds from './components/Diamonds'
import Spades from './components/Spades'


const CONSTANTS = {
  WIN: 8,
  PENATLY: -1
}

const initialGameState = {
  round: 0,
  lanes: [
    { suit: 'hearts', pos: 0 },
    { suit: 'spades', pos: 0 },
    { suit: 'clubs', pos: 0 },
    { suit: 'diamonds', pos: 0 }
  ]

}

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
}; 

const genDeckOfCards = () => {
  const variants = ['2', '3', '4', '5', '6', '7', '8','9','10','J','Q','K']
  const suits = ['hearts', 'clubs', 'spades', 'diamonds']
  let cards = []
  for (let suit of suits) {
    let partial = variants.map(v => ({suit: suit, variant: v}))
    cards = [...cards, ...partial]
  }
  return shuffle(cards)
}
window.genDeck = genDeckOfCards
const initialPenalties = [...new Array(CONSTANTS.WIN-2)].map((_v,i) => {
  return { flipped: false, pos: i+1, suit: 'blank', variant: null}
})

const Game = () => {
  // const [playerData] = useAtom(playerDataState)
  const [gameState, setGameState] = useState(initialGameState)
  const [penalties, setPenalties] = useState(initialPenalties)
  const [cardStack, setCardStack] = useState(genDeckOfCards())
  const [flippedCard, setFlippedCard] = useState(null)
  const [initialized, setInitialized] = useState(false)
  const [blocking, setBlocking] = useState(false)

  useEffect(() => { // UNPURE? causes issues in strictmode
    if (initialized) return
    setInitialized(true)
    setCardStack(cs => {
      const mutCS = structuredClone(cs)
      let penCards = []
      for (let i = 0; i < penalties.length; i++) {
        const c = mutCS.shift()
        penCards.push(c)
      }
      console.log(penCards.length, penalties.length)
      setPenalties(ps => {
        return ps.map((p, i) => ({...p, suit: penCards[i].suit, variant: penCards[i].variant}))
      })
      return mutCS
  })
  }, [initialized, penalties.length])

  const incPosOFSuit = (suit, penalty=false) => {
    setGameState(prev => {
      let mutPrev = structuredClone(prev)
      const laneIndex = mutPrev.lanes.findIndex(l => l.suit === suit)
      if (laneIndex < 0) return mutPrev
      if (penalty) {
        mutPrev.lanes[laneIndex].pos = 0
      } else {
        mutPrev.lanes[laneIndex].pos += 1 
      }

      mutPrev.round = mutPrev + 1
      return mutPrev
    })
  }

  const handleFlipCard = () => {
    setCardStack(prev => {
      const [first, ...rest] = prev
      setFlippedCard(first)
      return rest
    })
  }

  useEffect(() => {
    if (flippedCard) {
      incPosOFSuit(flippedCard.suit)
    }
  }, [flippedCard])

  useEffect(() => {
    const winningSuit = gameState.lanes.find(c => c.pos === CONSTANTS.WIN - 1)
    if (winningSuit) {
      setBlocking(true)
      
    }

    const lowestPos = Math.min(...gameState.lanes.map(c => c.pos))
    const lowestPenaltyIdx = penalties.findIndex(pen => pen.pos === lowestPos)
    if (lowestPenaltyIdx >= 0 && !penalties[lowestPenaltyIdx].flipped) {
      // lowestPenalty found and should be flipped
      // 
      setPenalties(pPenalties => {
        let m = structuredClone(pPenalties)
        m[lowestPenaltyIdx].flipped = true
        return m
      })
      let penSuit = penalties[lowestPenaltyIdx].suit
      console.log(penSuit)
      setBlocking(true)
      setTimeout(() => {
        incPosOFSuit(penSuit, true)
        setBlocking(false)

      }, 500)
    }

  }, [gameState.lanes, penalties])

  // const lowestPos = Math.min(...gameState.lanes.map(c=> c.pos))
  
  const winningSuit = gameState.lanes.find(c => c.pos === CONSTANTS.WIN-1)

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: '2em'}}>
      {winningSuit && <Box>{winningSuit.suit} has won</Box>}
      <Box sx={{ display: "flex", alignItems: 'center', gap: '2em' }}>
        {gameState.lanes.map(card => (
          <Lane key={card.suit} suit={card.suit} pos={card.pos} />
        ))}
        <Penalties penalties={penalties}/>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1em'}}>
        <Button onClick={handleFlipCard} disabled={blocking}>Flip card</Button>
        <Box>
          <Typography>Flipped Card: {flippedCard?.suit}{flippedCard?.variant}</Typography>
          <Typography>Cards remaining: {cardStack.length}</Typography>
        </Box>
      </Box>
    </Box>
  )
}


const Lane = ({ suit, pos }) => {
  // const [tpos, setTPos] = useState(pos)
  // const incPos = () => {setTPos(p => p+1)}
  return (
    <Box>
      <Box 
        sx= {{
          border: '1px solid red',
          position: 'relative',
          height: `${100*CONSTANTS.WIN-20}px`,
          width: 50
          // display: 'grid',
          // gridTemplateRows: 'repeat(5, 100px)',
          // gridTemplateColumns: 'auto'
        }}
      >
        <Box 
        // onClick={incPos}
          className='card' 
          sx={{
            // gridRowStart: tpos+1,
            position: 'absolute',
            bottom: `${100*pos}px`,
            // background: 'orange',
            height: '80px',
            width: '50px',
            transition: 'all 0.1s linear'
          }}
        ><Card variant={'A'} suit={suit} /></Box>
      </Box>
      <Typography>{suit} at {pos}</Typography>
    </Box>
  )
}

const Penalties = ({ penalties }) => {
  
  // const incPos = () => { setTPos(p => p + 1) }
  return (
    <Box>
      <Box
        sx={{
          border: '1px solid red',
          position: 'relative',
          height: `${100 * CONSTANTS.WIN-20}px`,
          width: 50
        }}
      >
        {penalties.map(penalty => {
        return (
        <Box
          key={penalty.pos}
          // onClick={incPos}
          className='card'
          sx={{
            // gridRowStart: tpos+1,
            position: 'absolute',
            borderRadius: '8px',
            bottom: `${100 * penalty.pos}px`,
            background: penalty.flipped ? 'unset' : 'orange',
            height: '80px',
            width: '50px',
            transition: 'all 0.1s linear'
          }}
        >{penalty.flipped ? <Card variant={penalty.variant} suit={penalty.suit}/>: undefined}</Box>
      )
        })}

      </Box>
      <Typography>Penalties</Typography>
    </Box>
  )
}


const Card = ({variant, suit}) => {
  return (
    <Box sx= {{
      background: '#fff',
      borderRadius: '8px',
      height: '80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'

    }}>
      <Typography color='black' fontWeight={'bold'}>{variant}</Typography>
      <Box sx={{ width: '30px'}}>
        {
        suit === 'hearts' ? <Hearts />:
        suit === 'spades' ? <Spades />:
        suit === 'diamonds' ? <Diamonds />:
        suit === 'clubs' ? <Clubs />:
        undefined
        }
      </Box>
    </Box>
  )
}

export default Game