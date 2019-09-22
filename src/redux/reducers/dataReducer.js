import { SET_STATS, SET_ANIMALS } from "../types";

const initialState = {
    animals: [],
    stats: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ANIMALS:
            return {
                ...state,
                animals: action.payload
            };
        case SET_STATS:
            return {
                ...state,
                stats: action.payload
            };
        default:
            return state;
    }
}
