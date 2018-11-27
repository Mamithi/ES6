var personnel = [
    {
        id: 5,
        name: "Luke stuff",
        pilotingScore: 98,
        shootingScore: 56,
        isForceUser: true,
    },
    {
        id: 82,
        name: "Sabren stuff",
        pilotingScore: 73,
        shootingScore: 99,
        isForceUser: false,
    },
    {
        id: 57,
        name: "Luke Doe",
        pilotingScore: 20,
        shootingScore: 59,
        isForceUser: false,
    },
    {
        id: 23,
        name: "John stuff",
        pilotingScore: 43,
        shootingScore: 67,
        isForceUser: true,
    },
    {
        id: 17,
        name: "Caleb stuff",
        pilotingScore: 71,
        shootingScore: 85,
        isForceUser: true,
    },
];

const persons = personnel.filter((person) => {
    return person.isForceUser;
});

const scores = persons.map((person) => {
    return person.shootingScore + person.pilotingScore
});

const total = scores.reduce((acc, score) => {
    return acc + score;
}, 0);

const totalScore = personnel
.filter((person) => {
    return person.isForceUser;
})
.map((score) => {
    return score.shootingScore + score.pilotingScore;
})
.reduce((acc, mark) => {
    return acc + mark;
},0);

console.log(totalScore);