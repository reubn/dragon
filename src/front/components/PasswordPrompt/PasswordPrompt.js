import React, {Component} from 'react'

import {passwordPrompt, message, input, button, close} from './style'

export default class PasswordPrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
          password: ''
        }
    }

    passwordChange(event){
      this.setState({password: event.target.value})
    }

    render() {
      const {open, SSID, callToConnect} = this.props

        return open ? (
          <section className={passwordPrompt}>
            <p className={message}>{SSID}</p>
            <input type="password" className={input} placeholder="pA55w0RD" value={this.state.password} onChange={event => this.passwordChange(event)} />
            <input type="submit"className={button} onClick={() => this.state.password && this.state.password.length >= 10 && callToConnect(this.state.password)} />
          </section>
        ) : null
    }
}
