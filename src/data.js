const mapData = [
    {tree: '4,7|5,7|6,7|7,7|8,7|9,7|10,7|4,6|10,6|4,5|10,5|4,4|10,4|4,3|5,3|6,3|7,3|8,3|9,3|10,3', box: '8,6|6,5|8,5|6,4', goal: '5,6|9,6|5,4|9,4', boy: '7,5'},
    {tree: '3,2|4,2|5,2|6,2|7,2|8,2|9,2|10,2|3,3|7,3|10,3|3,4|10,4|3,5|7,5|10,5|3,6|4,6|5,6|6,6|7,6|8,6|9,6|10,6', box: '7,4', goal: '9,4', boy: '8,4'},
    {tree: '6,2|7,2|8,2|9,2|4,3|5,3|6,3|9,3|4,4|9,4|10,4|4,5|10,5|4,6|6,6|10,6|4,7|5,7|6,7|7,7|8,7|9,7|10,7', box: '6,4|6,5', goal: '8,4|7,6', boy: '5,6'},
    {tree: '5,1|6,1|7,1|8,1|9,1|10,1|4,2|5,2|10,2|4,3|8,3|10,3|4,4|10,4|4,5|7,5|9,5|10,5|4,6|5,6|9,6|5,7|6,7|7,7|8,7|9,7', box: '6,3|7,4|8,5', goal: '8,2|6,3|6,4', boy: '7,6'},
    {tree: '4,1|5,1|6,1|7,1|8,1|9,1|10,1|4,2|10,2|4,3|6,3|8,3|10,3|4,4|10,4|4,5|9,5|10,5|4,6|7,6|8,6|9,6|4,7|5,7|6,7|7,7', box: '8,4|6,5|7,5', goal: '7,2|7,3|5,5', boy: '8,2'}
];

export default function getData(level) {
    // console.log(level);
    const {tree, box, goal, boy} = mapData[level - 1];
    const player = boy.split(',').map(Number);
    // console.log(tree, box, goal, boy);
    const [trees, boxes, goals] = [tree, box, goal].map(data => {
        return data.split('|').map(pair => pair.split(',').map(Number));
    });
    // console.log(trees, boxes, goals, player);
    return {trees, boxes, goals, player};
}