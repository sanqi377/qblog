import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d642b90c = () => interopDefault(import('..\\pages\\Article\\_id.vue' /* webpackChunkName: "pages/Article/_id" */))
const _24ef1480 = () => interopDefault(import('..\\pages\\Category\\_path.vue' /* webpackChunkName: "pages/Category/_path" */))
const _2c2546e2 = () => interopDefault(import('..\\pages\\Page\\_path.vue' /* webpackChunkName: "pages/Page/_path" */))
const _b670ff28 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Article/:id?",
    component: _d642b90c,
    name: "Article-id"
  }, {
    path: "/Category/:path?",
    component: _24ef1480,
    name: "Category-path"
  }, {
    path: "/Page/:path?",
    component: _2c2546e2,
    name: "Page-path"
  }, {
    path: "/",
    component: _b670ff28,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
