const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 1. Pegue as extensões padrão de assets e adicione 'mp4'
config.resolver.assetExts.push('mp4');

// 2. Remova 'mp4' de sourceExts (extensões de código), caso ele esteja lá por erro
config.resolver.sourceExts = config.resolver.sourceExts.filter(ext => ext !== 'mp4');

module.exports = config;