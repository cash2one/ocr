<template>
    <div class="ai-video-demo">
        <ai-video class="ai-video-player"
                  :videoSrc="videoSrc"
                  :videoName="videoNames[selectedVideoIndex]"></ai-video>
        <video-cover :coverSrc="coverSrc" class="ai-video-result-panel"></video-cover>
        <video-gallery :videos="videos"
                       :selectedIndex="selectedVideoIndex"
                       @changevideo="onchangeVideo"></video-gallery>
        <div class="ai-video-tip">以上为视频内容功能演示，暂不支持线上演示。</div>
    </div>
</template>

<script>
    import aiVideo from './component/aiVideo.vue';
    import videoGallery from './component/videoGallery.vue';
    import videoCover from './component/video-cover-show.vue';

    export default {
        el: '#video-cover-demo',
        components: {
            aiVideo, videoGallery, videoCover
        },
        data() {
            return {
                videoNames: ['视频1', '视频2', '视频3'],
                // 当前播放的视频所需的排序
                selectedVideoIndex: 0,
                videos: [
                    {
                        posterSrc: require('./image/video-poster.png'),
                        src: 'http://vo.fod4.com/v/25c17d6eb2/v600.mp4'
                    },
                    {
                        posterSrc: require('./image/video-poster.png'),
                        src: 'http://vjs.zencdn.net/v/oceans.mp4'
                    },
                    {
                        posterSrc: require('./image/video-poster.png'),
                        src: 'ccc'
                    }
                ],
                coverSrc: require('./image/video-poster.png')
            };
        },
        computed: {
            videoSrc() {
                // 通过选中的视频的需要去获取
                const index = this.selectedVideoIndex;

                return this.videos[+index].src;
            }
        },
        methods: {
            onchangeVideo(video) {
                this.selectedVideoIndex = this.videos.indexOf(video);
            }
        }
    }
</script>

<style lang="less">
    .ai-video-demo {
        width: 1180px;
        margin: 0 auto;
        font-size: 0;
    }

    .ai-video-player,
    .ai-video-result-panel {
        display: inline-block;
        vertical-align: top;
    }

    .ai-video-result-panel {
        width: 580px;
        height: 420px;
    }

    .ai-video-tip {
        margin-top: 10px;
        font-size: 12px;
    }
</style>
