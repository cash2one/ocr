<template>
    <div class="ai-video-demo">
        <ai-video class="ai-video-player"
                  :videoSrc="videoSrc"
                  :poster="videos[selectedVideoIndex].poster"
                  :videoName="videoNames[selectedVideoIndex]"></ai-video>
        <video-cover :coverSrc="videos[selectedVideoIndex].poster" class="ai-video-result-panel"></video-cover>
        <video-gallery :videos="videos"
                       :selectedIndex="selectedVideoIndex"
                       @changevideo="onchangeVideo"></video-gallery>
        <div class="ai-video-tip">以上为视频封面选图功能演示，实际效果请联系我们对接测试</div>
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
                videoNames: [
                    '回到汪星球_百度感恩节微电影', '百度云宣传片',
                    '百度索引真实世界', '无人车实拍'
                ],
                // 当前播放的视频所需的排序
                selectedVideoIndex: 0,
                videos: [
                    {
                        poster: require('../../../../ai_images/technology/video-cover/poster-1.png'),
                        src: 'https://gcik9stp4yee5v0aciu.exp.bcevod.com/mda-hdetx8jn5iwpjf0c/hdethw0mzin00yyh258/mda-hdetx8jn5iwpjf0c.mp4'
                    },
                    {
                        poster: require('../../../../ai_images/technology/video-cover/poster-2.png'),
                        src: 'https://gcik9stp4yee5v0aciu.exp.bcevod.com/mda-hdet98mvf8sw12nv/hdetreka5kduke72pz7/mda-hdet98mvf8sw12nv.mp4'
                    },
                    {
                        poster: require('../../../../ai_images/technology/video-cover/poster-3.png'),
                        src: 'https://gcik9stp4yee5v0aciu.exp.bcevod.com/mda-hdet2kxz3n4afc89/hdet45e7efbnkb8pw52/mda-hdet2kxz3n4afc89.mp4'
                    },
                    {
                        poster: require('../../../../ai_images/technology/video-cover/poster-4.png'),
                        src: 'https://gcik9stp4yee5v0aciu.exp.bcevod.com/mda-hdetr6d0eec0spw1/hdet7ms0c8gg38kausq/mda-hdetr6d0eec0spw1.mp4'
                    }
                ]
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
