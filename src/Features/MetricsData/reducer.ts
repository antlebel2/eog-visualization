import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricsData = {
    metric: string;
    at: number;
    value: number;
    unit: string;
  };

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metricsData: [] as MetricsData[],
};

const slice = createSlice({
  name: 'metricsData',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<MetricsData[]>) => {
        const metricsData  = action.payload;
        state.metricsData = metricsData;
    },
    metricsDataApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;