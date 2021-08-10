import { wrapFunctional } from './utils'

export { default as Blibli } from '../..\\components\\Blibli\\Index.vue'
export { default as Card } from '../..\\components\\Card\\Index.vue'
export { default as CommentContent } from '../..\\components\\Comment\\Content.vue'
export { default as Comment } from '../..\\components\\Comment\\Index.vue'
export { default as Copyright } from '../..\\components\\Copyright\\Index.vue'
export { default as Empty } from '../..\\components\\Empty\\Index.vue'
export { default as Footer } from '../..\\components\\Footer\\Index.vue'
export { default as Github } from '../..\\components\\Github\\Index.vue'
export { default as Header } from '../..\\components\\Header\\Index.vue'
export { default as HeaderNav } from '../..\\components\\Header\\Nav.vue'
export { default as KeletonScreen } from '../..\\components\\KeletonScreen\\Index.vue'
export { default as Link } from '../..\\components\\Link\\Index.vue'
export { default as Loader } from '../..\\components\\Loader\\Index.vue'
export { default as Music } from '../..\\components\\Music\\Index.vue'
export { default as Search } from '../..\\components\\Search\\Index.vue'
export { default as Sidebar } from '../..\\components\\Sidebar\\Index.vue'
export { default as Toast } from '../..\\components\\Toast\\Index.vue'

export const LazyBlibli = import('../..\\components\\Blibli\\Index.vue' /* webpackChunkName: "components/blibli" */).then(c => wrapFunctional(c.default || c))
export const LazyCard = import('../..\\components\\Card\\Index.vue' /* webpackChunkName: "components/card" */).then(c => wrapFunctional(c.default || c))
export const LazyCommentContent = import('../..\\components\\Comment\\Content.vue' /* webpackChunkName: "components/comment-content" */).then(c => wrapFunctional(c.default || c))
export const LazyComment = import('../..\\components\\Comment\\Index.vue' /* webpackChunkName: "components/comment" */).then(c => wrapFunctional(c.default || c))
export const LazyCopyright = import('../..\\components\\Copyright\\Index.vue' /* webpackChunkName: "components/copyright" */).then(c => wrapFunctional(c.default || c))
export const LazyEmpty = import('../..\\components\\Empty\\Index.vue' /* webpackChunkName: "components/empty" */).then(c => wrapFunctional(c.default || c))
export const LazyFooter = import('../..\\components\\Footer\\Index.vue' /* webpackChunkName: "components/footer" */).then(c => wrapFunctional(c.default || c))
export const LazyGithub = import('../..\\components\\Github\\Index.vue' /* webpackChunkName: "components/github" */).then(c => wrapFunctional(c.default || c))
export const LazyHeader = import('../..\\components\\Header\\Index.vue' /* webpackChunkName: "components/header" */).then(c => wrapFunctional(c.default || c))
export const LazyHeaderNav = import('../..\\components\\Header\\Nav.vue' /* webpackChunkName: "components/header-nav" */).then(c => wrapFunctional(c.default || c))
export const LazyKeletonScreen = import('../..\\components\\KeletonScreen\\Index.vue' /* webpackChunkName: "components/keleton-screen" */).then(c => wrapFunctional(c.default || c))
export const LazyLink = import('../..\\components\\Link\\Index.vue' /* webpackChunkName: "components/link" */).then(c => wrapFunctional(c.default || c))
export const LazyLoader = import('../..\\components\\Loader\\Index.vue' /* webpackChunkName: "components/loader" */).then(c => wrapFunctional(c.default || c))
export const LazyMusic = import('../..\\components\\Music\\Index.vue' /* webpackChunkName: "components/music" */).then(c => wrapFunctional(c.default || c))
export const LazySearch = import('../..\\components\\Search\\Index.vue' /* webpackChunkName: "components/search" */).then(c => wrapFunctional(c.default || c))
export const LazySidebar = import('../..\\components\\Sidebar\\Index.vue' /* webpackChunkName: "components/sidebar" */).then(c => wrapFunctional(c.default || c))
export const LazyToast = import('../..\\components\\Toast\\Index.vue' /* webpackChunkName: "components/toast" */).then(c => wrapFunctional(c.default || c))
