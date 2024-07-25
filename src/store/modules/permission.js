import router, {
    authMenuRoute,
    constantRoutes,
    countMenuRoute,
    cpMenuRoute,
    investMenuRoute,
    operateMenuRoute
} from '@/router'
// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const usePermissionStore = defineStore(
    'permission',
    {
        state: () => ({
            routes: [],
            addRoutes: [],
            defaultRoutes: [],
            topbarRouters: [],
            sidebarRouters: []
        }),
        actions: {
            setDefaultRoutes(routes) {
                this.defaultRoutes = constantRoutes.concat(routes)
            },
            setTopbarRoutes(routes) {
                this.topbarRouters = routes
            },
            setSidebarRouters(routes) {
                this.sidebarRouters = routes
            },
            generateRoutes() {
                let routes = []
                const systemName = sessionStorage.getItem('systemName')
                switch (systemName) {
                    case '投放系统':
                        routes = investMenuRoute
                        break
                    case '运营系统':
                        routes = operateMenuRoute
                        break
                    case '统计系统':
                        routes = countMenuRoute
                        break
                    case '权限系统':
                        routes = authMenuRoute
                        break
                    case 'CP系统':
                        routes = cpMenuRoute
                        break
                }
                this.setSidebarRouters(routes)
                this.setDefaultRoutes(routes)
                this.setTopbarRoutes(routes)
            }
        }
    })
export default usePermissionStore
