<template>
    <div class="demo-cover-result">
        <div class="demo-cover-tip">封面结果</div>
        <div class="demo-video-cover-container">
            <img :src="coverSrc" alt="" class="demo-video-cover">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            coverSrc: String
        }
    }
</script>

<style>
    .demo-cover-result {
        box-sizing: border-box;
        position: relative;
        background-color: #f9f9f9;
        border: 1px solid #e6e6e6;
    }

    .demo-cover-tip {
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 0;
        width: 80px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #c6defa;
        background-color: #e1edfc;
        text-align: center;
        font-size: 12px;
    }

    .demo-video-cover-container {
        position: relative;
        height: 100%;
    }

    .demo-video-cover {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
