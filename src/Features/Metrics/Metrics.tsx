import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import MetricSelect from '../../components/MetricSelect';
import { IState } from '../../store';


const client = createClient({
    url: 'https://react.eogresources.com/graphql',
});

const query = `
  query {
      getMetrics
    }
`;

const getMetrics = (state: IState) => {
    const { ...metrics } = state.metrics;
    return {
        metrics
    };
};

export default () => {
    return (
      <Provider value={client}>
        <Metrics />
      </Provider>
    );
  };

  const Metrics = () => {
    const dispatch = useDispatch();
    const { metrics }  = useSelector(getMetrics);
  
    const [result] = useQuery({
      query,
    });

    const { fetching, data, error } = result;
    useEffect(() => {
      if (error) {
        dispatch(actions.metricsApiErrorReceived({ error: error.message }));
        return;
      }
      if (!data) return;
      const { getMetrics } = data;
      dispatch(actions.metricsDataRecevied(getMetrics));
    }, [dispatch, data, error]);

  
    if (fetching) return <LinearProgress />;
    console.log('Metrics', metrics);
    return <MetricSelect metrics={metrics.metrics} />;
};