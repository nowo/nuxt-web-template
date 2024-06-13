import 'vue-router'

import type { GlobalComponents } from '@vue/runtime-core'

// import type { GlobalComponents } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import type { FormItemProps, InputProps, TableColumnCtx } from 'element-plus'

declare global {
    type ComponentInstance = {
        [Property in keyof GlobalComponents]: InstanceType<GlobalComponents[Property]>
    }
    interface RouteRecordItem extends RouteRecordRaw {

    }
    type RouteRecordCustom = RouteRecordRaw

    type CoTableColumnCtx<T> = Partial<TableColumnCtx<T>>

    type CoSearchDataColumnItem<T = any> = Partial<FormItemProps> & {
        prop: keyof T
    }

    type CoSearchDataColumnValueType = {
        type: 'text' // 文本框
        props: Partial<InputProps>
    } | {
        type: 1
    }
    // | {
    //     type: 'number' // 数字输入框
    //     props: Partial<InputNumberProps>
    // }
    // | {
    //     type: 'timePicker' //   时间选择器
    //     props: Partial<TimePickerDefaultProps>
    // }  | {
    //     type: DatePickType // 日期选择器
    //     props: Partial<DatePickerProps>
    // } | {
    //     type: 'cascader' // 级联选择器
    //     // props: Partial<ExtractPropTypes<typeof cascaderProps>>
    //     // props: Partial<CascaderProps> // TODO 此类型非组件类型
    //     props: { props?: CascaderProps } & Record<string, any>
    // }

}

declare module '#app' {
    interface PageMeta {
        title?: string // 页面标题、名称
        sort?: number // 排序
        isHide?: boolean // 是否隐藏此路由 false
        icon?: string // 菜单图标

        isKeepAlive?: 0 | 1 | boolean // 是否缓存组件状态         true
        isAffix?: boolean // 是否固定在标签栏

        permissionList?: {
            // Record<PermissionType,string> 
            [K in PermissionType]?:string
        },// 页面所有权限功能数据
        permissionCode?: PermissionType[] // 允许的权限码
    }
}

// declare module 'vue-router' {
//     interface TypesConfig {
//         RouteParams: Record<string, string>
//         RouteParamsRaw: Record<string, string>
//     }
// }

declare module 'h3' {
    interface H3EventContext {
        // prisma: PrismaClient
        user?: ILoginUserInfo | false
    }
}

// 当增强类型时，始终确保导入/导出某些内容
export { }
