const person = {
    first: 'Wes',
    last: 'Bos',
    country: 'Kenya',
    city: 'Nairobi',
    twitter: '@smith',
    links : {
        social: {
            twitter: "twitther",
            fb: "fb"
        }
    }
}

const { twitter:tweet, fb:facebook } = person.links.social;


const settings = { width:300, color:"black"}
const { width=100, height=100, color="blue", fontSize=54} = settings;


let inring = "John Cena";
let onside = "The Rock";

[inring, onside] = [onside, inring]


// Multiple return part
function convertCurrency(amount) {
    const converted = {
        USD: amount * 0.76,
        GPA: amount * 0.53,
        AUD: amount * 1.03,
        NEX: amount * 14.6,
    }

    return converted;
}

const {USD, GPA, AUD} = convertCurrency(100);


function tipCalc({total=100, tip=0.13, tax =0.26}={}){
    return total + (total*tip) + (total*tax)
}

const cost = tipCalc()

//  DEstructuring an array
const details = ['Lawrence Mamithi', 123, 'law.com']

const [name, id, website]=details;

const data = 'basketball,football,sports,123,law,cool'

const [itemname, category, fav, num] = data.split(',');

const team = ['joe', 'doe', 'john', 'jane']

const [captain, assistant, ...players] = team

console.log(players)
 

