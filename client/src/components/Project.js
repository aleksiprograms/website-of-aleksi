import React from 'react';
import {
    Box,
    Grid,
    Typography,
    Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    image: {
        float: "left",
        borderRadius: 8,
        marginRight: 8,
    },
    imageLandscape: {
        [theme.breakpoints.up('xs')]: {
            width: "100%",
        },
        [theme.breakpoints.up('sm')]: {
            width: "70%",
        },
    },
    imagePortrait: {
        [theme.breakpoints.up('xs')]: {
            width: "50%",
        },
        [theme.breakpoints.up('sm')]: {
            width: "30%",
        },
    },
}));

const Project = ({ project }) => {

    const classes = useStyles();

    const renderImage = () => {
        switch (project.imageOrientation) {
            case "landscape":
                return (
                    <img
                        src={project.imageUrl}
                        alt="Screenshot from project"
                        className={`${classes.image} ${classes.imageLandscape}`}
                    />
                );
            case "portrait":
                return (
                    <img
                        src={project.imageUrl}
                        alt="Screenshot from project"
                        className={`${classes.image} ${classes.imagePortrait}`}
                    />
                );
            case "none":
                return (null);
            default:
                return (null);
        }
    }

    return (
        <Box mb={2}>
            <Box mb={0.2}>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                        <Typography variant="h5">
                            {project.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Link href={project.githubUrl} target="_blank">
                            Github
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Box mb={0.2}>
                <Grid container>
                    <Box mr={0.5}>
                        <Typography style={{ fontWeight: "bold" }}>
                            Platforms:
                        </Typography>
                    </Box>
                    <Typography style={{ fontStyle: "italic" }}>
                        {project.platforms}
                    </Typography>
                </Grid>
            </Box>
            <Box mb={0.2}>
                <Grid container>
                    <Box mr={0.5}>
                        <Typography style={{ fontWeight: "bold" }}>
                            Technologies:
                        </Typography>
                    </Box>
                    <Typography style={{ fontStyle: "italic" }}>
                        {project.technologies}
                    </Typography>
                </Grid>
            </Box>
            <Box>
                <Grid item container>
                    <div>
                        {renderImage()}
                        <Typography>
                            {project.text}
                        </Typography>
                    </div>
                </Grid>
            </Box>
        </Box>
    );
}

export default Project;