<template>
    <div>
        <template v-for="(name, index) in path"
                  :class="getBreadCrumbItemClass(index)">
            <span>{{name}}</span>
            <span v-if="index < path.length - 1">&gt;</span>
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            // 路径集合
            path: {
                type: Array,
                required: true
            }
        },
        methods: {
            getBreadCrumbItemClass(index) {
                return {
                    'bread-crumb-terminal': index === this.path.length - 1
                };
            }
        }
    }
</script>
