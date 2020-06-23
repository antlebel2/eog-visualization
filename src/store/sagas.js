import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricSaga from '../Features/MetricsList/saga';
import heartBeatSaga from '../Features/Heartbeat/saga';
import metricsDataSaga from '../Features/MetricsData/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(metricSaga);
  yield spawn(heartBeatSaga);
  yield spawn(metricsDataSaga);
}
