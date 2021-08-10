import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  Blibli: () => import('../..\\components\\Blibli\\Index.vue' /* webpackChunkName: "components/blibli" */).then(c => wrapFunctional(c.default || c)),
  CommentContent: () => import('../..\\components\\Comment\\Content.vue' /* webpackChunkName: "components/comment-content" */).then(c => wrapFunctional(c.default || c)),
  Comment: () => import('../..\\components\\Comment\\Index.vue' /* webpackChunkName: "components/comment" */).then(c => wrapFunctional(c.default || c)),
  Empty: () => import('../..\\components\\Empty\\Index.vue' /* webpackChunkName: "components/empty" */).then(c => wrapFunctional(c.default || c)),
  Copyright: () => import('../..\\components\\Copyright\\Index.vue' /* webpackChunkName: "components/copyright" */).then(c => wrapFunctional(c.default || c)),
  Card: () => import('../..\\components\\Card\\Index.vue' /* webpackChunkName: "components/card" */).then(c => wrapFunctional(c.default || c)),
  Footer: () => import('../..\\components\\Footer\\Index.vue' /* webpackChunkName: "components/footer" */).then(c => wrapFunctional(c.default || c)),
  Github: () => import('../..\\components\\Github\\Index.vue' /* webpackChunkName: "components/github" */).then(c => wrapFunctional(c.default || c)),
  Header: () => import('../..\\components\\Header\\Index.vue' /* webpackChunkName: "components/header" */).then(c => wrapFunctional(c.default || c)),
  HeaderNav: () => import('../..\\components\\Header\\Nav.vue' /* webpackChunkName: "components/header-nav" */).then(c => wrapFunctional(c.default || c)),
  KeletonScreen: () => import('../..\\components\\KeletonScreen\\Index.vue' /* webpackChunkName: "components/keleton-screen" */).then(c => wrapFunctional(c.default || c)),
  Link: () => import('../..\\components\\Link\\Index.vue' /* webpackChunkName: "components/link" */).then(c => wrapFunctional(c.default || c)),
  Loader: () => import('../..\\components\\Loader\\Index.vue' /* webpackChunkName: "components/loader" */).then(c => wrapFunctional(c.default || c)),
  Music: () => import('../..\\components\\Music\\Index.vue' /* webpackChunkName: "components/music" */).then(c => wrapFunctional(c.default || c)),
  Search: () => import('../..\\components\\Search\\Index.vue' /* webpackChunkName: "components/search" */).then(c => wrapFunctional(c.default || c)),
  Sidebar: () => import('../..\\components\\Sidebar\\Index.vue' /* webpackChunkName: "components/sidebar" */).then(c => wrapFunctional(c.default || c)),
  Toast: () => import('../..\\components\\Toast\\Index.vue' /* webpackChunkName: "components/toast" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
