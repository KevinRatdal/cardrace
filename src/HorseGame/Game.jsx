/* eslint-disable react/prop-types */
// import { useAtom } from "jotai"
// import { playerDataState } from "../state/common"
import { Box, Button, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { Horsegame } from "./Horsegame"
import { uid } from "uid"
import SuitIcon from "./components/SuitIcon"



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
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4em' }}>
      <Box sx={{ display: "flex", alignItems: 'center', gap: '2em' }}>
        {gameRef.current.lanes.map(lane => (
          <Lane key={lane.card.suit} card={lane.card} pos={lane.pos} height={gameRef.current.CONFIG.WIN} />
        ))}
        <Penalties penalties={gameRef.current.penalties} height={gameRef.current.CONFIG.WIN} tick={handleTick} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', gap: '1em' }}>
        {gameRef.current.winningCard && <Box>{gameRef.current.winningCard.suit} has won</Box>}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1em' }}>
          <Button onClick={handleTick} variant="contained" disabled={gameRef.current.blocking === 'win'} fullWidth>Flip card</Button>
          <CardFlipContainer card={gameRef.current.flippedCard} nextCard={gameRef.current.cardStack.peekCard()} />
        </Box>
        <Typography>Cards remaining: {gameRef.current.cardStack.getCardsLeft()}</Typography>
      </Box>
    </Box>
  )
}

const CardFlipContainer = ({ card, nextCard }) => {
  const [cards, setCards] = useState([nextCard, null])

  useEffect(() => {
    setCards(prev => {
      if (prev.length === 0) {
        return [card]
      } else {
        return [nextCard, card, prev[1]]
      }
    })
  }, [card, nextCard])

  return (
    <Box sx={{
      height: '80px',
      width: '110px',
      position: 'relative'
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: 80,
        width: 50,
        background: 'linear-gradient(-45deg, #e66465, #9198e5)',
        borderRadius: '8px',
        boxShadow: '2px 2px 1px gray'
      }} />
      {cards.map((_card, i) => (
        _card && <Card
          key={`${_card?.suit}${_card?.variant}`}
          variant={_card?.variant}
          suit={_card?.suit}
          flipped={_card !== null && i !== 0}
          sx={{
            position: 'absolute',
            left: i > 0 ? 60 : 0,
            zIndex: 3 - i,
            top: 0,
            visibility: i === 0 ? 'hidden' : 'show'
          }}
        />
      ))}

    </Box>
  )
}


const Lane = ({ card, pos, height }) => {
  return (
    <Box>
      <Box
        sx={{
          // border: '1px solid red',
          position: 'relative',
          height: `${90 * height - 10}px`,
          width: 50,
          borderRadius: '8px',
          boxShadow: '0px 0px 8px #ddd2'
        }}
      >
        <Box
          className='card'
          sx={{
            position: 'absolute',
            bottom: `${90 * pos}px`,
            height: '80px',
            width: '50px',
            transition: 'all 0.1s linear',
            transitionDelay: '0.5s'
          }}
        ><Card variant={card.variant} suit={card.suit} /></Box>
      </Box>
    </Box>
  )
}

const Penalties = ({ penalties, height, tick }) => {

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gap: '10px',
          gridTemplate: `repeat(${height}, 1fr) / auto`,
          borderRadius: '8px',
          boxShadow: '0px 0px 8px #ddd2'
        }}
      >
        {penalties.map(penalty => {
          return (
            <Box
              key={penalty.pos}
              className='card'
              sx={{
                gridRowStart: `${height - penalty.pos}`,
                transition: 'all 0.1s linear',
                transitionDelay: '0.5s'
              }}
            ><Card variant={penalty.card.variant} suit={penalty.card.suit} flipped={penalty.flipped} applied={penalty.applied} onClick={penalty.flipped && !penalty.applied ? () => tick() : undefined} /></Box>
          )
        })}

      </Box>
    </Box>
  )
}


const Card = ({ variant, suit, flipped = true, applied = false, onClick = undefined, sx = {} }) => {
  const [internalFlip, setInternalFlip] = useState(flipped)
  useEffect(() => {
    let timeout = setTimeout(() => {
      setInternalFlip(flipped)
    }, 250)
    return () => {
      clearTimeout(timeout)
    }
  }, [flipped])
  return (
    <Box
      onClick={onClick}
      sx={{
        background: internalFlip ? '#fff' : 'linear-gradient(45deg, #e66465, #9198e5)',
        borderRadius: '8px',
        height: '80px',
        aspectRatio: '5/8',
        // width: '50px',
        transform: `rotate3d(0, 1, 0, ${!flipped ? '-180deg' : '0deg'})`,
        transition: 'transform 0.5s ease-in-out, left 0.5s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: typeof onClick === 'function' ? 'pointer' : undefined,
        filter: applied && flipped ? 'opacity(50%)' : undefined,
        userSelect: 'none',
        ...sx
      }}
    >
      {internalFlip ?
        <>
          <Typography color='black' fontWeight={'bold'}>{variant}</Typography>
          <Box sx={{ width: '30px' }}>
            <SuitIcon suit={suit} />
          </Box>
        </>
        : <span></span>}
    </Box>
  )
}

export default Game