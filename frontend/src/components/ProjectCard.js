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
        marginRight: 8,
        marginBottom: 8,
    },
    image: {
        float: 'left',
        borderRadius: 8,
        marginRight: 12,
    },
    imageLandscape: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginBottom: 12,
        },
        [theme.breakpoints.up('sm')]: {
            width: '50%',
            marginBottom: 0,
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
        const platforms = project.platforms.split(', ');
        const technologies = project.technologies.split(', ');
        return (
            <>
                {platforms.map((platform) => {
                    return (
                        <Chip
                            label={platform}
                            color="primary"
                            variant="outlined"
                            size="small"
                            className={classes.chip}
                        />
                    );
                })}
                {technologies.map((technology) => {
                    return (
                        <Chip
                            label={technology}
                            color="secondary"
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
        <Grid
            item
            xs={12}
            sm={project.imageOrientation === 'portrait' ? 6 : 12}
            style={{ flexGrow: 1, height: '100%' }}
        >
            <Paper variant="outlined" style={{ height: '100%' }}>
                <Box m={1.5}>
                    <Box mt={-0.5} mb={0.5}>
                        <Typography variant="h5">{project.title}</Typography>
                    </Box>
                    <div>
                        {renderImage()}
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
        </Grid>
    );
};

export default ProjectCard;
