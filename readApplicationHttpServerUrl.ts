function readApplicationHttpServerUrl() {
  const url = new URL(window.location.toString());

  const applicationHttpServerUrl = url.searchParams.get(
    'applicationHttpServerUrl'
  );

  if (applicationHttpServerUrl) {
    return applicationHttpServerUrl;
  }
}

export default readApplicationHttpServerUrl;
