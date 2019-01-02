import { createAction, createActions } from 'redux-actions';

export const ACTIONS = {
    SET_CURRENT_TAB: "SET_CURRENT_TAB",
    SET_UNREAD_MESSAGE_COUNT: "SET_UNREAD_MESSAGE_COUNT",
    ADD_BARRAGE: "ADD_BARRAGE",
    DEL_BARRAGE: "DEL_BARRAGE",
    ADD_MESSAGE: "ADD_MESSAGE"
};

export const set_current_tab = createAction(ACTIONS.SET_CURRENT_TAB, (current_tab) => ({current_tab}));
export const set_unread_message_count = createAction(ACTIONS.SET_UNREAD_MESSAGE_COUNT, (unread_message_count) => ({unread_message_count}));
export const handle_barrage = createActions(
    {
        [ACTIONS.ADD_BARRAGE]: (barrage, width, height, color, timestamp) => ({barrage, width, height, color, timestamp}),
        [ACTIONS.DEL_BARRAGE]: (timestamp) => ({timestamp})
    }
);
export const add_message = createAction(ACTIONS.ADD_MESSAGE, (message) => ({message}));