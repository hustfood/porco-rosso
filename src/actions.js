import { createAction, createActions } from 'redux-actions';
import { ACTIONS} from "./constants";

export const set_current_tab = createAction(ACTIONS.SET_CURRENT_TAB, (current_tab) => ({current_tab}));
export const set_unread_message_count = createAction(ACTIONS.SET_UNREAD_MESSAGE_COUNT, (unread_message_count) => ({unread_message_count}));
export const handle_barrage = createActions(
    {
        [ACTIONS.ADD_BARRAGE]: (barrage) => ({barrage}),
        [ACTIONS.DEL_BARRAGE]: (index) => ({index})
    }
);
export const add_message = createAction(ACTIONS.ADD_MESSAGE, (message) => ({message}));
