import { useState, useEffect } from 'react';
import { Grid, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Loader from "react-loader-spinner";
import { makeStyles } from '@material-ui/core/styles';
import theme from './Theme.js';

const useStyles = makeStyles((tempTheme) => ({

    basebox: {
        marginTop: tempTheme.spacing(4),
        marginBottom: tempTheme.spacing(4)
    },

    date: {
        textAlign: 'center',
        fontFamily: 'monospace',
        fontWeight: '600',
        padding: tempTheme.spacing(1),
        marginBottom: tempTheme.spacing(4)
    },
    
    tableContainer: {
        maxHeight: '400px'
    },

    table: {
        minWidth: '50vw',
    },

    baserow: {
        backgroundColor: theme.palette.background.main 
    },

    celltext: {
        fontWeight: '700',
    },

    moneytext: {
        fontFamily: 'monospace',
        fontWeight: '700',
        fontSize: '1.5em'
    }
}));

const Body = () => {

    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(true);
    const [rates, setRates] = useState([]);

    const [baseInfo, setBaseInfo] = useState({
        base: "",
        date: "",
    });

    useEffect(() => {
        // Getting the data
        fetch("https://api.exchangeratesapi.io/latest")
        .then(res => res.json())
        .then(
            (data) => {
                setBaseInfo({
                    base: data.base,
                    date: data.date
                })

                console.log(data.rates);

                for (var key in data.rates) {
                    setRates(rates => [
                        ...rates,
                        {
                            symbol: key,
                            value: parseFloat(data.rates[key]).toPrecision(5)
                        }
                    ]);
                }

                setIsLoading(false);
            }
        )
    }, []);

    if (isLoading) {
        return (
            <Grid container direction='column' alignItems="center" className={classes.basebox}>
                <Loader 
                    type="Rings"
                    color={theme.palette.background.main}
                    height={300}
                    width={300}
                />
            </Grid>
            
        )
    } else {
        return (
            <Grid container direction='column' alignItems="center" className={classes.basebox}>
                <Grid item xs>
                    <Paper>
                        <Typography variant='h4' className={classes.date}>
                            {new Date(baseInfo.date).toDateString()}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table stickyHeader className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' className={classes.baserow}>
                                        <Typography color='primary' className={classes.celltext} align='center'>
                                            {baseInfo.base}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='center' className={classes.baserow}>
                                        <Typography color='primary' className={classes.moneytext} align='center'>
                                            1.0000
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rates.map((rate) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            <Typography className={classes.celltext} align='center'>
                                                {rate.symbol}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography className={classes.moneytext} align='center'>
                                                {rate.value}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        )
    }
}

export default Body;
