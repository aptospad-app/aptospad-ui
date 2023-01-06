/**
 * This file just used to create sitemap XML file.
 * Whenever add more route, this file also need to add that route manually.
 */

import React from "react";
import {Route} from "react-router-dom";

export default (
  <Route>
    {/* <Route path="/" />  */}  {/* This URL is auto add to sitemap XML file when generate, so no need to declare */}
    {/* <Route path="/launchpad/:id" />
    <Route path="/whitepaper" /> */}
    <Route path='*' />
  </Route>
);
