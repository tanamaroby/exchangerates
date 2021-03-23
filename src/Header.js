import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core';
import theme from './Theme.js';
import Image from './resources/background.jpg';

const useStyles = makeStyles((tempTheme) => ({

    title: {
        color: theme.palette.primary.main,
        fontWeight: '600',
        backgroundColor: theme.palette.background.main,
        padding: tempTheme.spacing(1),
        borderRadius: '5px',
        marginBottom: '10px'
    },

    subtitle: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.alternate,
        padding: tempTheme.spacing(1),
        borderRadius: '3px',
        fontWeight: '700'
    },

    paperContainer: {
        width: '100vw',
        minHeight: '500px',
        maxWidth: '100%',
        borderRadius: '0',
        backgroundImage: `url(${Image})`,
        alignItems: 'center',
    },

    titleBox: {
        height: '500px',
    }
}));

const Header = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paperContainer} elevation={3}>
            <Grid container direction='column' alignItems="center" justify="center" className={classes.titleBox}>
                <Typography variant="h1" className={classes.title}>
                        XCHANGE
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle}>
                        Your exchange rate, your choice
                </Typography>
            </Grid> 
        </Paper>
    );
}

export default Header;
