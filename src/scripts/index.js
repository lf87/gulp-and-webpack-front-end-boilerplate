/*
 * @title App
 * @description Application entry point
 */
import {Cat, Dog} from './partial'

const myCat = new Cat('Spike')
console.log('Cat name:', myCat.meow())

const myDog = new Dog('Stanley', 'Labrador')
console.log('Dog name and breed:', myDog.bark())
