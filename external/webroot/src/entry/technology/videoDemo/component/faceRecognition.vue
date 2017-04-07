<template>
    <div>
        <div v-for="datum in data" class="face-item">
            <div class="face-name">{{datum.face}}</div>
            <div class="face-show-second">
                <div v-for="second in datum.timestampInSecond" class="face-time-sec">
                    {{second|formatTime}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import formatTime from '../mixin/formatTime';

    export default {
        mixins: [formatTime],
        props: {
            data: Array,
            second: Number
        }
    }
</script>

<style lang="less">
    .face-item {
        font-size: 0;
        color: #666;
    }

    .face-name,
    .face-show-second {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        vertical-align: top;
    }

    .face-name {
        width: 75px;
        text-align: center;
        font-size: 12px;
    }

    .face-show-second {
        // TODO 30px是为滚动条预留的，未来更改布局，删除这块
        max-width: 578px - 75px - 35px;
        word-break: break-all;
        white-space: nowrap;
        font-size: 0;
    }

    .face-time-sec {
        display: inline-block;
        width: 35px;
        font-size: 12px;
    }
</style>
