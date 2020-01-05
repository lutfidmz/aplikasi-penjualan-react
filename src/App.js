import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Registrasi from "./pages/registrasi";
import Login from "./pages/login";
import LupaPassword from "./pages/lupa-password";
import NotFound from "./pages/404";
import Private from "./pages/private";
import Produk from "./pages/private/produk";
import PrivateRoute from "./componens/PrivateRoute";
import FirebaseProvider from "./componens/FirebaseProvider";

import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./config/theme";

// snackbar
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <FirebaseProvider>
            <Router>
              <Switch>
                <PrivateRoute exact path="/" component={Private} />
                <PrivateRoute path="/pengaturan" component={Private} />
                <PrivateRoute path="/transaksi" component={Private} />
                <Route path="/registrasi" component={Registrasi} />
                <Route path="/login" component={Login} />
                <Route path="/lupa-password" component={LupaPassword} />
                <Route path="/produk" component={Produk} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </FirebaseProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
