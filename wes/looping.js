// For of looping

const cuts = ['Chuck', 'Brosket', 'Shank', 'Short rib'];

for(const [i, cut] of cuts.entries()){
    // console.log(`${cut} is the ${i+1} item`)
}
// const meat = cuts.entries();
// console.log(meat.next())
// console.log(meat.next())
// console.log(meat.next())
// console.log(meat.next())


function addNumbers(){
    let total = 0;
    for(num of arguments) {
        total += num
    }
    // console.log(total)
    return total;
}

addNumbers(1, 2, 3, 5, 66, 78, 1,0)

const name = "Lawrence Mamithi"

for(const char of name) {
    // console.log(char)
}

//  For of looping parts -- continued
for(let i = 0; i < cuts.length; i++){
    // console.log(cuts[i])
}

cuts.forEach((cut) => {
    // console.log(cut)
})

for(const index in cuts){
    // console.log(cuts[index])
}

for(const cut of cuts) {
    if(cut == "Shank") {
        continue;
    }
    // console.log(cut)
}

const apple = {
    color: 'Red',
    size: 'Medium',
    weight: 50,
    sugar: 10,
}
for(const prop of Object.keys(apple)) {
    const value = apple[prop]
    console.log(value, prop)
}
for(const prop  in apple) {
    const value = apple[prop]
    console.log(value, prop)
}