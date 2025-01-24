const initialState = {
    bikes: [],
};
export const bikeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_BIKES': {
       return {
        ...state,
        bikes: action.payload,
       }

    }
    default:
        return state;
}}