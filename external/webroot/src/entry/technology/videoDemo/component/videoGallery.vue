<template>
    <div class="video-gallery">
        <div v-for="(video, index) in videos"
             @click="onClick(video, index)"
             class="video-gallery-item"
             :class="{'video-gallery-item-selected': index === selectedIndex}">
             <div class="demo-card-dialog"></div>
            <img :src="video.posterSrc" alt="">
        </div>
    </div>
</template>

<script>
    export default {  
        props: {
            videos: Array,
            selectedIndex: {
                type: Number,
                default: -1
            }
        },
        methods: {
            getGalleryItemClass(index) {
                return {
                    'ai-video-selected': index === selectedIndex
                };
            },
            onClick(video, index) {
                if (index !== this.selectedIndex) {
                    this.$emit('changevideo', video);
                }
            }
        }
    }
</script>

<style lang="less">
    .video-gallery {
        font-size: 0;
        margin-top: 20px;
    }

    .video-gallery-item {
        display: inline-block;
        padding: 5px;
        text-align: center;
        border: 1px solid #f6f6f6;
        cursor: pointer;
        position: relative;
        &-selected {
            border: 1px solid #6394f2;
            .demo-card-dialog {
                display: none;
            }
        }
        .demo-card-dialog {
                        position: absolute;
                        width: 130px;
                        height: 101px;
                        z-index: 5;
                    }
                    .demo-card-dialog::before {
                        content: "";
                        position: absolute;
                        left: 0;
                        width: 129px;
                        height: 108px;
                        background-color: rgba(0, 0, 0, .5);
                    }
                    .demo-card-dialog::after {
                        content: "";
                        position: absolute;
                        width: 30px;
                        height: 30px;
                        top: 50%;
                        transform: translateX(-50%) translateY(-50%);
                        background-image: url('../../../../../ai_images/technology/video-cover/video-arrow.png');
                        background-position: 5px 0;
                        background-size: 50px 30px;
                        background-repeat: no-repeat;
                    }
                    .demo-card-dialog:hover::after {
                        background-position: -22px 0;
                    }
        img {
            width: 130px;
            height: 110px;
        }
    }
</style>
