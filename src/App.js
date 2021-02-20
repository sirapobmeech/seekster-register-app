import Register from './Register'
import Home from './Home';
import { Route, Switch } from 'react-router-dom';


const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
