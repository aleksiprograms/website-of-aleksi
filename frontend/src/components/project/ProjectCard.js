import React, { useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    Link,
    Chip,
    Paper,
    Button,
    ButtonBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ViewImagesDialog from '../image/ViewImagesDialog';

const useStyles = makeStyles((theme) => ({
    chip: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    imageContainer: {
        float: 'left',
        width: '50%',
        marginRight: theme.spacing(1.5),
    },
    imageContainerLandscape: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginBottom: theme.spacing(1.5),
        },
    },
    image: {
        width: '100%',
        verticalAlign: 'middle',
        borderRadius: theme.spacing(0.5),
    },
}));

const ProjectCard = (props) => {
    const { project } = props;

    const classes = useStyles();
    const [viewImagesDialogOpen, setViewImagesDialogOpen] = useState(false);

    const renderMainImage = () => {
        if (project?.images.length > 0) {
            return (
                <ButtonBase
                    focusRipple
                    onClick={() => setViewImagesDialogOpen(true)}
                    className={`${classes.imageContainer} ${
                        project.orientation === 'landscape' &&
                        classes.imageContainerLandscape
                    }`}
                >
                    <img
                        src={`/images/${project.images[0].image_name}`}
                        alt="Screenshot from project"
                        className={classes.image}
                    />
                </ButtonBase>
            );
        } else {
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
        <>
            <Paper variant="outlined">
                <Box m={1.5}>
                    <Box mt={-0.5} mb={0.5}>
                        <Typography variant="h5">{project.title}</Typography>
                    </Box>
                    <div>
                        {renderMainImage()}
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
            <ViewImagesDialog
                open={viewImagesDialogOpen}
                setOpen={setViewImagesDialogOpen}
                images={project.images}
            />
        </>
    );
};

ProjectCard.defaultProps = {
    project: null,
};

export default ProjectCard;
