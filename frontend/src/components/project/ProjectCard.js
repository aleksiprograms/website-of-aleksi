import React from 'react';
import {
    Box,
    Grid,
    Typography,
    Link,
    Chip,
    Paper,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chip: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    image: {
        float: 'left',
        borderRadius: theme.spacing(1),
        marginRight: theme.spacing(1.5),
    },
    imageLandscape: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginBottom: theme.spacing(1.5),
        },
        [theme.breakpoints.up('sm')]: {
            width: '50%',
            marginBottom: theme.spacing(0),
        },
    },
    imagePortrait: {
        width: '50%',
    },
}));

const ProjectCard = (props) => {
    const { project } = props;

    const classes = useStyles();

    const renderImage = () => {
        switch (project.imageOrientation) {
            case 'landscape':
                return (
                    <img
                        src={project.imageUrl}
                        alt="Screenshot from project"
                        className={`${classes.image} ${classes.imageLandscape}`}
                    />
                );
            case 'portrait':
                return (
                    <img
                        src={project.imageUrl}
                        alt="Screenshot from project"
                        className={`${classes.image} ${classes.imagePortrait}`}
                    />
                );
            case 'none':
                return null;
            default:
                return null;
        }
    };

    const renderTags = () => {
        return (
            <>
                {project.tags.map((tag) => {
                    return (
                        <Chip
                            label={tag?.name}
                            color={tag?.importance}
                            variant="outlined"
                            size="small"
                            className={classes.chip}
                        />
                    );
                })}
            </>
        );
    };

    return (
        <Paper variant="outlined">
            <Box m={1.5}>
                <Box mt={-0.5} mb={0.5}>
                    <Typography variant="h5">{project.title}</Typography>
                </Box>
                <div>
                    {/*renderImage()*/}
                    {renderTags()}
                    <Typography>{project.text}</Typography>
                </div>
                <Grid item container justify="flex-end">
                    <Box mt={1}>
                        <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            underline="none"
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                            >
                                GitHub
                            </Button>
                        </Link>
                    </Box>
                </Grid>
            </Box>
        </Paper>
    );
};

ProjectCard.defaultProps = {
    project: null,
};

export default ProjectCard;
