<template>
    <div>
        <div class="ai-video-name">{{videoName}}</div>
        <video ref="videoTag" class="video-js"></video>
    </div>
</template>

<script>
    import videoJs from 'video.js';

    // less的引入不支持alias，所以写在js中引入, 样式自定义化
    import '../css/video.less';

    export default {
        props: {
            // 视频链接
            videoSrc: {
                type: String,
                required: true
            },
            videoName: String,
            poster: {
                type: String,
                default: ''
            }
        },
        mounted() {
            const _this = this;

            // 实例化video.js
            this._player = videoJs(this.$refs.videoTag, {
                width: 580,
                height: 380,
                autoPlay: true,
                controls: true,
                // 自定义式汉化
                language: 'zh-CN',
                languages: {
                    'zh-CN': require('../lan/zh-CN.json')
                },
                sources: [
                    {
                        src: _this.videoSrc,
                        type: 'video/mp4'
                    }
                ],
                poster: this.poster
            });

            this._player.on('timeupdate', () => {
                this.$emit('timeupdate', Math.floor(this._player.currentTime()));
            });
        },
        watch: {
            // 视频路径props切换时，播放器调整播放
            videoSrc() {
                this._player.src(this.videoSrc);
            },
            poster() {
                this._player.poster(this.poster);
            }
        }
    }
</script>

<style lang="less">
    .ai-video-name {
        padding-left: 8px;
        height: 40px;
        line-height: 40px;
        background-color: #262626;
        color: #fff;
        font-size: 14px;
    }
</style>
