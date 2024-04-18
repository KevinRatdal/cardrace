/* eslint-disable react/prop-types */
import { useAtom } from "jotai"
import { appState, playerDataState } from "../state/common"
import { Box, Button, TextField, Typography } from "@mui/material"
import { uid } from "uid"
import styles from './setup.module.css'
import SuitIcon from "./components/SuitIcon"
import { gameStats } from "../state/common"
import { useAtomValue } from "jotai/react"

const Summary = () => {
    const [, setAppState] = useAtom(appState)
    const gameStatsValue = useAtomValue(gameStats)
    console.log(gameStatsValue)
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
            <Typography variant="h2">Summary</Typography>
            <Box className={styles.playerList}>
                {Object.keys(playerData).map(playerId => {
                    return <PlayerData key={playerId} player={playerData[playerId]} />
                })}
                <Button onClick={addPlayer}>Add Player</Button>
            </Box>
            <Button variant="contained" onClick={handleSave}>New Round</Button>
        </Box>
    )
}


const PlayerData = ({ player }) => {
    const [, setPlayerData] = useAtom(playerDataState)
    // console.log(playerData)
    // const updateUser = (playerId) => (data) => {
    //   setPlayerData(prev => {

    //   })
    // }
    const handleChange = (fieldType) => (e) => {
        setPlayerData(prev => (
            {
                ...prev,
                [player.id]: {
                    ...prev[player.id],
                    [fieldType]: e.target.value
                }
            }
        ))
    }


    return (
        <Box sx={{
            display: 'flex',
            gap: '0.5em'
        }}>
            <Typography>{player.name}</Typography>
            <TextField size="small" onChange={handleChange('wager')} type="number" value={player.wager} label='Wager'></TextField>

            <SuitIcon suit={player.suit} width='1em' />&nbsp;<span style={{ textTransform: 'capitalize' }}>{player.suit}</span>
        </Box>
    )
}


export default Summary