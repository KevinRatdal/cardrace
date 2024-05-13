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
      <Logo />
      <CssBaseline />
      <HorseGame />
    </ThemeProvider>
  )
}

export default App

function Logo() {
  return (
    <a style={{position: 'absolute', top: '34px', left: '32px'}} href='/' ><img style={{height: '32px'}}  src='./rsl.png' /></a>
  )
}