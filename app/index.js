import React from "react";
import 'babel-polyfill'; // used so that ES2015 APIs are available in older browsers

import App from "./components/App";

require('./css/application.css')

React.render(<App />, document.body);