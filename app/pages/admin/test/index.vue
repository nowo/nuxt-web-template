<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    title: '测试首页',
    icon: 'i-ep-menu',
    sort: 99,
})

const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
}

const list = ref(['https://cjh-ticket.cdn.bcebos.com/100p0q000000g9yl7EA0C.jpg'])

const onChange = () => {
    // list.value = ['']

    list.value = ['https://files.codelife.cc/website/tmall.svg', 'https://files.codelife.cc/website/bilibili2.svg']
}

const img = ref('')
watchEffect(() => {
    // console.log('watch list :>> ', list.value)
    // console.log('watch list :>> ', img.value)
})
</script>

<template>
    <LayoutBox>
        测试{{ item }}
        <el-button @click="onChange">
            更换
        </el-button>

        list-type="text" disabled
        <CoUploadPhoto v-model="list" :limit="9" drag multiple list-type="text" class="show-box1" />
        <CoUploadPhoto v-model="img" :limit="1" />
        <!-- <template #tip>上传提示信息</template> -->
    </LayoutBox>
</template>
