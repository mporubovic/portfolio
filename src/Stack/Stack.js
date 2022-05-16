import './Stack.css'
import Card from "../Card/Card";
import {useEffect, useRef, useState} from "react";
import {randomColor} from "../util";

export default function Stack() {

    const [cards, setCards] = useState(() => {
        let _cards = []
        for (let i = 0; i < 5; i++) {
            _cards.push({id: i, color: randomColor(), stackPosition: i})
        }
        return _cards
    });

    const [didMount, setDidMount] = useState(false)

    useEffect(() => setDidMount(true))

    const stackDiv = useRef()
    const boundingRect = stackDiv?.current?.getBoundingClientRect()
    const stackState = {
        x: boundingRect?.x,
        y: boundingRect?.y
    }

    const [stackCards, setStackCards] = useState(() => {
        let _ = []
        cards.forEach(c => _.push(c.id))
        return _
    });

    const [boardCards, setBoardCards] = useState([])

    function drawCard(cardId) {
        setBoardCards([...boardCards, cardId])
        setStackCards(stackCards.filter(card => card !== cardId))
    }

    function returnCard(cardId) {
        let cardsInStack = [...stackCards]

        let insertionIndex = 0
        while (cardsInStack[insertionIndex] < cardId) insertionIndex ++

        cardsInStack.splice(insertionIndex, 0, cardId)

        setStackCards(cardsInStack)
        setBoardCards([...boardCards].filter(card => card.id !== cardId))

        console.log(cardsInStack, stackCards)
    }

    function swapCards(cardInStack, cardOnBoard) {
        let cardsInStack = [...stackCards]
        let cardsOnBoard = [...boardCards]

        cardsInStack = cardsInStack.filter(card => card !== cardInStack) // remove card from stack

        let insertionIndex = 0
        while (cardOnBoard > cardsInStack[insertionIndex]) insertionIndex ++

        cardsInStack.splice(insertionIndex, 0, cardOnBoard)

        cardsOnBoard = [cardInStack]

        setBoardCards(cardsOnBoard)
        setStackCards(cardsInStack)
    }

    function onCardClick(cardId) {
        if (boardCards.length > 0) {
            swapCards(cardId, boardCards[0])
        } else {
            drawCard(cardId)
        }
    }

    return (
        <div className="Stack" ref={stackDiv}>
            {
                didMount && cards.map(card => (
                    <Card id={card.id}
                          key={card.id}
                          stackPosition={stackCards.indexOf(card.id)}
                          isActive={boardCards.indexOf(card.id) > -1}
                          stackState={stackState}
                          clickHandler={() => onCardClick(card.id)}>
                    </Card>
                ))
            }
        </div>
    )
}