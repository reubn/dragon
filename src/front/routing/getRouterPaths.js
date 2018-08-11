import routes from './routes'

export default routesData => [
  ...routes.reduce((urls, route) => [...urls, ...(route.dataSource ? (route.dataSource(routesData) || []).map(route.pathCreator) : [route.path])], [])
]
