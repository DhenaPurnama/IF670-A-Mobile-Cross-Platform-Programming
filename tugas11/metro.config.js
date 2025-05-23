const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Tambahkan resolver untuk node modules
config.resolver.extraNodeModules = {
  events: require.resolve('events/'),
  stream: require.resolve('stream-browserify'),
  http: require.resolve('stream-http'),
  https: require.resolve('https-browserify'),
  net: require.resolve('react-native-tcp'),
  tls: require.resolve('react-native-tcp'),
  fs: require.resolve('react-native-fs'),
  path: require.resolve('path-browserify'),
  zlib: require.resolve('browserify-zlib'),
  crypto: require.resolve('react-native-crypto'),
  url: require.resolve('react-native-url-polyfill'),
  assert: require.resolve('assert/'),
};

module.exports = config;