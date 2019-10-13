var fs = require('fs');
var a = 
{
    "attack_monkey": 
    {
        rank: "B",
        attack: 90,
        defend: 10,
        dodge: 10,
        race: "monkey",
    },
    "defend_monkey": 
    {
        rank: "A",
        attack: 10,
        defend: 90,
        dodge: 10,
        race: "monkey",
    },
    "dodge_monkey": 
    {
        rank: "B",
        attack: 10,
        defend: 10,
        dodge: 90,
        race: "monkey",
    },
    "attack_monkey_weak": 
    {
        rank: "D",
        attack: 70,
        defend: 10,
        dodge: 10,
        race: "monkey",
    },
    "defend_monkey_weak": 
    {
        rank: "C",
        attack: 10,
        defend: 70,
        dodge: 10,
        race: "monkey",
    },
    "dodge_monkey_weak": 
    {
        rank: "D",
        attack: 10,
        defend: 10,
        dodge: 70,
        race: "monkey",
    },
};

//console.log(a);
var num = 0;
for (key in a){
    //console.log(a[key]);
    a[key].name = key;
    a[key].id = num;
    num ++;
}

var a_list = []

for (key in a){
    a_list.push(a[key]);
}
    


Str_ans = JSON.stringify(a_list);
fs.writeFile('data.json', Str_ans, 'utf8', (err) => {
    if (err) throw err;
    console.log('done');
})