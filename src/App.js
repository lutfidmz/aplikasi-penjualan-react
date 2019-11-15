import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Registrasi from "./pages/registrasi"
import Login from "./pages/login"
import LupaPassword from './pages/lupa-password';
import NotFound from './pages/404';
import Private from './pages/private';
import Produk from './pages/private/produk';
import PrivateRoute from './componens/PrivateRoute';
import FirebaseProvider from './componens/FirebaseProvider';

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Private} />
          <PrivateRoute path="/pengaturan" component={Private} />
          <PrivateRoute path="/transaksi" component={Private} />
          <Route path="/registrasi" component={Registrasi}/>
          <Route path="/login" component={Login}/>
          <Route path="/lupa-password" component={LupaPassword}/>
          <Route path="/produk" component={Produk} />
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </FirebaseProvider>
  );
}

export default App;
