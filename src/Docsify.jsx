import React from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { appRouter } from './appRouter'
import {
  makeStyles,
  Drawer,
  AppBar,
  Grid,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core/'
import { Icon } from './theme'
import {
  toggleRightMenuOpen,
} from './redux/app/actions'
import {
  initDocsfify,
} from './redux/docsify/actions'
import {
  Dashboard,
  RightMenu,
  Settings,
  DarkmodeSwitch,
} from './components'

const drawerWidth = 175

const useStyles = makeStyles((theme) => ({
  localify: {
    display: 'flex',
  },
  onTop:{
    zIndex: 1234567778,
  },
  btnTxt:{
    marginRight: theme.spacing(),
    marginLeft: theme.spacing(),
  },
  iconBtn:{
    marginTop: theme.spacing( 0.5 ),
  },
  appBar: {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
    // top: 100,
    // color: theme.palette.primary.main,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  homeBtn:{
    marginRight: theme.spacing(0),
  },
  mightyIcon:{
    paddingTop: theme.spacing( 0.5 ),
    marginRight: theme.spacing( 2 ),
  },
  mightyBtn: {
    fontWeight: 'lighter',
    marginRight: theme.spacing( 2 ),
  },
  grow:{
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    border: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}))

export default function Localify() {

  const classes = useStyles()
  const appSlice = useSelector(state => state.app)
  const docsifySlice = useSelector(state => state.docsify)

  React.useEffect(() => {
    const {
      configLoading,
      configLoaded,
    } = docsifySlice
    if (!configLoading && !configLoaded) initDocsfify()
  }, [docsifySlice])

  const {
    config,
  } = docsifySlice
  if (! config ) return null

  const { 
    title, 
  } = config

  const {
    rightMenuOpen,
  } = appSlice

  let routeOjb = appRouter()
  const { 
    type,
  } = routeOjb

  const drawerOpen = () => {
    toggleRightMenuOpen( true )
  }

  const drawerClose = () => {
    toggleRightMenuOpen( false )
  }

  return <div className={classes.localify}>
  
      <AppBar
        position={ `fixed` }
        color={ `default` }
        className={ clsx( classes.appBar, {
          [classes.appBarShift]: rightMenuOpen,
        })}>
        <Toolbar>

          <Typography variant="h6" noWrap>
            { title }
          </Typography>

          <div className={ clsx ( classes.grow ) } />

          <DarkmodeSwitch />
          
          <IconButton
            color={`secondary`}
            edge={ `end` }
            onClick={ drawerOpen }
            className={ clsx( rightMenuOpen && classes.hide )}>
            <Icon icon={ `menu` } color={ `secondary` } />
          </IconButton>

        </Toolbar>
      </AppBar>
      
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: rightMenuOpen,
        })}
      >
        <div className={classes.drawerHeader} />
         <Grid container>
            <Grid item xs={ 12 } >
              <div>
                { type === `dashboard` ? <Dashboard /> : null }
                { type === `settings` ? <Settings /> : null }
              </div>
            </Grid>
          </Grid>
        </div>

      <Drawer
        open={ rightMenuOpen }
        className={ clsx( classes.drawer )}
        variant={ `persistent` }
        anchor={ `right` }
        classes={{
          paper: classes.drawerPaper,
        }}>

        <div className={classes.drawerHeader}>
          <IconButton onClick={drawerClose}>
            <Icon icon={ `close`} color={ `secondary` } />
          </IconButton>
        </div>

        <RightMenu />
      
      </Drawer>
    </div>
}
