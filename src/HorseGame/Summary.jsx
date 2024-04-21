/* eslint-disable react/prop-types */
import { useAtom } from "jotai"
import { appState } from "../state/common"
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
// import { uid } from "uid"
// import styles from './setup.module.css'
import SuitIcon from "./components/SuitIcon"
import { gameStats } from "../state/common"
import { useAtomValue } from "jotai/react"
import TrophyIcon from '@mui/icons-material/EmojiEvents';

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
  const [, setAppState] = useAtom(appState)
  const gameStatsValue = useAtomValue(gameStats)
  console.log(gameStatsValue)

 

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
              {columns.map(col => {
                return <TableCell key={col.id}>{col.label}</TableCell>
              })}
          </TableHead>
          <TableBody>

            {Object.keys(gameStatsValue.at(-1)?.players).map(playerId => {
              return <PlayerData key={playerId} player={gameStatsValue.at(-1)?.players[playerId]} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleSave}>New Round</Button>
    </Box>
  )
}


const PlayerData = ({ player }) => {
  return (
    <TableRow>
      <TableCell>
        <TrophyIcon></TrophyIcon><Typography>{1}</Typography>
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