import 'vue-router'



declare module '#app' {
    interface PageMeta {
        title?: string // 页面标题、名称
        sort?: number    // 排序
        isHide?: boolean // 是否隐藏此路由 false
        icon?: string // 菜单图标

        isKeepAlive?: 0 | 1 | boolean // 是否缓存组件状态         true
    }
}


// 当增强类型时，始终确保导入/导出某些内容
export { }