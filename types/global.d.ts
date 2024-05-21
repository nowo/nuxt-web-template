declare module 'element-plus/dist/locale/zh-cn.mjs';





// search搜索项 数据格式公共类型
declare interface CoFormToolProps<T = Record<string, any>> {
    data: T
    // config: {
    //     [key in keyof T]: { label: string, slot?: boolean, placeholder: string, width: string }
    // },
    config: { column: CoSearchDataColumnItem<T>, placeholder?: string, width?: string, isHide?: boolean }[]
    // searchFunc?: () => void,     // 查询方法
    hideBtn?: boolean
    showAll?: boolean
}


// interface TableHeader<T, U> {
//     property: keyof T | 'operate',
//     label: string,
//     slot?: string,
//     [key in U]: U[keyof U];
// }

// // table 数据格式公共类型
// declare interface CoTableType<T = any, U = any> {
//     data: T[],
//     tableHeader: {
//         property: keyof T | 'operate' | '',
//         label: string,
//         slot?: boolean,
//         [key: string]: any;
//     }[],
//     pagination: {
//         total: number,
//         page: number,
//         page_size: number,
//         page_sizes: number[],
//     };
//     loading?: boolean
// }


// type CoTableColumnProperty<T> = keyof T | `${keyof T}Header` | 'operate' | 'operateHeader' | ''

interface CoTableHeader<T> extends CoTableColumnCtx<T> {
    property: keyof T | 'operate' | ''
    // property: CoTableColumnProperty<T>
    label: string
    other?: {
        // slot?: boolean
        slotHeader?: boolean
        isHide?: boolean // 是否隐藏项
        isShow?: boolean // 是否显示字段
    }

}



type CoTableColumnPropertyHeader<T> = `${keyof T}Header` | 'operateHeader'

type CoTableColumnProperty<T> = CoTableHeader<T>['property']

// table 数据格式公共类型
declare interface CoTableProps<T> {
    data: T[]
    // tableHeader: ({
    //     property: CoTableColumnProperty<T>
    //     label: string
    //     slot?: boolean
    //     // [key: string]: any
    // } extends CoTableColumnCtx<T>)[]
    tableHeader: CoTableHeader<T>[]
    pagination: { // 分页
        total: number
        page: number
        page_size: number
        page_sizes: number[]
    }
    isTool?: boolean // 是否显示配置栏
    loading?: boolean // loading
}


/**
 * element-plus,DateTimePicker 日期时间选择器,v-model类型
 */
declare type DateRangeType = [Date, Date] | [string, string]