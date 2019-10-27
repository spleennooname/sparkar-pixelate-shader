//
// https://www.michaelbromley.co.uk/blog/simple-1d-noise-in-javascript/
const MAX_VERTICES = 256
const MAX_VERTICES_MASK = MAX_VERTICES - 1

export default class Simple1DNoise {
  constructor () {
    this.amplitude = 1
    this.scale = 1
    this.r = []
    for (var i = 0; i < MAX_VERTICES; ++i) {
      this.r.push(Math.random())
    }
  }

  lerp (a, b, t) {
    return a * (1 - t) + b * t
  }

  getValue (x) {
    var scaledX = x * this.scale
    var xFloor = Math.floor(scaledX)
    var t = scaledX - xFloor
    var tRemapSmoothstep = t * t * (3 - 2 * t)
    /// Modulo using &#038;
    var xMin = xFloor & MAX_VERTICES_MASK
    var xMax = (xMin + 1) & MAX_VERTICES_MASK
    var y = this.lerp(this.r[xMin], this.r[xMax], tRemapSmoothstep)
    return y * this.amplitude
  }
}
