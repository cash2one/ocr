<template>
    <div>
        <div v-for="(anchorData, index) in annotatedAnchors"
             :class="getAnchorClass(index, anchorData.level)"
             @click="$emit('clickanchor', anchorData.id)">
            <template v-if="anchorData.level === 1">
                <div class="anchor-index">{{anchorData.index|prefixIndex}}</div>
                <div class="anchor-text">{{anchorData.text}}</div>
            </template>
            <template v-if="anchorData.level === 2">
                <div class="anchor-dot"></div>
                <div class="anchor-text">{{anchorData.text}}</div>
            </template>
        </div>
    </div>
</template>

<script>
    import anchorListMixin from './mixin/anchorList';

    export default {
        mixins: [anchorListMixin],
        methods: {
            getAnchorClass(index, level) {
                return {
                    'anchor-item': true,
                    [`anchor-level-${level}`]: true,
                    'anchor-reached': index === this.reachedHeadingIndex
                };
            }
        }
    }
</script>
