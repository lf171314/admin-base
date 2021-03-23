import Progress from 'nprogress'
import router from './router'

Progress.configure({ showSpinner: false })

router.onReady(() => {
  router.beforeEach((to, from, next) => {
    Progress.start()
    next()
  })
  router.afterEach(() => {
    Progress.done()
  })
})
