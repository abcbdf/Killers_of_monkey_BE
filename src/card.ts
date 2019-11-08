export {const_card_list, CardData};

interface CardData
{
    readonly rank: string;
    readonly attack: number;
    readonly defend: number;
    readonly dodge: number;
    readonly race: string;
    readonly id: number;
    readonly name: string;
}

interface TempCardData
{
    rank: string;
    attack: number;
    defend: number;
    dodge: number;
    race: string;
    name?: string;
    id?: number;
}

let temp: { [key: string]: TempCardData; } = 
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

var num = 0;
for (const key in temp)
{
    //console.log(a[key]);
    temp[key].name = key;
    temp[key].id = num;
    num ++;
}

const card_list: CardData[] = [];
for (const key in temp)
{
    let card: CardData = {
        rank: temp[key].rank,
        attack: temp[key].attack,
        defend: temp[key].defend,
        dodge: temp[key].dodge,
        race: temp[key].race,
        name: temp[key].name as string,
        id: temp[key].id as number
    };
    card_list.push(card);
}

const const_card_list: ReadonlyArray<CardData> = card_list;


