<template>
    <div>
        <template v-for="(item, index) of items">
            <div v-if="item.children"
                 class="tree-node"
                 :class="componentClass"
                 @click="toggleAccordion(item.id)">
                {{item.text}}
            </div>
            <treeMenu :items="item.children"
                      v-if="item.children"
                      v-show="openedId.indexOf(item.id) >= 0"
                      :level="level + 1"
                      :selectedNode="selectedNode"
                      :openedId="openedId"
                      @requestopen="toggleAccordion"
                      @requestcollapse="toggleAccordion"
                      @selectnode="selectNode"></treeMenu>
            <div v-else
                 @click="selectNode(item.md)"
                 class="tree-node leaf-node"
                 :class="getLeafNodeClass(item.md)">
                <div class="leaf-dot" v-if="level === 3"></div>
                <div class="leaf-text">{{item.text}}</div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        // 递归组件
        name: 'treeMenu',
        props: {
            items: Array,
            level: {
                type: Number,
                default: 1
            },
            selectedNode: {
                type: String,
                default: ''
            },
            // 展开的节点的id集合
            openedId: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                // 记录目录层级level的class
                componentClass: [`level-${this.level}`]
            };
        },
        methods: {
            // 折展一个手风琴
            toggleAccordion(id) {
                const isOpen = this.openedId.indexOf(id) >= 0;

                // 根据是否已处于展开状态，来确定抛出请求展开还是请求折叠
                this.$emit(isOpen ? 'requestcollapse' : 'requestopen', id);
            },
            getLeafNodeClass(id) {
                return {
                    [`level-${this.level}`]: true,
                    'node-selected': id === this.selectedNode
                };
            },
            // 选中一个叶子时的事件处理
            selectNode(md) {
                this.$emit(
                    'selectnode',
                    md
                );

                // 切换md时触发
                if (md !== this.selectedNode) {
                    this.$emit(
                        'changenode',
                        md
                    );
                }
            }
        }
    }
</script>
