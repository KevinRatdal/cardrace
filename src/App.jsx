import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'
import { CssBaseline } from '@mui/material'
import HorseGame from './HorseGame';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <HorseGame />
    </ThemeProvider>
  )
}

export default App
