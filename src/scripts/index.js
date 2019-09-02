/*
 * @title App
 * @description Application entry point
 */
import ServiceWorker from './ServiceWorker'

window.addEventListener('load', function () {
  // If removing the service worker, then don't forget to remove from the webpack config as well
  new ServiceWorker()
})
