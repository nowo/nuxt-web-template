<script lang="ts" setup>
import type { Admin, Product } from '@prisma/client'
import type { FormRules } from 'element-plus'

// define
definePageMeta({
    layout: 'admin',
    title: '模型设置',
    icon: 'i-ep-cpu',
    sort: 999,
    isHide: !import.meta.dev,
    validate: () => {
        return import.meta.dev
    },
})

// form表单数据类型
interface FormSearchData {
    account: '' // 账号
    title: '' // 标题

    time: DateRangeType // 时间范围
    state: '' // 状态：1：启用，0：禁用
}

const searchData = reactive<CoFormToolProps<FormSearchData>>({
    data: {
        account: '', // 账号
        title: '', // 标题
        time: ['', ''] as DateRangeType, // 时间范围
        state: '', // 状态：1：未审核，2：已审核
    },
    config: [
        { column: { label: '标题名称', prop: 'title' }, placeholder: '', width: '160' },
        { column: { label: '账号', prop: 'account' }, placeholder: '', width: '160' },
        { column: { label: '状态', prop: 'state' }, placeholder: '', width: '100' },
        { column: { label: '日期范围', prop: 'time' } },
    ],
    hideBtn: false,
    // showAll: true,
})

const rules = reactive<FormRules>({
    money: [],
})

const tableData = reactive<CoTableProps<Admin>>({
    data: [],
    tableHeader: [
        { property: 'id', label: 'id', width: '50' },

        { property: 'username', label: '用户名', minWidth: '180' },
        { property: 'account', label: '账号', width: '180' },
        { property: 'role', label: '角色名称', width: '130', align: 'center' },
        // { property: 'status姓名', width: '180' },
        { property: 'status', label: '状态', align: 'center', width: '100' },
        { property: 'created_at', label: '创建时间', width: '220' },
        // { property: 'update_at', label: '更新时间', width: '180' },
        // { property: 'remark', label: '备注', width: '180' },
        { property: 'operate', label: '操作', width: '120', align: 'center', fixed: 'right' },

    ],
    pagination: paginationConfig,
    isTool: true,
})

const initTableData = async () => {
    const params: IProductListParams = {
        title: searchData.data.title?.trim() ?? '',
        status: searchData.data.state || '',
        startTime: searchData.data.time?.[0] || '',
        endTime: searchData.data.time?.[1] || '',
        isPage: true,
        page: tableData.pagination.page,
        pageSize: tableData.pagination.pageSize,
    }
    tableData.loading = true
    const res = await useServerFetch<{ list: Product[], total: number }>('/api/v1/model/list', {
        method: 'post',
        body: params,
    })
    tableData.loading = false
    console.warn(res)
    // if (res.code !== 200) return ElMessage.error(res.msg)

    // tableData.data = res.data.list
    // tableData.pagination.total = res.data.total || 0
}

// 搜索
const onSearch = () => {
    initTableData()
}

// 重置
const onReset = () => {
    initTableData()
}

// 打开新增、修改
const onOpenDialog = (type: DialogOperate, row?: Admin) => {
    // modalRef.value?.openModal(type, row)
}

initTableData()
</script>

<template>
    <LayoutBox>
        <CoFormTool v-model:option="searchData" :rules="rules" inline @search="onSearch" @reset="onReset">
            <template #state="{ row }">
                <el-select v-model="row.state" filterable clearable>
                    <el-option label="启用" :value="1" />
                    <el-option label="禁用" :value="0" />
                </el-select>
            </template>
            <template #time="{ row }">
                <CoDatePicker v-model="row.time" />
            </template>
            <el-button v-if="checkPermission('add')" type="success" @click="onOpenDialog('add')">
                <el-icon class="i-ep-folder-add mr2px">
                    <!-- <ele-FolderAdd /> -->
                </el-icon>
                新增产品
            </el-button>
        </CoFormTool>
    </LayoutBox>
</template>

<style lang="scss" scoped></style>
