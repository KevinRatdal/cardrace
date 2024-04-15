/* eslint-disable react/prop-types */
// import { useAtom } from "jotai"
// import { playerDataState } from "../state/common"
import { Box, Button, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import Hearts from './components/Hearts'
import Clubs from './components/Clubs'
import Diamonds from './components/Diamonds'
import Spades from './components/Spades'
import { Horsegame } from "./Horsegame"
import { uid } from "uid"



const Game = () => {
  // const [playerData] = useAtom(playerDataState)
  const gameRef = useRef(null)
  const [, setTickId] = useState(null)

  useEffect(() => {
    gameRef.current = new Horsegame()
    setTickId(uid())
  }, [])


  const handleTick = () => {
    let newTickId = gameRef.current.tick()
    setTickId(newTickId)
  }

  if (!gameRef.current) { return <div>uninitialized</div> }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
      {gameRef.current.winningCard && <Box>{gameRef.current.winningCard.suit} has won</Box>}
      <Box sx={{ display: "flex", alignItems: 'center', gap: '2em' }}>
        {gameRef.current.lanes.map(lane => (
          <Lane key={lane.card.suit} card={lane.card} pos={lane.pos} height={gameRef.current.CONFIG.WIN} />
        ))}
        <Penalties penalties={gameRef.current.penalties} height={gameRef.current.CONFIG.WIN} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1em' }}>
        <Button onClick={handleTick} disabled={gameRef.current.blocking === 'win'}>Flip card</Button>
        <Box>
          <Typography>Flipped Card: {gameRef.current.flippedCard?.suit}{gameRef.current.flippedCard?.variant}</Typography>
          <Typography>Cards remaining: {gameRef.current.cardStack.getCardsLeft()}</Typography>
        </Box>
      </Box>
    </Box>
  )
}


const Lane = ({ card, pos, height }) => {
  // const [tpos, setTPos] = useState(pos)
  // const incPos = () => {setTPos(p => p+1)}
  return (
    <Box>
      <Box
        sx={{
          border: '1px solid red',
          position: 'relative',
          height: `${90 * height - 10}px`,
          width: 52
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
            bottom: `${90 * pos}px`,
            // background: 'orange',
            height: '80px',
            width: '50px',
            transition: 'all 0.1s linear'
          }}
        ><Card variant={card.variant} suit={card.suit} /></Box>
      </Box>
      <Typography>{card.suit} at {pos}</Typography>
    </Box>
  )
}

const Penalties = ({ penalties, height }) => {

  // const incPos = () => { setTPos(p => p + 1) }
  return (
    <Box>
      <Box
        sx={{
          border: '1px solid red',
          position: 'relative',
          height: `${90 * height - 10}px`,
          width: 52
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
                bottom: `${90 * penalty.pos}px`,

                height: '80px',
                width: '50px',
                transition: 'all 0.1s linear'
              }}
            ><Card variant={penalty.card.variant} suit={penalty.card.suit} flipped={penalty.flipped} applied={penalty.applied} /></Box>
          )
        })}

      </Box>
      <Typography>Penalties</Typography>
    </Box>
  )
}


const Card = ({ variant, suit, flipped = true, applied=false }) => {
  return (
    <Box sx={{
      background: flipped ? '#fff' : 'orange',
      borderRadius: '8px',
      height: '80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      filter: applied && flipped ? 'opacity(50%)' : undefined

    }}>
      {flipped ?
        <>
          <Typography color='black' fontWeight={'bold'}>{variant}</Typography>
          <Box sx={{ width: '30px' }}>
            {
              suit === 'hearts' ?
                <Hearts /> :
              suit === 'spades' ?
                <Spades /> :
              suit === 'diamonds' ?
                <Diamonds /> :
              suit === 'clubs' ?
                <Clubs /> :
              undefined
            }
          </Box>
        </>
        : <span></span>}
    </Box>
  )
}

export default Game