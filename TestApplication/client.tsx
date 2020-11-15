/*
 * Copyright 2020 Marek Kobida
 */

import './client.html';

import React from 'react';
import ReactDOM from 'react-dom';

function Client() {
  const url = new URL(window.location.toString());

  const httpServerUrlFromUrlSearchParameters = url.searchParams.get(
    'httpServerUrl',
  );

  return (
    <>
      <h1>{httpServerUrlFromUrlSearchParameters}</h1>
      <p>HTTP server, ktorý po pridaní vytvorila testovacia aplikácia.</p>
    </>
  );
}

ReactDOM.render(<Client />, document.getElementById('client'));
