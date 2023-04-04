//Crear un array de tarjetas aleatorio

import symbols from "./symbols";

//0:8, 1:16, 2:24
const arrCardRand = (numCards) => {
    //No. de simbolos en total
    const halfCards = numCards / 2;

    const arr = [];
    let i = 0, j = 0;
    while (i < numCards) {
        if (j === halfCards) j = 0;
        let random = Math.floor(Math.random() * numCards); //0-7 elementos
        if (!arr.some(item => item.id === random)) {
            arr.push({
                id: random,
                symbol: symbols[j],
                bind: j,
                rotate: false,
                validating: 0,
                set: 0
            });
            i++;
            j++;
        }
    }

    return arr;
}

export default arrCardRand;