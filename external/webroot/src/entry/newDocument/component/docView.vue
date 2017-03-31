<template>
    <div ref="docContentContainer" v-html="docContent">
    </div>
</template>

<script>
    import throttle from 'lodash.throttle';

    export default {
        props: {
            // 解析md后得到的html
            docContent: {
                type: String,
                default: ''
            },
            // 锚点名
            anchor: {
                type: String,
                default: ''
            }
        },
        mounted() {
            // setTimeout 0应对base64编码的图片的加载
            setTimeout(
                () => {
                    this.enableCodeBlock();
                    this.setAnchorListener();
                    this.adjustAnchor();
                },
                0
            );
        },
        updated() {
            setTimeout(
                () => {
                    this.enableCodeBlock();
                    this.setAnchorListener();

                    // 这里要注意，因为调整锚点位置的时候
                    // 自动触发scroll事件，二级目录随之调整
                    this.adjustAnchor();
                },
                0
            );
        },
        watch: {
            // 因为anchor未渲染在页面上，但是需要监听，所以使用watch
            anchor() {
                this.adjustAnchor();
            }
        },
        methods: {
            // 调整锚点位置
            adjustAnchor() {
                // 预留锚点位置--top,代表文档顶部
                if (this.anchor === 'top') {
                    this.$refs.docContentContainer.scrollTop = 0;

                    return;
                }

                const anchorElement = document.getElementById(encodeURI(this.anchor));
                if (anchorElement) {
                    anchorElement.scrollIntoView();
                }
            },
            // 初始化锚点，绑定锚点监听
            setAnchorListener() {
                const docContentContainer = this.$refs.docContentContainer;

                // 各个标题在容器中所处的y坐标位置
                const headingOffsetArr = [].map.call(
                    docContentContainer.querySelectorAll('h1, h2'),
                    heading => heading.offsetTop
                );

                // 监听滚动条滚动，判断用户当前浏览的标题，使用DOM0级事件，防止重复绑定
                docContentContainer.onscroll = throttle(
                    () => {
                        // 视口底部
                        const viewportTop = docContentContainer.scrollTop;

                        for (let i = 0, len = headingOffsetArr.length; i < len; i++) {
                            if (viewportTop < headingOffsetArr[i]) {
                                this.$emit('reachheading', i - 1);

                                break;
                            }
                            else if (typeof headingOffsetArr[i + 1] === 'undefined') {
                                this.$emit('reachheading', i);

                                break;
                            }
                        }
                    },
                    300
                );
            },
            // 初始化代码块
            enableCodeBlock() {
                const codeBlock = document.querySelectorAll('.code-block');

                codeBlock.forEach((element, index) => {
                    const blocks = element.querySelectorAll('[data-lan]');

                    [].forEach.call(
                        blocks,
                        (element, index) => {
                            if (index > 0) {
                                element.style.display = 'none';
                            }
                        }
                    );

                    element.onclick = e => {
                        const target = e.target;

                        if (target.classList.contains('code-block-title')) {
                            // 防止重复、反复点击
                            if (target.classList.contains('block-active')) {
                                return;
                            }

                            const blockIndex = +target.getAttribute('data-index');

                            target.parentNode.querySelectorAll('.code-block-title').forEach(element => {
                                element.classList.remove('block-active');
                            });

                            target.classList.add('block-active');

                            blocks.forEach((element, index) => {
                                element.style.display = index === blockIndex
                                    ? 'block'
                                    : 'none';
                            });
                        }
                    };
                });
            }
        }
    }
</script>
