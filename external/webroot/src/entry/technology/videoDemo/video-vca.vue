<template>
    <div class="ai-video-demo">
        <ai-video class="ai-video-player"
                  :videoSrc="videoSrc"
                  :videoName="videoNames[selectedVideoIndex]"
                  :second="second"
                  @timeupdate="ontimeupdate"></ai-video>
        <div class="ai-video-result-panel">
            <div class="ai-video-tab">
                <div class="ai-tab-title-container">
                    <div class="ai-tab-title"
                         v-for="tab in resultTabs"
                         :class="getTabTitleClass(tab)"
                         @click="onclickTab(tab)">{{tab}}</div>
                </div>
                <div class="ai-tab-content">
                    <voice-recognition :data="result.voiceRecognitionResult"
                                       :second="second"
                                       :terms="terms"
                                       v-show="this.activeTab === '语音'"></voice-recognition>
                    <ocr :data="result.OCRResult"
                         :second="second"
                         v-show="this.activeTab === '文字'"></ocr>
                    <face-recognition :data="result.faceRecognitionResult"
                                      :second="second"
                                      v-show="this.activeTab === '人脸'"></face-recognition>
                    <classification :data="result.classificationResult"
                                    v-show="this.activeTab === '场景'"></classification>
                </div>
            </div>
            <video-tag :tags="tags"></video-tag>
        </div>
        <video-gallery :videos="videos"
                       :selectedIndex="selectedVideoIndex"
                       @changevideo="onchangeVideo"></video-gallery>
        <div class="ai-video-tip">以上为视频内容功能演示，暂不支持线上演示。</div>
    </div>
</template>

<script>
    import throttle from 'lodash.throttle';

    import aiVideo from './component/aiVideo.vue';
    import voiceRecognition from './component/voiceRecognition.vue';
    import ocr from './component/ocr.vue';
    import faceRecognition from './component/faceRecognition.vue';
    import classification from './component/classification.vue';
    import videoTag from './component/video-tag.vue';
    import videoGallery from './component/videoGallery.vue';

    export default {
        el: '#video-vca-demo',
        components: {
            aiVideo, voiceRecognition, ocr,
            faceRecognition, classification,
            videoTag, videoGallery
        },
        data() {
            return {
                videoNames: ['匆匆那年', '战长沙', 'IDL宣传片', 'Robin接受彭博社全球专访'],
                resultTabs: ['语音', '文字', '人脸', '场景'],
                result: {
                    voiceRecognitionResult: [],
                    faceRecognitionResult: [],
                    classificationResult: [],
                    OCRResult: [],
                    libs: []
                },
                // 当前视频播放到的时间
                second: 0,
                // 当前激活的tab
                activeTab: '语音',
                /* eslint-disable */
                videos: [
                    {
                        posterSrc: require('./image/video-poster.png'),
                        src: 'http://gcik9stp4yee5v0aciu.exp.bcevod.com/mda-hdavmb2nypg7du9g/hdavxa0bdnf5r7wpxvt/mda-hdavmb2nypg7du9g.mp4'
                    },
                    {
                        posterSrc: require('./image/video-poster.png'),
                        src: 'http://gcik9stp4yee5v0aciu.exp.bcevod.com/mda-hdavpn6azr06gkx2/hdav6c8uu7pm8vajbp0/mda-hdavpn6azr06gkx2.mp4'
                    },
                    {
                        posterSrc: require('./image/video-poster.png'),
                        src: 'http://gcik9stp4yee5v0aciu.exp.bcevod.com/mda-hdavsw3m66d8ra5x/hdavtdhx0z0fypj91t8/mda-hdavsw3m66d8ra5x.mp4'
                    },
                    {
                        posterSrc: require('./image/video-poster.png'),
                        src: 'http://gcik9stp4yee5v0aciu.exp.bcevod.com/mda-hdav8gguws4wtazt/hdav8qgtu6d2cc27fgf/mda-hdav8gguws4wtazt.mp4'
                    }
                ],
                /* eslint-enable */
                // 当前播放的视频所需的排序
                selectedVideoIndex: 0,
            };
        },
        created() {
            // 默认是第一个视频，序号是0
            require.ensure(
                './analyzeResult/0.json',
                require => {
                    this.result = require('./analyzeResult/0.json').result;
                },
                'video0'
            );
        },
        computed: {
            // 当前播放的视频的地址
            videoSrc() {
                // 通过选中的视频的需要去获取
                const index = this.selectedVideoIndex;

                return this.videos[+index].src;
            },
            terms() {
                const terms = [];

                this.result.libs.forEach(({term, source}) => {
                    if (source.toLowerCase().indexOf('ocr') >= 0) {
                        terms.push(term);
                    }
                });

                return terms;
            },
            tags() {
                return this.result.libs.map(({term}) => {
                    return term;
                });
            }
        },
        methods: {
            getTabTitleClass(tab) {
                return {
                    // 字幕与播放时间对应上是，底色变化
                    'ai-tab-title-active': tab === this.activeTab
                };
            },
            ontimeupdate: throttle(
                function (second) {
                    this.second = second;
                },
                1000
            ),
            onclickTab(tab) {
                if (tab === this.activeTab) {
                    return;
                }

                this.activeTab = tab;
            },
            onchangeVideo(video) {
                this.selectedVideoIndex = this.videos.indexOf(video);

                // webpack貌似不支持异步引用 + 动态引入共同使用，所以暂时这么写
                switch(this.selectedVideoIndex) {
                    case 0:
                        require.ensure(
                            './analyzeResult/0.json',
                            require => {
                                this.result = require('./analyzeResult/0.json').result;
                            },
                            'video0'
                        );

                        return;
                    case 1:
                        require.ensure(
                            './analyzeResult/1.json',
                            require => {
                                this.result = require('./analyzeResult/1.json').result;
                            },
                            'video1'
                        );

                        return;
                    case 2:
                        require.ensure(
                            './analyzeResult/2.json',
                            require => {
                                this.result = require('./analyzeResult/2.json').result;
                            },
                            'video2'
                        );

                        return;
                    case 3:
                        require.ensure(
                            './analyzeResult/3.json',
                            require => {
                                this.result = require('./analyzeResult/3.json').result;
                            },
                            'video3'
                        );

                        return;
                }
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
    }

    .ai-video-tab {
        position: relative;
        box-sizing: border-box;
        height: 250px;
        border: 1px solid #f9f9f9;
        font-size: 12px;
    }

    .ai-tab-title-container {
        position: absolute;
        top: 0;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #f9f9f9;
        padding-top: 10px;
        text-align: center;
        font-size: 0;
    }

    .ai-tab-title {
        display: inline-block;
        width: 80px;
        height: 30px;
        margin-right: 5px;
        line-height: 30px;
        background-color: #e1ecf8;
        font-size: 12px;
        color: #007afb;
        cursor: pointer;

        &-active {
            background-color: #0a6deb;
            color: #fff;
        }
    }

    .ai-tab-content {
        position: absolute;
        top: 50px;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fafafa;
        overflow: auto;
    }

    .ai-video-tip {
        margin-top: 10px;
        font-size: 12px;
    }
</style>
