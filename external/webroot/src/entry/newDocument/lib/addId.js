/**
 * @file 为目录结构中的数据补充id,如果是叶子节点则以文档名
 *       为id，如果是非叶子节点，以数字命名id
 * @author FranckChen(chenfan02@baidu.com)
 */

// 文档模块中，所有树的节点统一编排id,方便协调多颗叔的选中状态
let count = 0;
// 先序遍历，添加id TODO 未做深拷贝，不知道会不会有问题
export default function addId (treeData) {
    treeData.forEach(data => {
        let children = [];

        if (data.md) {
            data.id = data.md;
        }
        else {
            data.id = ++count;
        }

        // 递归
        if (data.children) {
            children = children.concat(data.children);
        }

        addId(children);
    });

    return treeData;
};
