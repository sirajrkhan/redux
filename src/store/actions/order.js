import * as actionTypes from './actionTypes';

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrdersSuccess = (order) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        order: order
    };
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};
