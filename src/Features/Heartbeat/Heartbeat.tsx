import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import MetricsData from '../MetricsData/MetricsData';
//import { IState } from '../../store';

const client = createClient({
    url: 'https://react.eogresources.com/graphql',
});

const query = `
query {
  heartBeat
}
`;

// const getHeartbeat = (state: IState) => {
//     const { heartBeat } = state.heartBeat;
//     return {
//         heartBeat,
//     };
// };

export default () => {
    return (
        <Provider value={client}>
            <Heartbeat />
        </Provider>
    );
};

const Heartbeat = () => {
    const dispatch = useDispatch();
    //const heartBeat = useSelector(getHeartbeat);

    const [result] = useQuery({ query });
    const { fetching, data, error } = result;
    useEffect(() => {
        if (error) {
            dispatch(actions.heartbeatApiErrorReceived({ error: error.message }));
            return;
        }
        if (!data) return;
        const { heartBeat } = data;
        console.log('Heartbeat ', heartBeat);
        dispatch(actions.heartbeatRecevied(heartBeat));
    }, [dispatch, data, error]);


    if (fetching) return <LinearProgress />;
    return <MetricsData  />;
};