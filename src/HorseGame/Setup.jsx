/* eslint-disable react/prop-types */
import { useAtom } from "jotai"
import { appState, playerDataState } from "../state/common"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { uid } from "uid"
import styles from './setup.module.css'
import Hearts from './components/Hearts'
import Clubs from './components/Clubs'
import Diamonds from './components/Diamonds'
import Spades from './components/Spades'

const Setup = () => {
  const [, setAppState] = useAtom(appState)
  const [playerData, setPlayerData] = useAtom(playerDataState)

  const addPlayer = () => {
    const newUser = {
      id: uid(),
      name: '',
      suit: '',
      wager: 0
    }
    setPlayerData(prev => ({ ...prev, [newUser.id]: newUser }))
  }

  const handleSave = () => {
    setAppState(1)
  }

  return (
    <Box>
      <Typography variant="h2">Setup</Typography>
      <Box className={styles.playerList}>
        {Object.keys(playerData).map(playerId => {
          return <PlayerInput key={playerId} player={playerData[playerId]} />
        })}
        <Button onClick={addPlayer}>Add Player</Button>
      </Box>
      <Button variant="contained" onClick={handleSave}>Start</Button>
    </Box>
  )
}


const PlayerInput = ({ player }) => {
  const [, setPlayerData] = useAtom(playerDataState)
  // console.log(playerData)
  // const updateUser = (playerId) => (data) => {
  //   setPlayerData(prev => {

  //   })
  // }
  const handleChange = (fieldType) => (e) => {
    setPlayerData(prev => (
      {...prev, 
        [player.id]: {
        ...prev[player.id],
        [fieldType]: e.target.value
      }}
    ))
  }

  const delPlayer = () => {
    setPlayerData(prev => {
      let mod = {...prev}
      delete mod[player.id]
      return mod
    })
  }

  return (
    <Box sx= {{
      display: 'grid',
      gridTemplate: 'auto / 200px 100px 150px 50px',
      gap: '0.5em'
    }}>
      <TextField size="small" onChange={handleChange('name')} value={player.name} label='Name'></TextField>
      <TextField size="small" onChange={handleChange('wager')} type="number" value={player.wager} label='Wager'></TextField>
      <FormControl>
        <InputLabel id="demo-simple-select-label" size="small">Suit</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={player.suit}
          label="Age"
          onChange={handleChange('suit')}
          size="small"
        >
          <MenuItem value={'hearts'} color="red"><Hearts width='1em' />&nbsp;Hearts</MenuItem>
          <MenuItem value={'diamonds'}><Diamonds width='1em' />&nbsp;Diamonds</MenuItem>
          <MenuItem value={'clubs'}><Clubs width='1em' />&nbsp;Clubs</MenuItem>
          <MenuItem value={'spades'}><Spades width='1em' />&nbsp;Spades</MenuItem>
        </Select>
      </FormControl>
      <Button variant="outlined" size="small" onClick={delPlayer}>x</Button>
    </Box>
  )
}


export default Setup