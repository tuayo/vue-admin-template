// define the router before hook and after hook
import router from './router'
import store from './store'
import NProgress from 'nprogress'

// nprogress init
NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  // start nprogress bar
  NProgress.start()

  // set page title TODO:
  document.title = to.meta.title || 'todo'

  // check login
  const hasToken = 'token-'
  if (hasToken) {
    if (to.path === '/login') {
      // redirect to root
      next({ path: '/' })
      NProgress.done()
    } else {
      // check the roles and add asyncRoutes
      // TODO: 
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const roles = store.getters.roles
          // generate routes
          // 根据路由中role字段判断权限的方式
          // base on router config role
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
  
          // dynamically add accessible routes
          router.addRoute(accessRoutes)
  
          // hack method to ensure that addRoute is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          console.log('>> error:', error)
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // need not auth
      next()
    } else {
      // redirect to login page
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// after
router.afterEach(() => {
  NProgress.done()
})
