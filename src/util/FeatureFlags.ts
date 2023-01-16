

const FeatureFlags: {[index: string]: boolean} = {
  login: window.location.search.indexOf('ff_login') !== -1,
}

export default FeatureFlags