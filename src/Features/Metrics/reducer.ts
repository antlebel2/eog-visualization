import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metrics: [] as string[],
  metricSelected: '',
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<string[]>) => {
        console.log('Action ', action.payload);
        state.metrics = action.payload;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    metricOnChange: (state, action) => {
        console.log('OnChange ', action);
        state.metricSelected = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;