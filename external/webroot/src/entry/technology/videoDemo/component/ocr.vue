<template>
    <div>
        <div v-for="(datum, index) in sortedData"
             class="ocr-item"
             :class="getContainerClass(index)">
            <div class="ocr-time">{{datum.timestamp|formatTime}}</div>
            <div class="ocr-result-container">
                <div v-for="(wordDatum, index) in datum.words"
                     class="ocr-result-text">
                    {{index + 1}} . {{wordDatum.word}}
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import formatTime from '../mixin/formatTime'

    export default {
        mixins: [formatTime],
        props: {
            data: Array,
            second: Number
        },
        computed: {
            // 数据按时间顺序排列
            sortedData() {
                const filteredData = [];

                this.data.forEach(datum => {
                    if (datum.words.length > 0) {
                        filteredData.push(datum);
                    }
                });

                return filteredData.sort((a, b) => {
                    return a.timestamp - b.timestamp;
                });
            }
        },
        methods: {
            getContainerClass(index) {
                const currentSec = this.sortedData[index].timestamp;
                const nextDatum = this.sortedData[index + 1];
                const nextSec = nextDatum ? nextDatum.timestamp : null;

                const second = this.second;

                // 最后一个结果，因为没有下个时间点，所以要特殊处理
                const inRange = nextSec
                    ? second >= currentSec && second < nextSec
                    : second > currentSec;

                return {
                    'ocr-item-in-range': inRange
                };
            }
        }
    }
</script>

<style lang="less">
    .ocr-item {
        padding: 15px 0;
        font-size: 0;
        border-bottom: 1px solid #f6f6f6;

        &-in-range {
            background-color: #e8f0f9;
        }

        // 隔行变色效果
        &:nth-child(2n) {
            background-color: #ededed;
        }
    }

    .ocr-time,
    .ocr-result-container {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        line-height: 1.5em;
    }

    .ocr-time {
        width: 75px;
        text-align: center;
    }

    .ocr-result-text {
        // TODO 30px为滚动条预留的，未来更改布局，删除这块
        max-width: 578px - 75px - 35px;
        color: #666;
        word-break: break-all;
        white-space: nowrap;
    }
</style>
