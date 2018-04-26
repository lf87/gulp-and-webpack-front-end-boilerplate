// partial.js
export class Cat {
  constructor(name) {
    this.name = name
  }
  meow() {
    return `${this.name}`
  }
}

export class Dog {
  constructor(name, breed) {
    this.name = name
    this.breed = breed
  }
  bark() {
    return `${this.name} is a ${this.breed}`
  }
}
