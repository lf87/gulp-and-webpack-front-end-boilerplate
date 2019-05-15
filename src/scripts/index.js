/*
 * @title App
 * @description Application entry point
 */
// import ServiceWorker from './ServiceWorker'
import Intro from './app/intro'

window.addEventListener('load', function () {
  // new ServiceWorker()
  new Intro('.intro')
})
