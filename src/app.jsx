import React, { Component ,lazy ,Suspense} from 'react';
import { BrowserRouter as Router ,Route ,Switch } from 'react-router-dom';
import  "./public/style.css";
import Home from  "./home";
import AddLocation from  "./addLocation";
import Timing from  "./timing";

class App extends Component{

   render(){
      
      return(
        
              <Router>
                <Switch>
                   <Route  exact path="/" ><Home /></Route>
                   <Route  exact path="/addLocation" ><AddLocation /></Route>
                   <Route  exact path="/addLocation/:id" ><AddLocation /></Route>
                   <Route  exact path="/timing" ><Timing /></Route>
               </Switch>
                </Router>
        );
   }
}
export default App;