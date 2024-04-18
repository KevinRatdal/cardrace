import {atom} from 'jotai'
import { atomWithStorage } from 'jotai/utils'


/**
 * Curret App State integer
 *  - 0 => setup phase
 *  - 1 => game phase
 *  - 3 => finish phase
 * @returns {import('jotai').PrimitiveAtom<number>}
 */
export const appState = atom(2)


// eslint-disable-next-line no-unused-vars
const _defaultPlayerState = {
    "3b97f64568c": {
        "id": "3b97f64568c",
        "name": "kev",
        "suit": "hearts",
        "wager": "5"
    },
    "b97f64568c9": {
        "id": "b97f64568c9",
        "name": "test",
        "suit": "clubs",
        "wager": "3"
    }
}

export const playerDataState = atomWithStorage('cardGameplayers', {})

const _defaultGameStats = [
    {
        "players": {
            "8ccb8338936": {
                "id": "8ccb8338936",
                "name": "kev",
                "suit": "diamonds",
                "wager": "5"
            },
            "ff798a42c5d": {
                "id": "ff798a42c5d",
                "name": "test",
                "suit": "hearts",
                "wager": "2"
            },
            "f798a42c5d3": {
                "id": "f798a42c5d3",
                "name": "testing",
                "suit": "clubs",
                "wager": "3"
            },
            "798a42c5d3c": {
                "id": "798a42c5d3c",
                "name": "binf",
                "suit": "spades",
                "wager": "2"
            },
            "98a42c5d3ce": {
                "id": "98a42c5d3ce",
                "name": "bong",
                "suit": "diamonds",
                "wager": "2"
            }
        },
        "gameResults": {
            "cardStack": {
                "cards": [
                    {
                        "suit": "clubs",
                        "variant": "Q"
                    },
                    {
                        "suit": "hearts",
                        "variant": "6"
                    },
                    {
                        "suit": "diamonds",
                        "variant": "3"
                    },
                    {
                        "suit": "clubs",
                        "variant": "J"
                    },
                    {
                        "suit": "diamonds",
                        "variant": "2"
                    },
                    {
                        "suit": "spades",
                        "variant": "J"
                    },
                    {
                        "suit": "clubs",
                        "variant": "3"
                    },
                    {
                        "suit": "spades",
                        "variant": "6"
                    },
                    {
                        "suit": "hearts",
                        "variant": "9"
                    },
                    {
                        "suit": "spades",
                        "variant": "8"
                    },
                    {
                        "suit": "clubs",
                        "variant": "5"
                    },
                    {
                        "suit": "clubs",
                        "variant": "K"
                    },
                    {
                        "suit": "clubs",
                        "variant": "9"
                    },
                    {
                        "suit": "clubs",
                        "variant": "7"
                    },
                    {
                        "suit": "hearts",
                        "variant": "5"
                    },
                    {
                        "suit": "clubs",
                        "variant": "4"
                    },
                    {
                        "suit": "hearts",
                        "variant": "4"
                    },
                    {
                        "suit": "hearts",
                        "variant": "Q"
                    },
                    {
                        "suit": "spades",
                        "variant": "7"
                    },
                    {
                        "suit": "spades",
                        "variant": "Q"
                    },
                    {
                        "suit": "hearts",
                        "variant": "K"
                    },
                    {
                        "suit": "diamonds",
                        "variant": "K"
                    },
                    {
                        "suit": "clubs",
                        "variant": "6"
                    },
                    {
                        "suit": "hearts",
                        "variant": "J"
                    }
                ]
            },
            "penalties": [
                {
                    "card": {
                        "suit": "hearts",
                        "variant": "7"
                    },
                    "pos": 1,
                    "flipped": true,
                    "applied": true
                },
                {
                    "card": {
                        "suit": "diamonds",
                        "variant": "4"
                    },
                    "pos": 2,
                    "flipped": true,
                    "applied": true
                },
                {
                    "card": {
                        "suit": "diamonds",
                        "variant": "9"
                    },
                    "pos": 3,
                    "flipped": false,
                    "applied": false
                },
                {
                    "card": {
                        "suit": "hearts",
                        "variant": "8"
                    },
                    "pos": 4,
                    "flipped": false,
                    "applied": false
                },
                {
                    "card": {
                        "suit": "clubs",
                        "variant": "10"
                    },
                    "pos": 5,
                    "flipped": false,
                    "applied": false
                },
                {
                    "card": {
                        "suit": "diamonds",
                        "variant": "6"
                    },
                    "pos": 6,
                    "flipped": false,
                    "applied": false
                }
            ],
            "lastFlippedCard": {
                "suit": "spades",
                "variant": "3"
            },
            "winningCard": {
                "suit": "spades",
                "variant": "A"
            },
            "lanes": [
                {
                    "card": {
                        "suit": "hearts",
                        "variant": "A"
                    },
                    "pos": 2
                },
                {
                    "card": {
                        "suit": "spades",
                        "variant": "A"
                    },
                    "pos": 7
                },
                {
                    "card": {
                        "suit": "diamonds",
                        "variant": "A"
                    },
                    "pos": 1
                },
                {
                    "card": {
                        "suit": "clubs",
                        "variant": "A"
                    },
                    "pos": 2
                }
            ],
            "round": 18,
            "config": {
                "WIN": 8,
                "PENALTY": "all"
            }
        }
    }
]

export const gameStats = atom(_defaultGameStats)
