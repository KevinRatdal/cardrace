import {atom} from 'jotai'


/**
 * Curret App State integer
 *  - 0 => setup phase
 *  - 1 => game phase
 *  - 3 => finish phase
 * @returns {import('jotai').PrimitiveAtom<number>}
 */
export const appState = atom(0)


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

export const playerDataState = atom({})
