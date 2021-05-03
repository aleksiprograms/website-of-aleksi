import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
    Container,
    AppBar,
    Toolbar,
    Link,
    Typography,
    Button,
    IconButton,
    Collapse,
    Box,
    Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import { UserContext } from '../../context/UserContext';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#111',
        color: '#fff',
    },
    title: {
        flexGrow: 1,
    },
    buttonWithMargin: {
        marginLeft: theme.spacing(2),
    },
}));

const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const userContext = useContext(UserContext);
    const [navigations, setNavigations] = useState([
        { title: 'Home', path: '/', active: false },
        { title: 'Projects', path: '/projects', active: false },
        { title: 'Admin', path: '/admin', active: false },
    ]);
    const [openMenuOnMobile, setOpenMenuOnMobile] = useState(false);

    const isOnMobile = useMediaQuery((theme) => theme.breakpoints.down('xs'));

    useEffect(() => {
        if (!isOnMobile) {
            setOpenMenuOnMobile(false);
        }
    }, [isOnMobile]);

    useEffect(() => {
        setNavigations((prevNavigations) => {
            return prevNavigations.map((prevNavigation) => {
                if (prevNavigation.path === location.pathname) {
                    return {
                        ...prevNavigation,
                        active: true,
                    };
                } else {
                    return {
                        ...prevNavigation,
                        active: false,
                    };
                }
            });
        });
    }, [location.pathname]);

    const renderNavigationButton = (navigation, addMargin) => {
        return (
            <>
                {navigation.title === 'Admin' &&
                userContext.user == null ? null : (
                    <Button
                        key={navigation.path}
                        color={navigation.active ? 'primary' : 'inherit'}
                        className={addMargin ? classes.buttonWithMargin : {}}
                        onClick={() => {
                            setOpenMenuOnMobile(false);
                            history.push(navigation.path);
                        }}
                    >
                        {navigation.title}
                    </Button>
                )}
            </>
        );
    };

    const renderNavigation = (addMargin) => {
        return (
            <>
                {navigations.map((navigation) => {
                    return <>{renderNavigationButton(navigation, addMargin)}</>;
                })}
            </>
        );
    };

    return (
        <AppBar position="static" className={classes.root}>
            <Container maxWidth="md">
                <Toolbar disableGutters>
                    <Typography variant="h6" className={classes.title}>
                        <Link href="/" color="inherit" underline="none">
                            Website of Aleksi
                        </Link>
                    </Typography>
                    {isOnMobile ? (
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() =>
                                setOpenMenuOnMobile((prevState) => !prevState)
                            }
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <>{renderNavigation(true)}</>
                    )}
                </Toolbar>
                <Collapse in={openMenuOnMobile} timeout="auto" unmountOnExit>
                    <Box mb={1}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignContent="center"
                        >
                            {renderNavigation(false)}
                        </Grid>
                    </Box>
                </Collapse>
            </Container>
        </AppBar>
    );
};

export default Header;
