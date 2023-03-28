import { Route, Switch } from 'react-router-dom';
import './app.css';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import Form from './Components/Form/Form';



function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing}/> 
          <Route exact path="/home" component={Home}/>
          <Route exact path="/dogs/:id" component={Detail}/> 
          <Route exact path="/form" component={Form}/>
        </Switch>
      </div>
  );
}

export default App;
