import React, { useState, useEffect } from 'react';
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

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#111',
        color: '#fff',
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = () => {
    const isOnMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const [navigations, setNavigations] = useState([
        { title: 'Home', path: '/', active: false },
        { title: 'Projects', path: '/projects', active: false },
    ]);
    const [openMenuOnMobile, setOpenMenuOnMobile] = useState(false);

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

    const renderNavigation = () => {
        return (
            <>
                {navigations.map((navigation) => {
                    return (
                        <Button
                            key={navigation.path}
                            color={navigation.active ? 'primary' : 'inherit'}
                            onClick={() => {
                                setOpenMenuOnMobile(false);
                                history.push(navigation.path);
                            }}
                        >
                            {navigation.title}
                        </Button>
                    );
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
                        <>{renderNavigation()}</>
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
                            {renderNavigation()}
                        </Grid>
                    </Box>
                </Collapse>
            </Container>
        </AppBar>
    );
};

export default Header;
