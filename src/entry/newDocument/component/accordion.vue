<template>
    <div>
        <div class="accordion-title" @click="clickTitle()">
            {{title}}
            <div class="accordion-arrow" :class="arrowClass"></div>
        </div>
        <div v-show="!collapsed">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            // 手风琴标题
            title: {
                type: String,
                default: '',
            },
            // 是否折叠上
            collapsed: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            // 折展箭头的class
            arrowClass() {
                return {
                    'arrow-collapsed': this.collapsed
                };
            }
        },
        methods: {
            clickTitle() {
                this.collapsed
                    ? this.$emit('requestopen')
                    : this.$emit('requestcollapse');
            }
        }
    }
</script>
