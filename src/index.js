// spark-ar script-only pixelate shader
// Andrea Bovo < spleen666@gmail.com>

// import
const MersenneTwister = require('mersenne-twister')
const mg = new MersenneTwister()

// spark-ar modules
const Materials = require('Materials')
const Textures = require('Textures')
const Patches = require('Patches')
const Shaders = require('Shaders')
const CameraInfo = require('CameraInfo')
const R = require('Reactive')
const console = require('Diagnostics')
// settings
const faceCameraMaterial = Materials.get('faceCameraMaterial')
// get camera shader signal
const cameraColor = Textures.get('cameraTexture').signal
// get per-fragment uv
const uv = Shaders.fragmentStage(Shaders.vertexAttribute({ variableName: Shaders.VertexAttribute.TEX_COORDS }))
// get screenSize from patch
const screenSize = Patches.getPoint2DValue('screenSize')
const time = Patches.getScalarValue('time')
// get resolution
const res = R.pack2(screenSize.x, screenSize.y)

// pixelate
const pixelSize = R.pack2(R.sin(time).mul(10 * mg.random()).add(10), R.cos(time).mul(10 * mg.random()).add(10))
const tileX = R.div(pixelSize.x, res.x)
const tileY = R.div(pixelSize.y, res.y)

// sampling texture color at uv coords
const finalColor = Shaders.textureSampler(cameraColor, R.pack2(tileX.mul(R.floor(R.div(uv.x, tileX))), tileY.mul(R.floor(R.div(uv.y, tileY)))))
// Assign the shader signal to the texture slot
faceCameraMaterial.setTexture(finalColor, { textureSlotName: Shaders.DefaultMaterialTextures.DIFFUSE })
