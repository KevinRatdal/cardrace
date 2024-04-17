import { useAtom } from "jotai/react"
import { appState } from "../state/common"
import Setup from "./Setup"
import Summary from "./Summary"
import Game from './Game'
import { Box, Button, Typography } from "@mui/material"


const views = {
  0: { component: <Setup /> },
  1: { component: <Game /> },
  2: { component: <Summary/>}
}

const HorseGame = () => {
  const [currentAppState, setAppState] = useAtom(appState)


  const handleReset = () => {
    setAppState(0)
  }

  if (Object.hasOwn(views, currentAppState)) {
    return (
      views[currentAppState].component
    )
  }

  return (
    <Box>
      <Typography>Unknown gamestate</Typography>
      <Button onClick={handleReset}>back to setup</Button>
    </Box>
  )
}

export default HorseGame