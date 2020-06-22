import React from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import { IState } from '../store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            background: theme.palette.secondary.main,
            margin: theme.spacing(1),
            minWidth: 300,
            maxWidth: 300,
            position: 'relative',
            alignSelf: 'flex-end',
        },
    }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(metric: string, metrics: string[], theme: Theme) {
    return {
        fontWeight:
            metrics.indexOf(metric) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MetricSelect = (props: any) => {
    const classes = useStyles();
    const theme = useTheme();
    const [metricSelected, setMetricSelected] = React.useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setMetricSelected(event.target.value as string[]);
    };

    const metricList = props.metrics;

    return (
        <div style={{float:'right'}}>
            <FormControl className={classes.formControl}>
                <InputLabel id="mutiple-metrics-label">Metrics</InputLabel>
                <Select
                    labelId="mutiple-metrics-label"
                    id="mutiple-metrics"
                    multiple
                    value={metricSelected}
                    onChange={handleChange}
                    input={<Input />}
                    MenuProps={MenuProps}
                >
                    {metricList.map((metric:string) => (
                        <MenuItem key={metric} value={metric} style={getStyles(metric, metricSelected, theme)}>
                            {metric}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default MetricSelect;


