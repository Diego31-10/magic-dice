const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Agregar extensiones de assets 3D
config.resolver.assetExts.push(
  'glb',
  'gltf',
  'obj',
  'mtl',
  'fbx'
);

module.exports = config;