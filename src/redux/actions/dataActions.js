import { SET_STATS, SET_ANIMALS } from "../types";
import axios from "axios";

export const getAnimals = () => dispatch => {
    axios
        .get("/animals")
        .then(res => {
            dispatch({
                type: SET_ANIMALS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

export const getStats = () => dispatch => {
    axios
        .get("/statistics")
        .then(res => {
            dispatch({
                type: SET_STATS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};
