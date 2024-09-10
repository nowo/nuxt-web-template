<script setup lang="ts">
const props = defineProps<{
    data: ISystemFormSeo
    type: LanguageType
}>()

const form = reactive({
    data: props.data,
})
</script>

<template>
    <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <el-form-item prop="seo_title" label="SEO标题：">
            <el-input v-model="form.data.seo_title" maxlength="50" clearable placeholder="网站标题，建议在50字以内" />
        </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <el-form-item prop="seo_keywords" label="SEO关键字：">
            <el-input v-model="form.data.seo_keywords" maxlength="80" clearable placeholder="网站关键词，建议在80字以内，多个可用、隔开" />
        </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <el-form-item prop="seo_description" label="SEO描述：">
            <el-input v-model="form.data.seo_description" type="textarea" maxlength="150" clearable show-word-limit
                placeholder="网站描述内容，建议在150字以内" />
        </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <el-form-item prop="hm_url" label="百度统计代码url地址：">
            <el-input v-model="form.data.hm_url" maxlength="250" clearable placeholder="https://hm.baidu.com/hm.js?xxxxxxxxxxxxxxxxxxx" />
        </el-form-item>
    </el-col>
</template>

<style lang="scss" scoped></style>
