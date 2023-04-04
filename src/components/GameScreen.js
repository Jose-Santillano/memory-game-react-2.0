import { useEffect, useState } from "react";

//Componentes
import Button from "./Button";
import Card from "./Card";

//Scripts
import arrCardRand from "../logic/createArrCardsRand";
import convertTimer from "../logic/convertTimer";

export default function GameScreen(props) {

    //Variables de estado
    const [cardsArr, setCardsArr] = useState([]);
    const [moves, setMoves] = useState(0);
    //  Control de clicks.
    const [clicksAmount, setClicksAmount] = useState(0);

    //Generamos una unica ves el array aleatorio
    useEffect(() => {
        setCardsArr(arrCardRand(props.numCard));
    }, [props.numCard]);

    useEffect(() => {
        console.log(clicksAmount);
        if(clicksAmount>=2){
            setTimeout(() => setClicksAmount(0), 2000);
            console.log("reinicio de clicks.");
        };
    }, [clicksAmount])

    //Funcion para rotar la tarjeta
    const rotate = (id, set) => {

        if(clicksAmount<2){    

            //Aumentamos limite de clicks por cada movimiento.
            setClicksAmount(clicksAmount + 1);

            //Aumentamos la cantidad de movimientos por cada rotación.
            setMoves(moves + 1);

            if (set === 0) {
                setCardsArr(prevArr => {
                    prevArr[id].rotate = true;
                    prevArr[id].validating = 1; //Indica que este elemento que esta siendo evaluado.
                    return [...prevArr];
                });
                setInterval(() => validate(), 2000);
            }
        }
    }

    //Funcion para validar las tarjetas (iguales o no)
    const validate = () => {

        //Obtenemos los dos elementos filtrandolos.
        const validatingCards = cardsArr.filter(card => card.validating === 1);
        
        if (validatingCards.length === 2) {
            if (validatingCards[0].bind !== validatingCards[1].bind) {
                //La validacion no coincide
                //Le damos tiempo de 1 segundo para que valide mas lento cuando
                //son cartas incorrectas.
                setTimeout(() => {
                    setCardsArr(prevArr => {
                        prevArr[validatingCards[0].id].rotate = false;
                        prevArr[validatingCards[0].id].validating = 0;
                        prevArr[validatingCards[1].id].rotate = false;
                        prevArr[validatingCards[1].id].validating = 0;
                        return [...prevArr];
                    });
                }, 1000);
            } else {
                //La validacion coincide
                setCardsArr(prevArr => {
                    prevArr[validatingCards[0].id].set = 1;
                    prevArr[validatingCards[0].id].validating = 0;
                    prevArr[validatingCards[1].id].set = 1;
                    prevArr[validatingCards[1].id].validating = 0;
                    return [...prevArr];
                });                
            }
        }
    }

    //Mostramos la pantalla final cuando el juego se completa.
    useEffect(() => {
        const arraySet1 = cardsArr.filter(element => element.set === 1);
        if (arraySet1.length === props.numCard) setTimeout(() => props.setFinish(2), 1000);
    }, [cardsArr]);
    
    return (
        <div className="gamescreen">
            <div className="gamescreen--score grid grid-2">
                <div className="gamescreen--moves">
                    <p>Moves: {moves}</p>
                </div>
                <div className="gamescreen--time text-right">
                    <p className="">Time: {convertTimer(props.time)}</p>
                </div>
            </div>
            <div className="gamescreen--cards grid grid-4">
                {
                    cardsArr
                        .sort((a, b) => a.id - b.id)
                        .map(card => {
                            return <Card
                                key={card.id}
                                id={card.id}
                                rotate={card.rotate}
                                symbol={card.symbol}
                                bind={card.bind}
                                set={card.set}
                                actionRotate={rotate}
                            />
                        })
                }
            </div>
            <div className="text-center">
                <Button label="Restart game" action={props.setRestart} />
            </div>
        </div>
    );
}