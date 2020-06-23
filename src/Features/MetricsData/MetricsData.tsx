import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import Graph from '../../components/Graph';

const client = createClient({
    url: 'https://react.eogresources.com/graphql',
});

const query = `
query($input: MeasurementQuery) {
  getMeasurements(input: $input) {
    metric
    at
    value
    unit
  }
}
`;

const getMetricsData = (state: IState) => {
    const { metricsData } = state.metricsData;
    const metric = 'waterTemp';
    const heartBeat = state.heartBeat.heartBeat;
    return {
        metricsData,
        metric,
        heartBeat,
    };
};

export default () => {
    return (
        <Provider value={client}>
            <MetricsData />
        </Provider>
    );
};

const MetricsData = () => {

    const dispatch = useDispatch();

    const { metricsData } = useSelector(getMetricsData);
    const { heartBeat } = useSelector(getMetricsData);
    console.log('HearttBeat', heartBeat);
    const after = heartBeat - 1800;
    console.log('After ', after);


    const input = {
        metricName: 'waterTemp',
        after: after,
    };
    console.log('Input ', input);
    const [result] = useQuery({
        query,
        variables: {
            input,
        },
    });
    console.log('ResultQuery ', result);
    const { fetching, data, error } = result;
    useEffect(() => {
        if (error) {
            dispatch(actions.metricsDataApiErrorReceived({ error: error.message }));
            return;
        }
        if (!data) return;
        const { getMeasurements } = data;
        dispatch(actions.metricsDataRecevied(getMeasurements));
    }, [dispatch, data, error]);

    if (fetching) return <LinearProgress />;
    return <Graph props={metricsData} />;
};
