import { defineStore } from "pinia"

export const cachedViewStore = defineStore('cachedRoute', {
  state: () => ({
    cachedRouteList: []
  }),
  actions: {
    // 缓存路由
    addCachedRoute(to) {
      if (this.cachedRouteList.includes(to.name)) {
        return
      }
      
    }
  }
})