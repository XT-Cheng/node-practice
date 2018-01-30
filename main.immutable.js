let Immutable = require('seamless-immutable');

let obj = {
    cities: {
        '1': {
            id: '1',
            name: 'city1'
        },
        '2': {
            id: '2',
            name: 'city2'
        },
        '3': {
            id: '3',
            name: 'city3'
        }
    },
    viewPoints: {
        '4': {
            id: '4',
            name: 'vp1',
            city: '1'
        },
        '5': {
            id: '5',
            name: 'vp1',
            city: '2'
        },
        '6': {
            id: '6',
            name: 'vp1',
            city: '3'
        },
    }
}

let iObj = Immutable(obj);

//Without test
let newCities = Immutable.without(iObj.cities, '1');

let ret = Immutable.set(iObj,'cities',newCities);

console.log(ret == iObj);
console.log(ret.cities == iObj.cities);
console.log(ret.cities['2'] == iObj.cities['2']);
console.log(ret.cities['3'] == iObj.cities['3']);