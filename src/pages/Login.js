import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabledButton: true,
    };

    this.handleUserInput = this.handleUserInput.bind(this);
  }

  checkUserData() {
    const { email, password } = this.state;
    const minPass = 6;

    if (email.includes('@') && email.includes('.com') && password.length >= minPass) {
      this.setState({
        disabledButton: false,
      });
    }
  }

  handleUserInput({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    },
    () => this.checkUserData());
  }

  render() {
    const { isLogged, walletLogin } = this.props;
    const { email, disabledButton } = this.state;

    return (
      <div className="login-form">
        { isLogged && <Redirect to="/carteira" /> }
        <form>
          <h1>Wallet Manager</h1>
          <fieldset>
            <input
              type="email"
              id="email-input"
              name="email"
              placeholder="E-mail"
              onChange={ this.handleUserInput }
            />
            <input
              type="password"
              id="password-input"
              name="password"
              placeholder="Senha"
              onChange={ this.handleUserInput }
            />
            <button
              type="button"
              disabled={ disabledButton }
              onClick={ () => walletLogin(email) }
            >
              Entrar
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  walletLogin: (email) => dispatch(loginUser(email)),
});

Login.propTypes = {
  isLogged: PropTypes.bool,
  walletLogin: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
