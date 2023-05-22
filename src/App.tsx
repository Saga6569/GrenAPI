import { useEffect, useState } from 'react';
import SignupForm from './Components/Authorization'
import Chat from './Components/Chat/Chat';
import Menu from './Components/Menu/Menu';
import './App.scss'

const App = () => {

  const [state, setState] = useState({ users: [], IdInstance: '', ApiTokenInstance: '', coutn: 0 })

  useEffect(() => {
    const localStorageState = ((localStorage.getItem('state')));
    if (localStorageState !== null) {
      setState(JSON.parse(localStorageState))
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const login = () => {
    if (state.IdInstance !== '') {
      return null;
    }
    return (
      <div>
        {SignupForm((IdInstance: string, ApiTokenInstance: string) => setState({ ...state, IdInstance, ApiTokenInstance }))}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="main">
        {login()}
        {state.IdInstance !== '' ? <Menu state={state} setState={setState} /> : null}
        {state.IdInstance !== '' ? <Chat state={state} setState={setState} /> : null}
      </div>
    </div>
  );
}

export default App;