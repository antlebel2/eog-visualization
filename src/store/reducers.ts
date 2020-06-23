import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/MetricsList/reducer';
import { reducer as heartbeatReducer } from '../Features/Heartbeat/reducer';
import { reducer as metricsDataReducer } from '../Features/MetricsData/reducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  heartBeat: heartbeatReducer,
  metricsData: metricsDataReducer,
};

