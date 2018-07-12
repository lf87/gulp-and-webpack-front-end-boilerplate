/*
 * @title App
 * @description Application entry point
 */
import ServiceWorker from './ServiceWorker'

window.addEventListener('load', function () {
  new ServiceWorker()
})
