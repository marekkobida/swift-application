/*
 * Copyright 2020 Marek Kobida
 */

import './client.css';
import './client.html';

import React from 'react';
import ReactDOM from 'react-dom';

import Application from '../Application';

function TestApplicationClient() {
  const [about, updateAbout] = React.useState<
    ReturnType<Application['toJson']>
  >();

  React.useEffect(() => {
    const url = new URL(globalThis.location.toString());

    const applicationHttpServerUrl = url.searchParams.get(
      'applicationHttpServerUrl'
    );

    if (applicationHttpServerUrl) {
      fetch(new URL('/about', applicationHttpServerUrl).toString())
        .then(response => response.json())
        .then(updateAbout);
    }
  }, [about?.httpServerUrl]);

  if (about) {
    return (
      <>
        <h1>{about.name}</h1>
        <p>{about.description}</p>
        <p>{about.version}</p>
      </>
    );
  }

  return (
    <>
      <h1>Error</h1>
    </>
  );
}

ReactDOM.render(<TestApplicationClient />, document.getElementById('client'));
