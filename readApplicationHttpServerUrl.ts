function readApplicationHttpServerUrl() {
  const url = new URL(window.location.toString());

  const applicationHttpServerUrl = url.searchParams.get(
    'applicationHttpServerUrl'
  );

  if (applicationHttpServerUrl) {
    return applicationHttpServerUrl;
  }

  throw new Error('The application HTTP server URL does not exist.');
}

export default readApplicationHttpServerUrl;
