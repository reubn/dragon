import router from './routing'

export default app => {
  // Routing
  app.use(router.routes())
}
