<template>
    <div class="video-gallery">
        <div v-for="(video, index) in videos"
             @click="onClick(video, index)"
             class="video-gallery-item"
             :class="{'video-gallery-item-selected': index === selectedIndex}">
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

        &-selected {
            border: 1px solid #6394f2;
        }

        img {
            width: 130px;
            height: 110px;
        }
    }
</style>
