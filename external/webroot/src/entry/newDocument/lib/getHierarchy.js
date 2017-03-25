/**
 * @file 后序遍历树结构，返回到达一个叶子节点的全部脉络
 * @author FranckChen(chenfan02@baidu.com)
 */

export default function (treeData, md) {
    const hierarchy = [];

    let coll = [];
    treeData.forEach(data => {
        coll = coll.concat(data);
    });

    const find = (arr, md) => {
        for (let i = 0, len = arr.length; i < len; i++) {
            const current = arr[i];

            if (current.md === md) {
                hierarchy.push(current);

                return true;
            }
            else if (current.children) {
                // 记录下父节点的id
                hierarchy.push(current);

                if (!find(current.children, md)) {
                    hierarchy.pop();
                }
                else {
                    return true;
                }
            }
        }

        return false;
    };

    find(coll, md);

    return hierarchy;
};
