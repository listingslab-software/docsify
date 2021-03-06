import { createReducer } from '@reduxjs/toolkit'
import {
  overlay,
  path,
  darkMode,
  rightMenuOpen,
  appRoute,
} from "./actions"

export const appSlice = {
  darkMode: false,
  appRoute: null,
  path: `/`,
  overlay: false,
  helpOn: true,
  rightMenuOpen: false,
  progress: false,
}

const appReducer = createReducer( appSlice, {

  [appRoute]: (state, action) => {
    state.appRoute = action.appRoute
    return state
  },
  
  [rightMenuOpen]: (state, action) => {
    state.rightMenuOpen = action.rightMenuOpen
    return state
  },

  [darkMode]: (state, action) => {
    state.darkMode = action.darkMode
    return state
  },

  [path]: (state, action) => {
    state.path = action.path
    return state
  },

  [overlay]: (state, action) => {
    state.overlay = action.overlay
    return state
  },

})

export { appReducer }
