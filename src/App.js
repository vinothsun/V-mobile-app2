import React from 'react'
import { StatusBar } from 'react-native'
import { AsyncStorage } from "react-native";

import { connect } from 'react-redux'

import Tabs from './auth/Tabs'
import Nav from './nav/Nav'

export const USER_TOKEN = "auth-key-token";

class App extends React.Component {
  state = {
    token: "",
    isLoading: true
  }
  async componentDidMount() {
    StatusBar.setHidden(true)
    try {
      AsyncStorage.getItem(USER_TOKEN)
      .then(res => {
        if (res !== null) {
          console.log ("res - " + res)
          this.setState({ isLoading: false });
        } else {
          console.log ("No token available in didmount ")
          this.setState({ isLoading: false });
        }
      })
      //const user = await Auth.currentAuthenticatedUser()
      const user = "";
      this.setState({ user, isLoading: false })
    } catch (err) {
      this.setState({ isLoading: false })
    }
  }
  async componentWillReceiveProps(nextProps) {
    try {
      //const user = await Auth.currentAuthenticatedUser()
      AsyncStorage.getItem(USER_TOKEN)
      .then(res => {
        if (res !== null) {
          console.log ("res - " + res)
          this.setState({ token : res,  isLoading: false });
        } else {
          console.log ("No token available in recvprops")
          this.setState({ token: "", isLoading: false });
        }
      })
      const user = "";
      this.setState({ user })
    } catch (err) {
      this.setState({ user: {} })
    }
  }
  render() {
    console.log ("check Appjs ")
    if (this.state.isLoading) return null
    console.log ("check Appjs loading not null")

    let loggedIn = false
    if (this.state.token.length != 0) {
      loggedIn = true
      console.log ("check Appjs loggedin true")

    }
    if (loggedIn) {
      return (
        <Nav />
      )
    }
    return (
      <Tabs />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App)
