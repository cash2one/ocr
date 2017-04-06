<template>
    <div class="video-tag-container">
        <div class="video-tag-heading">输出TAG</div>
        <div class="video-tag-box">
            <div v-for="tag in tags" class="video-tag">{{tag}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            tags: Array
        }
    }
</script>

<style>
    .video-tag-container {
        box-sizing: border-box;
        margin-top: 8px;
        border: 1px solid #f6f6f6;
    }

    .video-tag-heading {
        box-sizing: border-box;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        border-bottom: 1px solid #f6f6f6;
        font-size: 12px;
    }

    .video-tag-box {
        box-sizing: border-box;
        height: 101px;
        padding: 10px 20px;
        overflow: auto;
        font-size: 0;
    }

    .video-tag {
        display: inline-block;
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 5px 25px;
        vertical-align: top;
        font-size: 12px;
        background-color: #f1f1f1;
        color: #007afb;
    }
</style>
