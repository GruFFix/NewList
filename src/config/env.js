export default {
  apiRoot: window.ENVIRONMENT && window.ENVIRONMENT['BUNDLE_API_ROOT'] || BUNDLE_API_ROOT,
  apiKey: window.ENVIRONMENT && window.ENVIRONMENT['BUNDLE_API_KEY'] || BUNDLE_API_KEY,
}
