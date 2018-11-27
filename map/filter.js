const pilots = [
    {
        id: 10,
        name: "Pope Dameron",
        faction: "Rebels",
    },
    {
        id: 2,
        name: "Pope Wexley",
        faction: "Empire",
    },
    {
        id: 1,
        name: "Lintra Dameron",
        faction: "Rebels",
    },
    {
        id: 109,
        name: "Pope Asty",
        faction: "Empire",
    }
];


const rebels = pilots.filter((pilot)  => {
    return pilot.faction === "Rebels";
});

console.log(rebels);

const empire = pilots.filter((pilot) => {
    return pilot.faction === 'Empire';
});

console.log(empire);



