const pilots = [
    {
        id: 10,
        name: "Pope Dameron",
        years: 14,
    },
    {
        id: 2,
        name: "Pope Wexley",
        years: 24,
    },
    {
        id: 1,
        name: "Lintra Dameron",
        years: 4,
    },
    {
        id: 109,
        name: "Pope Asty",
        years: 16,
    }
];

const totalYears = pilots.reduce((acc, pilot) => acc + pilot.years, 0);

console.log(`Total experience years ${totalYears}`);

const mostExpPilot = pilots.reduce(function(oldest, pilot)  {
    return (oldest.years || 0) > pilot.years ? oldest : pilot; 
}, {});

console.log(`Most experienced pilot ${mostExpPilot.name}`);