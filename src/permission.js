import Progress from 'nprogress'
import router from './router'
import { clearPending } from './plugins/request'

Progress.configure({ showSpinner: false })

router.onReady(() => {
  router.beforeEach((to, from, next) => {
    Progress.start()
    if (!from.path) {
      clearPending()
    }
    // 处理页面 title
    document.title = from.meta?.title || '通用脚手架'
    next()
  })
  router.afterEach(() => {
    Progress.done()
  })
})
