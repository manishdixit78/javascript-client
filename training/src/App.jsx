import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {
  TextFieldDemo,
  InputDemo,
  Trainee,
  ChildrenDemo,
  Login,
  NotFound,
} from './pages/index';
import { AuthRoute, PrivateRoute } from './routes/index';
import { SnackBarProvider } from './contexts/index';

const App = () => (
  <div>
    <SnackBarProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/trainee" />
          </Route>
          <AuthRoute path="/login" component={Login} />
          <PrivateRoute path="/childrenDemo" component={ChildrenDemo} />
          <PrivateRoute path="/textFieldDemo" component={TextFieldDemo} />
          <PrivateRoute path="/inputDemo" component={InputDemo} />
          <PrivateRoute path="/trainee" component={Trainee} />
          <PrivateRoute component={NotFound} />
        </Switch>
      </Router>
    </SnackBarProvider>
  </div>
);
export default App;
