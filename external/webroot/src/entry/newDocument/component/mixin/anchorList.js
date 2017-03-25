/**
 * @file 文档目录mixin
 * @author FranckChen(chenfan02@baidu.com)
 */

export default {
    props: {
        // 锚点集合
        anchors: {
            type: Array,
            required: true
        },
        // 当前浏览到的目录的位置序号
        reachedHeadingIndex: {
            type: Number
        }
    },
    computed: {
        // 为一级目录添加序号
        annotatedAnchors() {
            // 一级标题的排序号
            let index = 1;

            return this.anchors.map(({text, level, id}) => {
                if (level === 1) {
                    // 为了深拷贝，return 对象
                    return {
                        // 1级标题记录序号并显示
                        index: index++,
                        text,
                        level,
                        id
                    };
                }

                return {
                    text,
                    level,
                    id
                };
            });
        }
    },
    filters: {
        prefixIndex(index) {
            if (index < 10) {
                return '0' + index;
            }

            return '' + index;
        }
    }
};
