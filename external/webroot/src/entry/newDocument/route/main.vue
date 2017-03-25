<template>
    <div class="app">
        <div class="category">
            <accordion title="新手指南"
                       :collapsed="beginnerDocCollapsed"
                       @requestopen="beginnerDocCollapsed = false"
                       @requestcollapse="beginnerDocCollapsed = true">
                <treeMenu :items="beginnerDocTree"
                          :selectedNode="$route.params.doc"
                          :openedId="openedId"
                          @requestopen="requestOpen"
                          @requestcollapse="requestCollapse"
                          @changenode="changeNode">
                </treeMenu>
            </accordion>
            <accordion title="技术文档"
                       :collapsed="techDocCollapsed"
                       @requestopen="techDocCollapsed = false"
                       @requestcollapse="techDocCollapsed = true">
                <treeMenu :items="techDocTree"
                          :selectedNode="$route.params.doc"
                          :openedId="openedId"
                          @requestopen="requestOpen"
                          @requestcollapse="requestCollapse"
                          @changenode="changeNode">
                </treeMenu>
            </accordion>
        </div>
        <div class="anchor-list" :class="getAnchorListContainerClass()">
            <keep-alive>
                <component :is="anchorListType"
                           :anchors="anchors"
                           :reachedHeadingIndex="reachedHeadingIndex"
                           @clickanchor="clickAnchor"></component>
            </keep-alive>
        </div>
        <div class="main-content" :class="getMainContentClass()" ref="mainContent">
            <div class="anchor-mode-switch" @click="changeAnchorListMode()"></div>
            <breadCrumb class="bread-crumb"
                        :path="breadCrumbPath"></breadCrumb>
            <docView class="doc-container"
                     :docContent="docContent"
                     :anchor="docAnchor"
                     @reachheading="reachHeading"
                     ref="docContent">
            </docView>
        </div>
    </div>
</template>

<script>
    import request from 'superagent';
    import debounce from 'lodash.debounce';

    // highlight.js皮肤
    import 'highlight.js/styles/default.css';

    // 组件
    import treeMenu from '../component/treeMenu.vue';
    import anchorList from '../component/anchorList.vue';
    import anchorListLite from '../component/anchorListLite.vue';
    import docView from '../component/docView.vue';
    import breadCrumb from '../component/breadCrumb.vue';
    import accordion from '../component/accordion.vue';

    // module
    import addId from '../lib/addId';
    import getHierarchy from '../lib/getHierarchy';
    import {beginnerDoc, techDoc} from 'docCategory';

    import 'less/newDocument/newDocument.less';

    const getDoc = function (docName, callback = () => {}) {
        request
            .get(`/data/${docName}.json`)
            .end((err, res) => {
                if (err) {
                    return;
                }

                callback(res.body);
            });
    };

    export default {
        components: {
            treeMenu, anchorList, docView,
            breadCrumb, accordion, anchorListLite
        },
        created() {
            this.docAnchor = this.$route.params.anchor;

            // 渲染首屏
            getDoc(
                this.$route.params.doc,
                this.renderPage
            );

            // 监听路由变化, 注意首次进入的时候不会触发
            this.$router.beforeEach((to, from , next) => {
                const previousDoc = from.params.doc;
                const toDoc = to.params.doc;

                if (previousDoc !== toDoc) {
                    // 先跳转到新的hash路径
                    next();

                    // 在请求并渲染
                    getDoc(
                        toDoc,
                        this.renderPage
                    );
                }
            });
        },
        mounted() {
            // 目录扩展，收缩时有动画效果，同时能引起文档高度发生变化，需要调整锚点位置
            this.$refs.mainContent.addEventListener('transitionend', () => {
                this.$refs.docContent.setAnchorListener();
            });

            // resize会引起文档内容高度发生变化，锚点位置需要重新调整
            window.addEventListener(
                'resize',
                debounce(
                    () => {
                        this.$refs.docContent.setAnchorListener();
                    },
                    400
                )
            );
        },
        computed: {
            // 根据目录模式，确定使用哪种目录组件
            anchorListType() {
                switch (this.anchorListMode) {
                    case 'lite':
                        return 'anchorListLite';
                    case 'full':
                    default:
                        return 'anchorList';
                }
            }
        },
        data() {
            return {
                // 文档展示窗口的内容
                docContent: '',
                // 文档锚点
                docAnchor: 'top',
                // 绘制文档目录树所用的数据，通过addId方法，为每个节点添加一个id
                techDocTree: addId(techDoc),
                beginnerDocTree: addId(beginnerDoc),
                // 目录树中，需要展开的节点的id
                openedId: [],
                // 目录数据
                anchors: [],
                // 目前阅览到的标题，在标题栏中的序号
                reachedHeadingIndex: -1,
                // 文档面包屑导航数据
                breadCrumbPath: [],
                // 技术文档手风琴折展状态
                techDocCollapsed: false,
                // 文档模块中，所有树的节点统一编排id,方便协调多颗叔的选中状态
                beginnerDocCollapsed: false,
                // 目录模式，有两种 全景模式-full, 精简模式-lite
                anchorListMode: 'full'
            };
        },
        methods: {
            jump(doc) {
                this.docAnchor = 'top';

                this.$router.push({
                    name: 'doc',
                    params: {
                        doc,
                        anchor: 'top'
                    }
                });
            },
            changeNode(md) {
                this.jump(md);
            },
            clickAnchor(anchorId) {
                this.docAnchor = anchorId;
            },
            // 文档滚动到一个锚点位置时
            reachHeading(reachedHeadingIndex) {
                this.reachedHeadingIndex = reachedHeadingIndex;
            },
            // 请求展开一个文档树非叶子节点时
            requestOpen(id) {
                this.openedId.push(id);
            },
            // 请求闭合一个文档树非叶子节点时
            requestCollapse(id) {
                this.openedId.splice(this.openedId.indexOf(id), 1);
            },
            // 修改数据层，触发页面绘制
            renderPage(docData) {
                // 渲染文档内容
                this.docContent = docData.html;

                // 渲染目录
                this.anchors = docData.headings;

                // 找到当前文档的层级信息
                const hierarchy = getHierarchy(
                    [this.techDocTree, this.beginnerDocTree],
                    this.$route.params.doc
                );

                // 选中的文档的祖先的信息
                const ancestors = hierarchy.slice(0, hierarchy.length - 1);

                // 提取祖先id和祖先名，id用于展开父节点
                ancestors.forEach(({id}) => {
                    // 可惜没有set, 所以这里写的很纠结
                    if (this.openedId.indexOf(id) < 0) {
                        this.openedId.push(id);
                    }
                });

                // 渲染面包屑层级信息
                this.breadCrumbPath = hierarchy.map(data => data.text);
            },
            // 调整锚点列表模式
            changeAnchorListMode() {
                this.anchorListMode = this.anchorListMode === 'full'
                    ? 'lite'
                    : 'full';
            },
            // 根据目前目录所处的模式，返回对应的class名
            getAnchorListContainerClass() {
                switch (this.anchorListMode) {
                    case 'full':
                        return ['anchor-list-full'];
                    case 'lite':
                        return ['anchor-list-lite'];
                    default:
                        return [];
                }
            },
            // 根据目录所处的模式，修改主体内容的class
            getMainContentClass() {
                switch (this.anchorListMode) {
                    case 'full':
                        return ['doc-shrink'];
                    case 'lite':
                        return ['doc-expand'];
                    default:
                        return [];
                }
            }
        }
    }
</script>
