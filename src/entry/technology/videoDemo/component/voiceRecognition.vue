<template>
    <div class="video-subtitle-container" ref="subtitleContainer">
        <div v-for="(datum, index) in data"
             class="voice-item"
             :class="getSubTitleClass(datum.startTimestampInSecond, datum.endTimestampInSecond, index)"
             ref="subtitle">
            <div class="voice-time-range">
                {{datum.startTimestampInSecond|formatTime}} - {{datum.endTimestampInSecond|formatTime}}
            </div>
            <div class="voice-subtitle" v-html="processStatement(datum.statement)"></div>
        </div>
    </div>
</template>

<script>
    import videoJs from 'video.js';
    import formatTime from '../mixin/formatTime'

    export default {
        mixins: [formatTime],
        props: {
            data: Array,
            second: Number,
            // 术语集合，字幕中的术语需要高亮
            terms: Array
        },
        mounted() {
            this.$on('subtitleinrange', function (index) {
                if (!this.$refs.subtitle) {
                    return;
                }

                this.$refs.subtitleContainer.scrollTop = this.$refs.subtitle[index].offsetTop;
            });
        },
        methods: {
            getSubTitleClass(startTimestamp, endTimestamp, index) {
                const inRange = startTimestamp <= this.second && this.second < endTimestamp;

                if (inRange) {
                    this.$emit('subtitleinrange', index);
                }

                return {
                    // 当前的字幕高亮显示
                    'voice-subtitle-in-range': inRange
                };
            },
            // 在字幕中加粗术语
            processStatement(statement) {
                this.terms.forEach(term => {
                    statement = statement.replace(
                        term,
                        `<b>${term}</b>`
                    );
                });

                return statement;
            }
        }
    }
</script>

<style lang="less">
    .video-subtitle-container {
        height: 100%;
        overflow: auto;
    }

    .voice-item {
        font-size: 0;
        padding: 8px 0;

        b {
            color: #007afb;
        }
    }

    .voice-subtitle,
    .voice-time-range {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        line-height: 1.5em;
    }

    .voice-time-range {
        width: 125px;
        text-align: center;
    }

    .voice-subtitle {
        box-sizing: border-box;
        // TODO 30px是为滚动条预留的，未来更改布局，删除这块
        max-width: 578px - 125px - 35px;
        padding-right: 10px;
        color: #666;

        &-in-range {
            background-color: #e8f0f9;
        }
    }
</style>
