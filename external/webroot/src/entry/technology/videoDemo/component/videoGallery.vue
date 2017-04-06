<template>
    <div class="video-gallery">
        <div v-for="(video, index) in videos"
             @click="onClick(video, index)"
             class="video-gallery-item"
             :class="{'video-gallery-item-selected': index === selectedIndex}">
             <div class="demo-card-dialog"></div>
            <img :src="video.poster" alt="">
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
        width: 1180px;
        font-size: 0;
        margin-top: 20px;
    }

    .video-gallery-item {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        width: 25%;
        padding: 5px;
        text-align: center;
        border: 1px solid #f6f6f6;
        cursor: pointer;

        &-selected {
            border: 1px solid #6394f2;

            .demo-card-dialog {
                display: none;
            }
        }

        .demo-card-dialog {
            position: absolute;
            left: 5px;
            top: 5px;
            right: 5px;
            bottom: 5px;
            background-color: rgba(0, 0, 0, .5);
        }

        .demo-card-dialog::after {
            content: "";
            position: absolute;
            width: 30px;
            height: 30px;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            background: url('../../../../../ai_images/technology/video-cover/video-arrow.png') no-repeat 5px 0;
            background-size: 50px 30px;
        }

        .demo-card-dialog:hover::after {
            background-position: -22px 0;
        }

        img {
            max-width: 90%;
            max-height: 90%;
        }
    }
</style>
