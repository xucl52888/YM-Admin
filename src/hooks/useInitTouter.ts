import router from '@/router'
import { cloneDeep } from 'lodash-es'
import { Parent } from '@/interface/user'
import { useMenuStore } from '@/store/useMenuStore'

interface Child {
  parentView: string
  path: string
  name: string
  meta: any
  redirect: string
  children?: Child[] | null
  component: any
  id?: string | undefined
  hidden?: boolean | undefined
  alwaysShow?: boolean | undefined
  query?: string | undefined
}

interface Child extends Omit<Parent, 'children'> {
  children?: Child[] | null
}

// 1. 动态添加路由 => 整个过程
export const initRouter = () => {
  let menu: Parent[] = useMenuStore().getMenu //获取菜单
  let menuRouter: Child[] = filterRouter(menu) //过滤路由
  menuRouter = flatRoutes(menuRouter) //扁平化路由
  menuRouter.forEach((item: any) => {
    // 如果父级是layout，则添加到layout下，否则添加到根路由下
    router.addRoute(item.parentView == 'layout' ? 'layout' : '', item)
  })
}

// 2. 把component 重构成 箭头函数的形式
const filterRouter = (menu: Parent[]): Child[] => {
  let arrRouter: Child[] = []
  menu.forEach((item: any) => {
    var route: Child = {
      name: item.name,
      path: item.path.includes('/') ? item.path : item.path,
      parentView: item.parentView,
      meta: item.meta,
      redirect: item.redirect,
      children: item.children ? filterRouter(item.children) : null,
      component: loadComponent(item.component),
    }
    arrRouter.push(route)
  })
  return arrRouter
}
// 3. 对于component的调整
const modules: Record<string, () => Promise<any>> = import.meta.glob('@/views/**/*.vue')
const modulesMap: Record<string, () => Promise<any>> = {}
Object.keys(modules).forEach((key) => {
  const componentName = key.replace('/src/views', '').replace('.vue', '').replace('/index', '').replace('/', '')

  if (key.includes('index')) {
    modulesMap[`${componentName}/index`] = modules[key]
  }
  modulesMap[componentName] = modules[key]
})

// 4. 根据modulesMap[key]返回对应的value值
const loadComponent = (component: string | null): (() => Promise<any>) | undefined => {
  if (component) {
    return modulesMap[component]
  }
  return modulesMap['home']
}

// 5. 路由扁平化
const flatRoutes = (routes: Child[], breadcrumb: Child[] = []): Child[] => {
  let res: Child[] = []
  //深度复制对象，并处理循环引用
  const cloneRoutes = cloneDeep(routes)
  cloneRoutes.forEach((route: Child) => {
    const tmp = { ...route }
    if (tmp.children) {
      let childrenBreadcrumb: Child[] = [...breadcrumb]
      childrenBreadcrumb.push(route)
      let tmpRoute = { ...route }
      tmpRoute.meta.breadcrumb = childrenBreadcrumb
      delete tmpRoute.children
      res.push(tmpRoute)
      let childrenRoutes = flatRoutes(tmp.children, childrenBreadcrumb)
      childrenRoutes.map((item) => {
        res.push(item)
      })
    } else {
      let tmpBreadcrumb = [...breadcrumb]
      tmp.meta.breadcrumb = tmpBreadcrumb
      tmpBreadcrumb.push(tmp)
      res.push(tmp)
    }
  })
  return res
}
