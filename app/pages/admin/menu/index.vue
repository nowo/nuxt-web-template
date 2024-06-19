<script setup lang="ts">
import type { Menu } from '@prisma/client'
import type { FormRules } from 'element-plus'
import { filterTreeList } from '@cooj/utils'
import MenuModal from './components/MenuModal.vue'

definePageMeta({
    layout: 'admin',
    title: '菜单管理',
    icon: 'i-ep-menu',
    sort: 99,
    permissionList: {
        add: '新增',
        edit: '编辑',
        del: '删除',
        // view: '删除',
        // read: '删除',
    },
})

const modalRef = ref<InstanceType<typeof MenuModal>>()
const stateData = reactive({
    menuList: [] as Menu[], // 用于传递给子组件使用
})

// form表单数据类型
interface FormSearchData {
    title: '' // 标题名称
    href: '' // 路径地址
    time: DateRangeType // 时间范围
    state: '' // 状态：1：启用，2：禁用
}

const searchData = reactive<CoFormToolProps<FormSearchData>>({
    data: {
        title: '', // 标题名称
        href: '', // 路径地址
        time: ['', ''] as DateRangeType, // 时间范围
        state: '', // 状态：1：未审核，2：已审核
    },
    config: [
        { column: { label: '标题名称', prop: 'title' }, placeholder: '', width: '180' },
        { column: { label: '路径地址', prop: 'href' }, placeholder: '', width: '180' },
        // { column: { label: '状态', prop: 'state' }, placeholder: '', width: '100' },
        // { column: { label: '日期范围', prop: 'time' } },
    ],
    hideBtn: false,
    // showAll: true,
})

const rules = reactive<FormRules>({
    money: [],
})

const tableData = reactive<CoTableProps<Menu>>({
    data: [],
    tableHeader: [
        { property: 'id', label: 'id', width: '50' },

        { property: 'title', label: '标题名称', minWidth: '180' },
        { property: 'title_en', label: '标题名称(英文)', minWidth: '180' },
        { property: 'href', label: '路径地址', minWidth: '180' },
        // { property: 'icon', label: '图标', width: '100' },
        { property: 'sort', label: '排序', width: '100' },
        // { property: 'p_id', label: '父级id', width: '100' },
        { property: 'status', label: '是否隐藏', width: '100', align: 'center' },
        { property: 'created_at', label: '创建时间', width: '220' },
        { property: 'operate', label: '操作', width: '120', align: 'center', fixed: 'right' },

    ],
    pagination: paginationConfig,
    isTool: true,
})

const initTableData = async () => {
    const params = {
        // title: searchData.data.title?.trim() ?? '',
        // href: searchData.data.href?.trim() ?? '',
        isPage: false,
    }
    tableData.loading = true
    const res = await useServerFetch<{ list: Menu[], total: number }>('/api/v1/menu/list', {
        method: 'post',
        body: params,
    })
    tableData.loading = false

    if (res.code !== 200) return ElMessage.error(res.msg)

    const listData = res.data.list
    if (searchData.data.title) {
        // 属性数据模糊查询
        tableData.data = filterTreeList(listData, searchData.data.title, 'title')
    } else {
        tableData.data = res.data.list
    }

    tableData.pagination.total = listData.length

    // tableData.data = res.data.list
    // tableData.pagination.total = res.data.total || 0
    if (!stateData.menuList.length) stateData.menuList = res.data.list
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
const onOpenDialog = (type: DialogOperate, row?: Menu) => {
    modalRef.value?.openModal(type, row)
}

// 删除菜单
const onDel = (row: Menu) => {
    ElMessageBox.confirm(`此操作将永久删除该条内容，是否继续?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        buttonSize: 'default',
    }).then(async () => {
        const res = await useServerFetch('/api/v1/menu/delete', {
            method: 'post',
            body: { id: row.id },
        })
        if (res.code !== 200) return ElMessage.error(res.msg)

        ElMessage.success('删除成功')

        initTableData() // 重新加载列表
    }).catch(() => { })
}

initTableData()
</script>

<template>
    <LayoutBox>
        <CoFormTool v-model:option="searchData" :rules="rules" inline @search="onSearch" @reset="onReset">
            <template #state="{ row }">
                <el-select v-model="row.state" filterable clearable>
                    <el-option label="启用" :value="1" />
                    <el-option label="禁用" :value="2" />
                </el-select>
            </template>
            <template #time="{ row }">
                <CoDatePicker v-model="row.time" />
            </template>
            <el-button v-if="checkPermission('add')" type="success" @click="onOpenDialog('add')">
                <el-icon class="i-ep-folder-add mr2px" />
                新增菜单
            </el-button>
        </CoFormTool>
        <CoTable v-model:option="tableData" auto-height border @refresh="initTableData">
            <template #status="{ row }">
                <el-tag v-if="row.status" type="primary">
                    显示
                </el-tag>
                <el-tag v-else type="info">
                    隐藏
                </el-tag>
            </template>
            <template #operate="{ row }">
                <el-button v-if="checkPermission('edit')" type="primary" link @click="onOpenDialog('edit', row)">
                    修改
                </el-button>
                <el-button v-if="checkPermission('del')" type="danger" link @click="onDel(row)">
                    删除
                </el-button>
            </template>
        </CoTable>
        <client-only>
            <MenuModal ref="modalRef" :data="stateData.menuList" @update="initTableData" />
        </client-only>
    </LayoutBox>
</template>
