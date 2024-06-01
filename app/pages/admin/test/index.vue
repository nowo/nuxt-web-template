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

const list = ref('')
</script>

<template>
    <LayoutBox>
        测试{{ item }}
        <CoUploadPhoto />

        <ul class="el-upload-list el-upload-list--picture-card">
            <li class="el-upload-list__item is-success" tabindex="0" style="">
                <img class="el-upload-list__item-thumbnail"
                    src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                    alt=""><!-- v-if -->
                <label class="el-upload-list__item-status-label">
                    <i class="el-icon el-icon--upload-success el-icon--check">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                            <path fill="currentColor"
                                d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z" />
                        </svg></i>
                </label>
                <i class="el-icon el-icon--close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                        <path fill="currentColor"
                            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
                    </svg></i><!-- Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn --><!-- This is a bug which needs to be fixed --><!-- TODO: Fix the incorrect navigation interaction -->
                <i class="el-icon--close-tip">press delete to remove</i>
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview">
                        <el-icon class="i-ep-zoom-in" />
                        <!-- <i class="el-icon el-icon--zoom-in"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                            <path fill="currentColor"
                                d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704m-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64z" />
                        </svg></i> -->
                    </span>
                    <span class="el-upload-list__item-delete">
                        <el-icon class="i-ep-delete" />
                        <!-- <i class="el-icon el-icon--delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                            <path fill="currentColor"
                                d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32" />
                        </svg></i> -->
                    </span>
                </span>
            </li>
            <li class="el-upload-list__item is-success" tabindex="0" style="">
                <img class="el-upload-list__item-thumbnail"
                    src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                    alt=""><!-- v-if --><label class="el-upload-list__item-status-label"><i
                    class="el-icon el-icon--upload-success el-icon--check"><svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z" />
                </svg></i></label><i class="el-icon el-icon--close"><svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
                </svg></i><!-- Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn --><!-- This is a bug which needs to be fixed --><!-- TODO: Fix the incorrect navigation interaction --><i
                    class="el-icon--close-tip">press delete to remove</i><span
                    class="el-upload-list__item-actions"><span class="el-upload-list__item-preview"><i
                    class="el-icon el-icon--zoom-in"><svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704m-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64z" />
                </svg></i></span><span class="el-upload-list__item-delete"><i
                    class="el-icon el-icon--delete"><svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32" />
                </svg></i></span></span>
            </li>
            <div class="el-upload el-upload--picture-card">
                <el-icon class="i-ep-plus" />
            </div>
        </ul>
        <!-- <el-upload class="upload" action="#" :show-file-list="false" :auto-upload="false">
        </el-upload> -->
    </LayoutBox>
</template>
