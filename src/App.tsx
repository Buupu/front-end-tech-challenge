import React from "react";
import AssetPage from "./pages/Asset";
import SearchPage from "./pages/Search";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/search" exact>
          <SearchPage />
        </Route>

        <Route path="/asset/:assetId" exact>
          <AssetPage />
        </Route>

        <Route path="/">
          <Redirect to="/search" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
