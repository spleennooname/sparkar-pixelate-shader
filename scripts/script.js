// spark-ar script-only pixelate shader - Andrea Bovo <spleen666@gmail.com>

// requires
const Diagnostics = D = console = require('Diagnostics');
const Materials = require('Materials');
const Textures = require('Textures');
const Patches = require('Patches');
const Shaders = require('Shaders');
const R = require('Reactive');

// settings
const defaultMaterial0 = Materials.get('defaultMaterial0');
const cameraColor = Textures.get('cameraTex').signal;
// get per-fragment uv
const uvCoords = Shaders.fragmentStage(Shaders.vertexAttribute({ variableName: Shaders.VertexAttribute.TEX_COORDS }));
// get screenSize via Patch
const screenSize = Patches.getPoint2DValue('screenSize');

const res = R.pack2(screenSize.x, screenSize.y);
const pixelSize = R.pack2(30, 30);

const tileX = R.div(pixelSize.x, res.x);
const tileY = R.div(pixelSize.y, res.y);

const uvPixelated = R.pack2(
  R.mul(tileX, R.floor(R.div(uvCoords.x, tileX))),
  R.mul(tileY, R.floor(R.div(uvCoords.y, tileY)))
);

// sampling texture color at uv coords
let color = Shaders.textureSampler(cameraColor, uvPixelated);
// Assign the shader signal to the texture slot
defaultMaterial0.setTexture(color, { textureSlotName: Shaders.DefaultMaterialTextures.DIFFUSE });