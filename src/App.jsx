import React from 'react'
import { useSelector } from 'react-redux'
import {
  themeLight, 
  themeDark,
} from './theme'
import {
  MuiThemeProvider,  
  createMuiTheme, 
  CssBaseline,
  LinearProgress,
} from '@material-ui/core/'
import {
  Overlay,
} from './components'
import Docsify from './Docsify'

export default function App() {

    const appSlice = useSelector(state => state.app)
    let theme = themeLight
    const {
      darkMode,
    } = appSlice
    if ( darkMode ) theme = themeDark

    return <MuiThemeProvider theme={ createMuiTheme( theme ) }>
              <CssBaseline />
              <Overlay />
              <LinearProgress color={ `secondary` } />
              <Docsify />
            </MuiThemeProvider> 
}
