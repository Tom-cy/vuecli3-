const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  assessedRoutes: state => state.permission.routes
}

export default getters
