import { createRouter, createWebHashHistory } from 'vue-router';
import routes from "./routes"
import NProgress  from "@/utils/progress"

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
});