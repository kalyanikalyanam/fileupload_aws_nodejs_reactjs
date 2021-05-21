import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./components/Home";
import Example from "./components/example";
import UppyImageUpload from "./components/uppy_image"
import UppyVideoUpload from "./components/uppy_video"

class App extends Component {
  render() {
    return (
      <div className="App">
	      <Router>
		      <div>
			      <Route exact path="/" component={Home} />
<Route exact path="/example" component={Example} />
<Route exact path="/UppyImageUpload" component={UppyImageUpload} />
<Route exact path="/UppyVideoUpload" component={UppyVideoUpload} />


            
		      </div>
	      </Router>
      </div>
    );
  }
}

export default App;
