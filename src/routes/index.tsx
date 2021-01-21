import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repositories from '../pages/Repository';
import User from '../pages/User';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/repositories/:repository+" component={Repositories} />
    <Route path="/users/:user" exact component={User} />
  </Switch>
);

export default Routes;
