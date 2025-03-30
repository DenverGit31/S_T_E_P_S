import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Navigation from "./navigations";
import AuthNavigator from "./navigations/AuthNavigator";
export default function Index() {
  const [auth, setAuth] = useState(false);
  return auth ? <AuthNavigator /> : <Navigation />;
}
