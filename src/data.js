const mapData = [{tree: '4,7|5,7|6,7|7,7|8,7|9,7|10,7|4,6|10,6|4,5|10,5|4,4|10,4|4,3|5,3|6,3|7,3|8,3|9,3|10,3', box: '8,6|6,5|8,5|6,4', goal: '5,6|9,6|5,4|9,4', boy: '7,5'}];

export default function getData(level) {
    console.log(level);
    const {tree, box, goal, boy} = mapData[level - 1];
    const player = boy.split(',').map(Number);
    // console.log(tree, box, goal, boy);
    const [trees, boxes, goals] = [tree, box, goal].map(data => {
        return data.split('|').map(pair => pair.split(',').map(Number));
    });
    // console.log(trees, boxes, goals, player);
    return {trees, boxes, goals, player};
}