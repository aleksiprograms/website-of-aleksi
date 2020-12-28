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
        marginBottom: 8,
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
        <>
            <Box mb={0.3}>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                        <Typography variant="h5">
                            {project.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Box mb={0.3}>
                <Typography
                    display="inline"
                    style={{ fontWeight: "bold" }}
                >
                    Platforms:
                </Typography>
                <Typography
                    color="secondary"
                    display="inline"
                    style={{ fontStyle: "italic" }}
                >
                    {` ${project.platforms}`}
                </Typography>
            </Box>
            <Box mb={0.3}>
                <Typography
                    display="inline"
                    style={{ fontWeight: "bold" }}
                >
                    Technologies:
                </Typography>
                <Typography
                    color="secondary"
                    display="inline"
                    style={{ fontStyle: "italic" }}
                >
                    {` ${project.technologies}`}
                </Typography>
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
        </>
    );
}

export default Project;