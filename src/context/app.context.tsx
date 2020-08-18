import * as React from 'react';

interface IState {
  filters: string[];
}

interface IActionCreator {
  type: string;
  data: any;
}

type IDispatch = ({ type, data }: { type: string; data: any }) => null | void;

type IReducer = (state: IState, action: IActionCreator) => IState;

interface IActionType {
  ADD_FILTER: string;
  REMOVE_FILTER: string;
}

const initialState: IState = {
  filters: [],
};

export const actionType: IActionType = {
  ADD_FILTER: 'ADD_FILTER',
  REMOVE_FILTER: 'REMOVE_FILTER',
};

const reducer: IReducer = (state, action) => {
  switch (action.type) {
    case actionType.ADD_FILTER: {
      const cloned = Array.from(state.filters);
      cloned.push(action.data);
      return {
        ...state,
        filters: cloned,
      };
    }
    case actionType.REMOVE_FILTER: {
      const cloned = Array.from(state.filters);
      const itemIndex = cloned.findIndex((item) => item === action.data);

      if (itemIndex >= 0) {
        cloned.splice(itemIndex, 1);
      }
      return {
        ...state,
        filters: cloned,
      };
    }
    default:
      return state;
  }
};

const AppStateContext = React.createContext<IState | undefined>(initialState);
const AppDispatchContext = React.createContext<IDispatch | undefined>(
  undefined
);

export function useAppState() {
  const state = React.useContext(AppStateContext);

  if (state === undefined) {
    throw new Error('You can only use useAppState inside a context provider');
  }

  return state;
}

export function useAppDispatch() {
  const dispatch = React.useContext(AppDispatchContext);

  if (dispatch === undefined) {
    throw new Error(
      'You can only use useAppDispatch inside a context provider'
    );
  }

  return dispatch;
}

export function AppProvider({ children }: { children: any }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
