// 修改密码
declare interface IAdminPasswordUpdate {
    account?: string
    password: string
    newPassword: string
}

/**
 * 管理员列表参数
 */
declare interface IAdminListParams extends IListPage {
    account: string
    username: string
    status: string
}

/**
 * 产品列表查询参数
 */
declare interface IProductListParams extends IListPage {
    title: string

    status: string
}
