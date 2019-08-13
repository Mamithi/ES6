function sumAll() {
    const nums = Array.from(arguments)
    return nums.reduce((prev, next) => prev + next, 0)
}

sumAll(2, 3, 1, 3, 2, 9, 5, 6, 7, 8, 7)


// const ages = Array.of(12, 3, 4, 5, 6, 9)


// Some and every array part
const ages = [32, 3, 4, 17, 18, 5]
const youngins = [2, 3, 4, 17, 16, 5]
const adultPresent = ages.some(age => age >= 18)

const oldEnough = ages.every(age => age >= 19)

const posts = [
    {
        "code": "HJABH344AJHXV",
        "captions": "lorem psumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
        "likes": 21,
        "id": 1134789,
    },
    {
        "code": "BHJHXBAJHXV",
        "captions": "losdchsdbcjhkbsdjhkc bsdjh mlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
        "likes": 220,
        "id": 113489,
    }, {
        "code": "YHJKL",
        "captions": "lorsdjkc mlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
        "likes": 201,
        "id": 6789,
    },
     {
        "code": "KJHJKKK",
        "captions": "lorem i jhdsbjhsdb rem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
        "likes": 2450,
        "id": 189,
    }, 
    {
        "code": "HGAFAGSFS",
        "captions": "lorsdjhcbsd sdjhcbsdjhbc sjhcsdjhb mlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
        "likes": 567,
        "id": 272727,
    },
];


const id = 189
const post = posts.find(post => post.id === id);
// console.log(post)
const postIndex = posts.findIndex(post => post.id === id)

console.log(postIndex)