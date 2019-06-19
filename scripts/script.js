// spark-ar script-only pixelate shader - Andrea Bovo <spleen666@gmail.com>

// requires
const Materials = require('Materials');
const Textures = require('Textures');
const Patches = require('Patches');
const Shaders = require('Shaders');
const R = require('Reactive');

// settings
const defaultMaterial0 = Materials.get('defaultMaterial0');
// get camera shader signal
const cameraColor = Textures.get('cameraTex').signal;
// get per-fragment uv
const uvCoords = Shaders.fragmentStage(Shaders.vertexAttribute({ variableName: Shaders.VertexAttribute.TEX_COORDS }));
// get screenSize from patch
const screenSize = Patches.getPoint2DValue('screenSize');
// get resolution
const res = R.pack2(screenSize.x, screenSize.y);

// pixelate part
const pixelSize = R.pack2(30, 30);
const tileX = R.div(pixelSize.x, res.x);
const tileY = R.div(pixelSize.y, res.y);

// create pixelated uv
const newUV = R.pack2(
  tileX.mul(R.floor(R.div(uvCoords.x, tileX))),
  tileY.mul(R.floor(R.div(uvCoords.y, tileY)))
);

// sampling texture color at uv coords
const color = Shaders.textureSampler(cameraColor, newUV);
// Assign the shader signal to the texture slot
defaultMaterial0.setTexture(color, { textureSlotName: Shaders.DefaultMaterialTextures.DIFFUSE });