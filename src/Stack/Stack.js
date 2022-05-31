import './Stack.css'
import Card from "../Card/Card";
import {useEffect, useRef, useState} from "react";

import AboutMe from "../Cards/AboutMe/AboutMe";
import Cube from "../Cards/Cube/Cube";

// Gradient credits:  https://gradienta.io

const __cards = [
    {text: "About Me", component: AboutMe, background: {background: "linear-gradient(115deg, rgb(0, 0, 0) 0%, rgb(0, 197, 8) 55%, rgb(0, 0, 0) 100%), linear-gradient(115deg, rgb(0, 87, 255) 0%, rgb(5 3 160) 100%), conic-gradient(from 110deg at -5% 35%, rgb(0 0 0) 0deg, rgb(250, 255, 0) 360deg), conic-gradient(from 220deg at 30% 30%, rgb(255, 0, 0) 0deg, rgb(0, 0, 255) 220deg, rgb(23 0 162) 360deg), conic-gradient(from 235deg at 60% 35%, rgb(0, 137, 215) 0deg, rgb(0, 0, 255) 180deg, rgb(36, 0, 96) 360deg)",
backgroundBlendMode: "soft-light, soft-light, overlay, screen, normal"}},
    // {text: "Portfolio", background: {background: "radial-gradient(100% 225% at 100% 0%, #120037 0%, #000000 100%), linear-gradient(35deg, #C0FFC7 0%, #17001F 75%), linear-gradient(55deg, #2400FF 0%, #000000 100%), linear-gradient(90deg, #FFE037 0%, #FFE037 40%, #1DCD9F 40%, #1DCD9F 50%, #088C6F 50%, #088C6F 70%, #23033C 70%, #23033C 100%), linear-gradient(180deg, #FF8FE5 0%, #FF8FE5 45%, #FBFF64 45%, #FBFF64 60%, #76E3FF 60%, #76E3FF 80%, #6EB6E7 80%, #6EB6E7 100%)",
// backgroundBlendMode: "screen, overlay, overlay, darken, normal"}},
    {text: "Cube", component: Cube, background: {background: "conic-gradient(from 30deg, rgb(53 53 53) 0%, rgb(15 15 15) 33.3%, rgb(38 38 38) 33.4%, rgb(28 28 28) 66.6%, rgb(54 54 54) 66.7%, rgb(33 33 33) 100%, rgb(0 0 0) 100%)"}},
    {text: "Society Website", background: {background: "linear-gradient(180deg, #A90051 0%, #1E0031 100%), linear-gradient(121.28deg, #340067 0%, #000000 38.54%), linear-gradient(180deg, #00FF19 0%, #000000 100%), linear-gradient(294.84deg, #FF0000 0%, #450000 100%), linear-gradient(121.28deg, #32003A 0%, #FF4040 100%), radial-gradient(50% 72.12% at 50% 50%, #EB00FF 0%, #110055 100%)",
backgroundBlendMode: "color-dodge, screen, overlay, exclusion, difference, normal"}},
    {text: "Society Designs", background: {background: "linear-gradient(235deg, #FFFFFF 0%, #000F25 100%), linear-gradient(180deg, #6100FF 0%, #000000 100%), linear-gradient(235deg, #FFA3AC 0%, #FFA3AC 40%, #00043C calc(40% + 1px), #00043C 60%, #005D6C calc(60% + 1px), #005D6C 70%, #00C9B1 calc(70% + 1px), #00C9B1 100%), linear-gradient(125deg, #FFA3AC 0%, #FFA3AC 40%, #00043C calc(40% + 1px), #00043C 60%, #005D6C calc(60% + 1px), #005D6C 70%, #00C9B1 calc(70% + 1px), #00C9B1 100%)",
backgroundBlendMode: "soft-light, screen, darken, normal"}},
    {text: "Tutoring App", background: {background: "radial-gradient(65% 100% at 50% 0%, #00FF94 0%, rgba(0, 255, 148, 0.25) 100%), linear-gradient(230deg, #000000 25%, #170059 100%), linear-gradient(215deg, #FFEBB9 10%, #19004E 80%), radial-gradient(100% 245% at 100% 100%, #FFFFFF 0%, #000353 100%), linear-gradient(125deg, #1400FF 0%, #3A0000 100%), linear-gradient(225deg, #00F0FF 30%, #000B6F 45%, #00EBFC 45%, #001676 65%, #00E1F6 65%, #001676 85%, #00ECFD 85%, #001676 100%), linear-gradient(135deg, #00F0FF 0%, #000B6F 15%, #00EBFC 15%, #001676 35%, #00E1F6 35%, #001676 55%, #00ECFD 55%, #001676 100%)",
backgroundBlendMode: "soft-light, screen, overlay, overlay, difference, overlay, normal"}},
    {text: "Photography", background: {background: "linear-gradient(45deg, rgb(0 0 0) 0%, rgb(0, 3, 32) 100%), radial-gradient(100% 225% at 100% 0%, rgb(255, 105, 40) 0%, rgb(145 65 0) 100%), linear-gradient(225deg, rgb(255, 122, 0) 0%, rgb(126 46 0) 100%), linear-gradient(135deg, rgb(205, 255, 235) 10%, rgb(205, 255, 235) 35%, rgb(0, 159, 157) 35%, rgb(0, 159, 157) 60%, rgb(7, 69, 111) 60%, rgb(7, 69, 111) 67%, rgb(15, 10, 60) 67%, rgb(15, 10, 60) 100%)",
backgroundBlendMode: "screen, overlay, hard-light, normal"}},
]

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

    const [didMount, setDidMount] = useState(false)

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

    const [boardCard, _setBoardCard] = useState(-1)
    // const [boardCard, _setBoardCard] = useState(0)
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

        // debugger

        let insertionIndex = 0
        // while (cardsInStack[insertionIndex] < cardId) insertionIndex ++

        cardsInStack.splice(insertionIndex, 0, cardId)

        setBoardCard(-1)
        setStackCards(cardsInStack)


    }

    function swapCards(cardInStack, cardOnBoard) {
        let cardsInStack = [...stackCardsRef.current]

        cardsInStack = cardsInStack.filter(card => card !== cardInStack) // remove card from stack

        // let insertionIndex = cardsInStack.length
        let insertionIndex = 0
        // while (cardOnBoard > cardsInStack[insertionIndex]) insertionIndex ++

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
        console.log(event)
        if (event.key === "Escape") returnCard(boardCardRef.current)
    }

    function stateChange(id, previous, current) {
        // console.log(id, previous, current)
        if (id === 0 && previous === "initial" && current === "initial-to-stack") drawCard(0)
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