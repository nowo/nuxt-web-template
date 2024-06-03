<script lang="ts" setup>
import type { UploadFile, UploadInstance, UploadFiles, UploadProps, UploadUserFile, UploadRequestHandler, UploadRawFile } from 'element-plus'
import { ElMessage, genFileId } from 'element-plus'
import { computed, reactive, watch } from 'vue'

const props = defineProps<{
    modelValue: string[] // 图片数组
}>()

const emits = defineEmits<{
    (e: 'update:modelValue', param: string[]): void
}>()

const uploadRef = ref<UploadInstance>()
// 图片预览控制项
const imageState = reactive({
    viewer: false, // 是否显示预览
    index: 0, // 当前预览图片索引
    fileLength: 0, // 图片数量
})

const attrs = useAttrs()

// upload组件默认传值
const propsAttr = reactive<Partial<UploadProps>>({
    // autoUpload: false, // 不自动上传
    listType: 'picture-card',
    // 'multiple': true, // 是否支持多选文件
    limit: 1, // 最大允许上传个数
    accept: 'image/*', // 文件类型
    action: '/', // 上传地址
    ...attrs
})


const uploadList = computed({
    get() {
        // 过滤掉空值
        const list = props.modelValue.filter(item => !!item).map((item) => {
            const dat: UploadUserFile = { name: item, url: item, status: 'success' }
            return dat
        })
        // 数量超出limit限制时
        const limit = Number(attrs.limit) || propsAttr.limit || 1
        return list.length > limit ? list.slice(0, limit) : list
    },
    set(val) {
        // props.modelValue = val
    },
})
// const uploadList = ref<UploadUserFile[]>([])

// const initData=()=>{
//     const list = props.modelValue.filter(item => !!item).map((item) => {
//             const dat: UploadUserFile = { name: item, url: item, status: 'success' }
//             return dat
//         })
//         // 数量超出limit限制时
//         const limit = Number(attrs.limit) || propsAttr.limit || 1
//         // imageState.fileLength = list.length > limit ? limit : list.length
//         uploadList.value= list.length > limit ? list.slice(0, limit) : list
// }

// 是否隐藏添加图标
const isHideIcon = computed(() => {
    console.log(attrs)
    // 禁用时不显示添加图标
    if ('disabled' in attrs) return true
    // 已达到上传个数时不显示添加图标
    const limit = Number(attrs.limit) || propsAttr.limit || 1
    const list = uploadList.value.filter(item => !!item)
    return list.length >= limit ? true : false
})
// 更新父组件值
const emitsUpdate = (val?: string[]) => {
    const fileList = uploadList.value.filter(item => item.status === 'success').map(item => item.url as string)
    emits('update:modelValue', val || fileList)
}

/**
 * 上传图片方法,配合下面的onUploadSuccess一起使用
 */
const onUploadFile: UploadRequestHandler = async (options) => {
    // console.log('options :>> ', options);

    const formData = new FormData()
    formData.append('file', options.file)
    const res = await useServerFetch<{ src: string, list: string[] }>('/api/v1/file/upload', {
        method: 'POST',
        body: formData,
    })
    return res

}
// 上传成功操作,更新数据，去除前端预览的blob地址
const onUploadSuccess: UploadProps['onSuccess'] = async (response, file, files) => {
    console.log(response, file, files)
    // 只有所有都上传成功了才处理
    const isSuccess = files.every(it => it.status === 'success')
    // console.log('isSuccess :>> ', isSuccess);
    if (!isSuccess) return
    // console.log('uploadList.value :>> ', uploadList.value);
    files.forEach(item => {
        //只取携带response的才是刚上传的
        const resData = item.response as { code: number, data: { src: string }, msg: string }
        if (resData) {
            if (resData.code === 200) { //成功上传
                item.url = resData.data.src
                uploadList.value.push(item);
            } else {  //失败上传
                ElMessage.error(resData.msg)
            }
        }
    })
    emitsUpdate()

}



// 移除图片
const onImageRemove = (file: UploadFile) => {
    // 这里可以调用删除接口，删除图片
    // const res = useServerFetch('/api/v1/file/delete')

    emitsUpdate()
}

// 图片预览
const onImgPreview = (file: UploadFile) => {
    // console.log('file :>> ', file)

    const findIndex = props.modelValue?.findIndex(item => item === file.url)
    imageState.index = findIndex && findIndex >= 0 ? findIndex : 0
    imageState.viewer = true
}
// 关闭图片预览
const closeView = () => {
    imageState.viewer = false
}

</script>

<template>

    <el-upload v-bind="propsAttr" ref="uploadRef" class="upload-box"
        :class="{ 'upload-hide-add': isHideIcon }" v-model:file-list="uploadList"
        :on-preview="onImgPreview" :on-remove="onImageRemove" :http-request="onUploadFile" :on-success="onUploadSuccess"
        >
        <slot v-if="$slots['default']" />
        <el-icon v-else-if="propsAttr.listType === 'picture-card'||propsAttr.listType === 'picture'" class="i-ep-plus">
            <!-- <ele-Plus /> -->
        </el-icon>
    </el-upload>
    <el-image-viewer v-if="imageState.viewer" :url-list="props.modelValue" :z-index="10000"
        :initial-index="imageState.index" teleported @close="closeView" />

</template>

<style lang="scss" scoped>
.upload-box {
    :deep() {
        .el-upload.el-upload--picture-card {
            transition: all 0.8s;
            transform-origin: left;
        }
    }

    &.upload-hide-add {
        :deep() {
            .el-upload.el-upload--picture-card {
                transform: translateX(-100%);
                z-index: -1000;
                width: 0px;
                border: 0;
            }
            .el-upload.el-upload--picture{
                opacity: 0.5;
                pointer-events: none;
            }
        }
    }
}

</style>
