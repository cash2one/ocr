<template>
    <div>
        <div v-for="(anchorData, index) in annotatedAnchors"
             :class="getAnchorClass(index)"
             @click="$emit('clickanchor', anchorData.id)">
            <div v-if="anchorData.level === 1"
                 class="lite-index">
                {{anchorData.index|prefixIndex}}
            </div>
            <div v-if="anchorData.level === 2"
                 class="lite-spot">·</div>
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
                    'lite-anchor-reached': index === this.reachedHeadingIndex
                };
            }
        }
    }
</script>
