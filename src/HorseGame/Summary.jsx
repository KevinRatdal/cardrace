/* eslint-disable react/prop-types */
import { appState } from "../state/common"
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
// import { uid } from "uid"
// import styles from './setup.module.css'
import SuitIcon from "./components/SuitIcon"
import { gameStats } from "../state/common"
import { useAtomValue, useSetAtom } from "jotai/react"
import PlacementIcon from "./components/PlacementIcon"
import { useEffect, useState } from "react"

const columns = [
  {
    id: 'placement',
    label: '#'
  },
  {
    id: 'name',
    label: 'Name'
  },
  {
    id: 'wager',
    label: 'Wager'
  },
  {
    id: 'suit',
    label: 'Suit'
  },
]

const Summary = () => {
  const setAppState = useSetAtom(appState)
  const gameStatsValue = useAtomValue(gameStats)
  const [gameResults, setGameResults] = useState(null)

  useEffect(() => {
    setGameResults(gameStatsValue.at(-1))
  }, [gameStatsValue])
  console.log(gameStatsValue)

  const getPlacement = (player, gameRes) => {
    const wc = gameRes.gameResults.winningCard
    if (player.suit === wc.suit) {
      return 1
    } 
    return ''
  }

  const handleSave = () => {
    setAppState(0)
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1em',
      width: '600px'
    }}>
      <Typography variant="h2">Summary</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(col => {
                return <TableCell key={col.id}>{col.label}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>

            {Object.keys(gameResults?.players ?? []).map((playerId, index) => {
              return <PlayerData key={playerId} player={gameResults?.players[playerId]} placement={getPlacement(gameResults?.players[playerId], gameResults)} index={index} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleSave}>New Round</Button>
    </Box>
  )
}


const PlayerData = ({ player, placement }) => {
  return (
    <TableRow>
      <TableCell>
        <PlacementIcon placement={placement} />
      </TableCell>
      <TableCell>
        <Typography>{player.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{player.wager}</Typography>
      </TableCell>
      <TableCell>
        <SuitIcon suit={player.suit} width='1em' />&nbsp;<span style={{ textTransform: 'capitalize' }}>{player.suit}</span>
      </TableCell>
    </TableRow>
  )
}


export default Summary