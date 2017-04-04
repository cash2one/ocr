<template>
    <div>
        <div v-for="datum in data"
             class="voice-item"
             :class="getSubTitleClass(datum.startTimestampInSecond, datum.endTimestampInSecond)">
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
        methods: {
            getSubTitleClass(startTimestamp, endTimestamp) {
                return {
                    // 当前的字幕高亮显示
                    'voice-subtitle-in-range': startTimestamp <= this.second && this.second < endTimestamp
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
    }

    .voice-time-range {
        width: 125px;
        text-align: center;
    }

    .voice-subtitle {
        box-sizing: border-box;
        max-width: 578px - 125px - 10px;
        padding-right: 10px;

        &-in-range {
            background-color: #ebebeb;
        }
    }
</style>
