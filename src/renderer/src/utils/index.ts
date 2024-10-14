import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'

type Query = {
  [propName: string]: any
}

type PageRouteConfigResultType = {
  route: RouteLocationNormalizedLoaded
  router: Router
} & Query
type PageRouteConfigType = (param?: string | Array<string>) => PageRouteConfigResultType

export const PageRouteConfig: PageRouteConfigType = (param: string | Array<string> = []) => {
  const route = useRoute()
  const router = useRouter()
  const query: Query = {}
  if (typeof param === 'string') {
    query[param] = computed(() => route.query[param])
  }

  if (param instanceof Array) {
    param.forEach((p) => {
      query[p] = computed(() => route.query[p])
    })
  }

  return {
    router,
    route,
    ...query
  }
}
