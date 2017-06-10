<template>
    <div>
        <template v-for="(item, index) of items">
            <template v-if="item.children">
                <div class="tree-node non-leaf-node"
                     :class="getNonLeafClass(item.id)"
                     @click="toggleAccordion(item.id)">
                    {{item.text}}
                    <div class="non-leaf-arrow"></div>
                </div>
                <treeMenu :items="item.children"
                          v-show="openedId.indexOf(item.id) >= 0"
                          :level="level + 1"
                          :selectedNode="selectedNode"
                          :openedId="openedId"
                          @requestopen="toggleAccordion"
                          @requestcollapse="toggleAccordion"
                          @selectnode="selectNode"></treeMenu>
            </template>
            <div v-else
                 @click="selectNode(item.md)"
                 class="tree-node leaf-node"
                 :class="getLeafNodeClass(item.md)">
                <div class="leaf-dot" v-if="level === 3"></div>
                <div class="leaf-text" v-bind:title="item.text">{{item.text}}</div>
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
            },
            // 获取非叶子节点的class
            getNonLeafClass(id) {
                return {
                    [`level-${this.level}`]: true,
                    // 代表非叶子节点收起
                    'non-leaf-collapsed': this.openedId.indexOf(id) < 0
                };
            }
        }
    }
</script>
