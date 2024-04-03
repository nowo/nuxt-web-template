export default defineNuxtRouteMiddleware(to => {
    console.log(to)

    if (to.path.startsWith(appAdminPath)) {   // admin页面使用slide-right过渡
        to.meta.pageTransition = { name: 'slide-right', mode: 'out-in' }
    }

    // if (!document.startViewTransition) { return }

    // // 禁用内置的Vue过渡效果
    // to.meta.pageTransition = false
    // to.meta.layoutTransition = false
})
