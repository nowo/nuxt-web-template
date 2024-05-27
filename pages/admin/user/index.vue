<script setup lang="ts">
import type { FormRules } from 'element-plus'

definePageMeta({
    layout: 'admin',
    title: '系统用户',
    icon: 'i-ep-user',
    sort: 10,
})

// form表单数据类型
interface FormSearchData {
    company_id: '' // 公司id
    custom: '' // 客户名称
    check_group_id: number[] // 分组id
    bill_number: ''
    type: ''
    time: DateRangeType // 时间范围
    state: '' // 状态：1：未审核，2：已审核
    sale_id: '' // 经手人
    admin_id: '' // 制单人
    money: string | number // 收付款金额
    remark: '' // 备注
}

const searchData = reactive<CoFormToolProps<FormSearchData>>({
    data: {
        company_id: '', // 公司id
        custom: '', // 仓库名称
        check_group_id: [], // 分组id
        bill_number: '',
        type: '',
        time: ['', ''] as DateRangeType, // 时间范围
        state: '', // 状态：1：未审核，2：已审核
        admin_id: '',
        sale_id: '',
        money: '',
        remark: '',
    },
    config: [
        { column: { label: '公司名称', prop: 'company_id' }, placeholder: '', width: '310' },
        { column: { label: '客户分组', prop: 'check_group_id' }, placeholder: '', width: '330' },
        { column: { label: '客户', prop: 'custom' }, placeholder: '', width: '430' },
        { column: { label: '单据编号', prop: 'bill_number' }, placeholder: '请输入单据编号', width: '180' },
        { column: { label: '备注', prop: 'remark' }, placeholder: '请输入备注', width: '180' },
        { column: { label: '制单人', prop: 'admin_id' }, placeholder: '', width: '100' },
        { column: { label: '经手人', prop: 'sale_id' }, placeholder: '', width: '100' },
        { column: { label: '收款金额', prop: 'money' }, placeholder: '', width: '110' },
        { column: { label: '单据状态', prop: 'state' }, placeholder: '', width: '100' },
        { column: { label: '日期范围', prop: 'time' } },
    ],
    hideBtn: false,
    // showAll: true,
})

const rules = reactive<FormRules>({
    money: [],
})

interface IUserListItem { date: string, name: string, address: string }
const item: IUserListItem = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
}
const dat = Array.from<IUserListItem>({ length: 30 }).map((s, i) => {
    return {
        ...item,
        date: `${item.date + i}`,
    }
})

const tableData = reactive<CoTableProps<IUserListItem>>({
    data: dat,
    tableHeader: [
        { property: 'date', label: '日期', width: '180' },
        { property: 'name', label: '姓名', width: '180' },
        { property: 'address', label: '地址' },
        // { property: 'tag', label: '标签' },
    ],
    pagination: paginationConfig,
    isTool: true,
})

// 搜索
const onSearch = () => {

}

// 重置
const onReset = () => {

}
</script>

<template>
    <LayoutBox>
        <CoFormTool v-model:option="searchData" :rules="rules" inline @submit="onSearch" @reset="onReset">
            <template #admin_id="{ row }">
                <el-select v-model="row.admin_id" filterable clearable>
                    <!-- <el-option v-for="item in defData.userList" :key="item.id" :label="item.realname" :value="item.id" /> -->
                </el-select>
            </template>
            <template #time="{ row }">
                <CoDatePicker v-model="row.time" />
            </template>
        </CoFormTool>
        <CoTable v-model:option="tableData" auto-height border>
            <template #nameHeader>
                表头111
            </template>
        </CoTable>
    </LayoutBox>
</template>
