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

    useEffect(() => setDidMount(true), [])



    const stackDiv = useRef()
    const boundingRect = stackDiv?.current?.getBoundingClientRect()
    const stackState = {
        x: boundingRect?.x,
        y: boundingRect?.y
    }

    const [stackCards, _setStackCards] = useState(cards.map(c => c.id));
    const stackCardsRef = useRef(stackCards)
    const setStackCards = (val) => {
        _setStackCards(val)
        stackCardsRef.current = val
    }

    const [previewCard, setPreviewCard] = useState(-1)

    const [boardCards, _setBoardCards] = useState([])
    const boardCardsRef = useRef(boardCards)
    const setBoardCards = (val) => {
        _setBoardCards(val)
        boardCardsRef.current = val
    }

    const [stackLock, setStackLock] = useState(false)

    function drawCard(cardId) {
        setBoardCards([...boardCardsRef.current, cardId])
        setStackCards(stackCardsRef.current.filter(card => card !== cardId))
    }

    function returnCard(cardId) {
        let cardsInStack = [...stackCardsRef.current]

        let insertionIndex = 0
        while (cardsInStack[insertionIndex] < cardId) insertionIndex ++

        cardsInStack.splice(insertionIndex, 0, cardId)

        setStackCards(cardsInStack)
        setBoardCards([...boardCardsRef.current].filter(card => card.id !== cardId))

    }

    function swapCards(cardInStack, cardOnBoard) {
        let cardsInStack = [...stackCardsRef.current]
        let cardsOnBoard = [...boardCards]

        cardsInStack = cardsInStack.filter(card => card !== cardInStack) // remove card from stack

        let insertionIndex = 0
        while (cardOnBoard > cardsInStack[insertionIndex]) insertionIndex ++

        cardsInStack.splice(insertionIndex, 0, cardOnBoard)

        cardsOnBoard = [cardInStack]

        setBoardCards(cardsOnBoard)
        setStackCards(cardsInStack)
    }

    function shiftCards(card1id, shift) {
        let card1index = stackCardsRef.current.indexOf(card1id)
        let card2index = shift > 0 ? Math.min(stackCardsRef.current.length-1, card1index+shift) : Math.max(0, card1index+shift)
        let card2id = stackCardsRef.current[card2index]

        let cards = [...stackCardsRef.current]
        cards[card1index] = card2id
        cards[card2index] = card1id

        setStackCards(cards)

        return card1index !== card2index
    }

    function onCardClick(cardId) {
        if (boardCardsRef.current.length > 0) {
            swapCards(cardId, boardCardsRef.current[0])
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
                          lock={() => setStackLock(true)}
                          unlock={() => {
                              setStackLock(false)
                          }}
                          locked={stackLock}
                          stackPosition={stackCards.indexOf(card.id)}
                          isActive={boardCards.indexOf(card.id) > -1}
                          stackState={stackState}
                          preview={() => setPreviewCard(card.id)}
                          unpreview={() => setPreviewCard(-1)}
                          dim={previewCard > -1 && previewCard !== card.id}
                          clickHandler={() => onCardClick(card.id)}
                          shift={(s) => shiftCards(card.id, s)}
                    />
                ))
            }
        </div>
    )
}