import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';

import { ACTIONS } from "./actions";
import { TABS, ADMIN_TABS } from "./constants";
const { HOME_TAB } = TABS;
const { VOTE_TAB } = ADMIN_TABS;

const current_tab = handleAction(
    ACTIONS.SET_CURRENT_TAB,
    (state, action) => (action.payload.current_tab),
    HOME_TAB
);

const admin_current_tab = handleAction(
    ACTIONS.SET_ADMIN_CURRENT_TAB,
    (state, action) => (action.payload.admin_current_tab),
    VOTE_TAB
);

const vote_enable = handleAction(
    ACTIONS.SET_VOTE_ENABLE,
    (state, action) => (action.payload.vote_enable),
    true
);

const unread_message_count = handleActions(
    {
        [ACTIONS.ADD_UNREAD_MESSAGE_COUNT]: (state, action) => (state<10 ? state+1 : '...'),
        [ACTIONS.SET_UNREAD_MESSAGE_COUNT]: (state, action) => (action.payload.unread_message_count),
    },
    0
);

const messages = handleAction(
    ACTIONS.ADD_MESSAGE,
    (state, action) => ([...state, action.payload.message]),
    []
);

const barrages = handleActions(
    {
        [ACTIONS.ADD_BARRAGE]: (state, action) => (
            [...state, {
                barrage: action.payload.barrage,
                width: action.payload.width,
                height: action.payload.height,
                color: action.payload.color,
                timestamp: action.payload.timestamp
            }]),
        [ACTIONS.DEL_BARRAGE]: (state, action) => {
            let newItems = state.slice();
            let delIndex = newItems.findIndex(x => x.timestamp === action.payload.timestamp);
            return [...state.slice(0, delIndex), ...state.slice(delIndex + 1)]
        }
    },
    []
);

const reducer = combineReducers({
    current_tab,
    admin_current_tab,
    vote_enable,
    unread_message_count,
    messages,
    barrages
});

export default reducer

