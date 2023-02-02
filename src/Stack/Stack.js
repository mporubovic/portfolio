import './Stack.css'
import Card from "../Card/Card";
import {useEffect, useRef, useState} from "react";

import AboutMe from "../Cards/AboutMe/AboutMe";
import Cube from "../Cards/Cube/Cube";
import dsocWebsite from "../Cards/dsocWebsite/dsocWebsite";
import dsocDesigns from "../Cards/dsocDesigns/dsocDesigns";
import tutoringApp from "../Cards/tutoringApp/tutoringApp";
import photography from "../Cards/photography/photography";
import icons from "../Cards/common/Icons/iconAssets";

// Gradient credits:  https://gradienta.io

const __cards = [
    {text: "About Me", component: AboutMe, icon: icons.stack},
    {text: "Cube", component: Cube, icon: icons.cards.cube},
    {text: "dSoc Website", component: dsocWebsite, icon: icons.cards.dsoc},
    {text: "dSoc Designs", component: dsocDesigns, icon: icons.figma_white},
    {text: "Tutoring App", component: tutoringApp, icon: icons.cards.mylayr},
    {text: "Photography", component: photography, icon: icons.camera},
]

const defaultCard = 0

export default function Stack() {


    const [cards, setCards] = useState(() => {
        let _cards = []
        for (let i = 0; i < __cards.length; i++) {
            _cards.push({
                ...__cards[__cards.length - 1 - i],
                id: __cards.length - 1 - i,
                stackPosition: i,
            })
        }
        return _cards
    });

    const stackContext = {
        drawCard
    }

    const [stackCards, _setStackCards] = useState(cards.map(c => c.id));
    const stackCardsRef = useRef(stackCards)
    const setStackCards = (val) => {
        _setStackCards(val)
        stackCardsRef.current = val
    }

    const [previewCard, setPreviewCard] = useState(-1)

    const [boardCard, _setBoardCard] = useState(defaultCard)
    const boardCardRef = useRef(boardCard)
    const setBoardCard = (val) => {
        _setBoardCard(val)
        boardCardRef.current = val
    }

    const [stackLock, setStackLock] = useState(false)

    function drawCard(cardId) {
        if (boardCardRef.current !== -1) {
            swapCards(cardId, boardCardRef.current)
        } else {
            setBoardCard(cardId)
            setStackCards(stackCardsRef.current.filter(card => card !== cardId))
        }
    }

    function returnCard(cardId) {
        let cardsInStack = [...stackCardsRef.current]
        if (boardCardRef.current === -1 ) return

        let insertionIndex = 0
        while (cardsInStack[insertionIndex] > cardId) insertionIndex ++

        cardsInStack.splice(insertionIndex, 0, cardId)

        setBoardCard(-1)
        setStackCards(cardsInStack)


    }

    function swapCards(cardInStack, cardOnBoard) {
        let cardsInStack = [...stackCardsRef.current]

        cardsInStack = cardsInStack.filter(card => card !== cardInStack) // remove card from stack

        // let insertionIndex = cardsInStack.length
        let insertionIndex = 0
        while (cardsInStack[insertionIndex] > cardOnBoard) insertionIndex ++

        cardsInStack.splice(insertionIndex, 0, cardOnBoard)

        setBoardCard(cardInStack)
        setStackCards(cardsInStack)
    }

    function shiftCards(card1id, shift) {
        let card1index = stackCardsRef.current.indexOf(card1id)
        let card2index = shift > 0 ? Math.min(stackCardsRef.current.length-1, card1index+shift) : Math.max(0, card1index+shift)
        let card2id = stackCardsRef.current[card2index]

        if (card1index === card2index) return false

        let cards = [...stackCardsRef.current]
        cards[card1index] = card2id
        cards[card2index] = card1id

        setStackCards(cards)

        return card1index !== card2index
    }

    function onCardClick(cardId) {
        drawCard(cardId)
    }

    function onKeyDown(event) {
        if (event.key === "Escape") returnCard(boardCardRef.current)
    }

    function stateChange(id, previous, current) {
        //
    }

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown)

        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    return (
        <>
            {
                cards.map(card => (
                    <Card key={card.id}
                          id={card.id}

                          content={card}

                          lock={() => setStackLock(true)}
                          unlock={() => setStackLock(false)}
                          locked={stackLock}

                          isActive={boardCard === card.id}
                          stackPosition={stackCards.indexOf(card.id)}
                          stackContext={stackContext}

                          preview={() => setPreviewCard(card.id)}
                          unpreview={() => setPreviewCard(-1)}
                          dim={previewCard > -1 && previewCard !== card.id}
                          stateChange={(previous, current) => stateChange(card.id, previous, current)}

                          clickHandler={() => onCardClick(card.id)}
                          shift={(s) => shiftCards(card.id, s)}
                    />
                ))
            }
        </>
    )
}