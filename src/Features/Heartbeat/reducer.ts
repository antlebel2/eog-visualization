import { createSlice, PayloadAction } from 'redux-starter-kit';


export type ApiErrorAction = {
  error: string;
};

export type heartBeat = {
    heartBeat: number;
}

const initialState = {
  heartBeat: 0
};

const slice = createSlice({
  name: 'heartBeat',
  initialState,
  reducers: {
    heartbeatRecevied: (state, action: PayloadAction<heartBeat>) => {
        const { heartBeat } = action.payload;
        state.heartBeat = heartBeat;
    },
    heartbeatApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;