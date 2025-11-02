const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList'); // Add this line

const defaultConfig = getDefaultConfig(__dirname);

// SVG support
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg');
defaultConfig.resolver.sourceExts.push('svg');
defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

// ✅ Exclude native build folders Metro shouldn't watch
defaultConfig.resolver.blacklistRE = exclusionList([
  /android\/\.cxx\/.*/,
  /android\/build\/.*/,
  /android\/app\/build\/.*/,
]);

module.exports = mergeConfig(defaultConfig, {});
