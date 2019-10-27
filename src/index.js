// spark-ar script-only pixelate shader
// Andrea Bovo < spleen666@gmail.com>

// import

import Simple1DNoise from './noise1d'

const sn = new Simple1DNoise()
const MersenneTwister = require('mersenne-twister')
const mg = new MersenneTwister()

// spark-ar modules
const Materials = require('Materials')
const Textures = require('Textures')
const Patches = require('Patches')
const Time = require('Time')
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
const time = Patches.getScalarValue('time')
// get resolution
const res = R.pack2(CameraInfo.previewSize.width, CameraInfo.previewSize.height)
// pixelate with randomize
const pixelSize = R.pack2(
  R.sin(time).mul(10 * sn.getValue(mg.random())).add(10),
  R.cos(time).mul(10 * sn.getValue(mg.random())).add(10)
)
const tileX = R.div(pixelSize.x, res.x)
const tileY = R.div(pixelSize.y, res.y)
const newUV = R.pack2(tileX.mul(R.floor(R.div(uv.x, tileX))), tileY.mul(R.floor(R.div(uv.y, tileY))))
// sampling texture color at uv coords
const finalColor = Shaders.textureSampler(cameraColor, newUV )
// Assign the shader signal to the texture slot
faceCameraMaterial.setTexture(finalColor, { textureSlotName: Shaders.DefaultMaterialTextures.DIFFUSE })
