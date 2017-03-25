<template>
    <div>
        <div v-for="(anchorData, index) in annotatedAnchors"
             @click="$emit('clickanchor', anchorData.id)"
             :class="getAnchorClass(index)">
            <div v-if="anchorData.level === 1" class="anchor-item anchor-level-1">
                <div class="anchor-index">{{anchorData.index|prefixIndex}}</div>
                <div class="anchor-text">{{anchorData.text}}</div>
            </div>
            <div v-if="anchorData.level === 2" class="anchor-item anchor-level-2">
                <div class="anchor-dot"></div>
                <div class="anchor-text">{{anchorData.text}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import anchorListMixin from './mixin/anchorList';

    export default {
        mixins: [anchorListMixin],
        methods: {
            getAnchorClass(index) {
                return {
                    'anchor-reached': index === this.reachedHeadingIndex
                };
            }
        }
    }
</script>
