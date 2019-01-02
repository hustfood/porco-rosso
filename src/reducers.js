import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';
import { ACTIONS } from "./constants";

import { TABS} from "./constants";
const { HOME_TAB } = TABS;

const current_tab = handleAction(
    ACTIONS.SET_CURRENT_TAB,
    (state, action) => (action.payload.current_tab),
    HOME_TAB
);

const unread_message_count = handleAction(
    ACTIONS.SET_UNREAD_MESSAGE_COUNT,
    (state, action) => (action.payload.unread_message_count),
    0
);

const messages = handleAction(
    ACTIONS.ADD_MESSAGE,
    (state, action) => ([...state, action.payload.message]),
    []
);

const barrages = handleActions(
    {
        [ACTIONS.ADD_BARRAGE]: (state, action) => ([...state, action.payload.barrage]),
        [ACTIONS.DEL_BARRAGE]: (state, action) => ([...state.slice(0, action.payload.index), ...state.slice(action.payload.index + 1)]),
    },
    []
);

const reducer = combineReducers({
    current_tab,
    unread_message_count,
    messages,
    barrages
});

export default reducer

