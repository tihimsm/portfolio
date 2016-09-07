Sun = function() {
  this.material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  this.geometry = new THREE.SphereGeometry(109, 64, 64);
  this._mesh = new THREE.Mesh(this.geometry, this.material);
}

Sun.prototype = {
  constractor: Sun,
  get mesh() {
    return this._mesh;
  }
}

var sun = new Sun();
scene.add(sun.mesh);

Planet = function(radiusRate, orbitalRadiusRate, color, omegaRate) {
  this.radiusBase = 4;
  this.orbitalRadiusBase = 400;
  this.radiusRate = radiusRate !== undefined ? radiusRate : 1.0
  this.orbitalRadiusRate = orbitalRadiusRate !== undefined ? orbitalRadiusRate : 1.0;
  this.color = color !== undefined ? color : 0x0000ff;
  this._omegaRate = omegaRate !== undefined ? omegaRate : 1;

  this._material = new THREE.MeshPhongMaterial({ color: this.color });
  this._geometry = new THREE.SphereGeometry(this.radiusBase * this.radiusRate, 64, 64);
  this._mesh = new THREE.Mesh(this._geometry, this._material);
  this._mesh.position.x = - this.orbitRadiusBase * this.orbitalRadiusRate;
  this._mesh.position.z = - this.orbitRadiusBase * this.orbitalRadiusRate;

  this._circleGeometry = new THREE.CircleGeometry(this.orbitalRadiusBase * this.orbitalRadiusRate, 2560);
  this._circleGeometry.vertices.shift();
  this._circleMaterial = new THREE.LineBasicMaterial({
    color: 0x111111
    // opacity: 0.1
    // linewidth: 0.01
  });
  this._circle = new THREE.Line(this._circleGeometry, this._circleMaterial);
  this._circle.rotation.x = 90 * Math.PI / 180;
};

Planet.prototype = {
  constractor: Planet,
  get material () {
    return this._material;
  },
  get geometry () {
    return this._geometry;
  },
  get mesh () {
    return this._mesh;
  },
  get circle() {
    return this._circle;
  },
  pivot: function(time) {
    var theta = 1.047 / this._omegaRate * time;
    this._mesh.position.x = Math.cos(theta) * this.orbitalRadiusBase * this.orbitalRadiusRate;
    this._mesh.position.z = Math.sin(theta) * this.orbitalRadiusBase * this.orbitalRadiusRate;
  }
};

Earth = function() {
  Planet.call(this, 1.0, 1.0, 0x0000ff, 1.0);
};
Earth.prototype = Object.create(Planet.prototype);

var earth = new Earth();
scene.add(earth.mesh);
scene.add(earth.circle);

// pivot: function(time) {
//     var theta = 1.047 / this._omegaRate * time;
//     this._mesh.position.x = Math.cos(theta) * this.orbitalRadiusBase * this.orbitalRadiusRate;
//     this._mesh.position.z = Math.sin(theta) * this.orbitalRadiusBase * this.orbitalRadiusRate;
//   }