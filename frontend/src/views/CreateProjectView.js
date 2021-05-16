import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import useTagApi from '../hooks/useTagApi';
import useProjectApi from '../hooks/useProjectApi';
import useProjectImageApi from '../hooks/useProjectImageApi';
import useProjectTagApi from '../hooks/useProjectTagApi';
import ProjectForm from '../components/project/ProjectForm';

const CreateProjectView = (props) => {
    const { match } = props;

    const history = useHistory();
    const userContext = useContext(UserContext);
    const tagApi = useTagApi();
    const projectApi = useProjectApi();
    const projectImageApi = useProjectImageApi();
    const projectTagApi = useProjectTagApi();
    const [allTags, setAllTags] = useState([]);
    const [initLoading, setInitLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [initValues, setInitValues] = useState(null);
    const [title, setTitle] = useState('');

    useEffect(() => {
        setInitLoading(true);
        setError(null);
        if (match.params.id != null) {
            setTitle('Edit project');
        } else {
            setTitle('Add project');
        }
        tagApi
            .getTags()
            .then((result) => {
                setAllTags(result.data);
                if (match.params.id != null) {
                    return projectApi.getProject(match.params.id);
                } else {
                    return;
                }
            })
            .then((result) => {
                if (result != null) {
                    setInitValues(result.data);
                }
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setInitLoading(false);
            });
    }, []);

    if (userContext.user == null) {
        return <Redirect to="/login" />;
    }

    const submitImages = (projectId, images) => {
        let promises = [];
        let place = 1;
        images.forEach((image) => {
            if (image.inDB && image.remove) {
                promises.push(projectImageApi.removeProjectImage(image.id));
            } else if (image.inDB) {
                promises.push(
                    projectImageApi.editProjectImage({
                        id: image.id,
                        place: place,
                    })
                );
                place++;
            } else {
                const formData = new FormData();
                formData.append('file', image.file);
                formData.set('place', place);
                formData.set('project_id', projectId);
                promises.push(projectImageApi.addProjectImage(formData));
                place++;
            }
        });
        return Promise.all(promises);
    };

    const submitTags = (projectId, tags) => {
        let calls = [];
        tags.forEach((tag) => {
            if (tag.inDB !== tag.selected) {
                if (tag.inDB) {
                    calls.push(
                        projectTagApi.removeProjectTag(tag.project_tag_id)
                    );
                } else {
                    calls.push(
                        projectTagApi.addProjectTag({
                            project_id: projectId,
                            tag_id: tag.id,
                        })
                    );
                }
            }
        });
        return Promise.all(calls);
    };

    const submit = (project, images, tags) => {
        setLoading(true);
        if (match.params.id != null) {
            projectApi
                .editProject(project)
                .then(() => {
                    return submitImages(project.id, images);
                })
                .then(() => {
                    return submitTags(project.id, tags);
                })
                .then(() => {
                    history.push('/admin');
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            let projectId = 0;
            projectApi
                .countProjects()
                .then((result) => {
                    project.place = Number(result.data.count) + 1;
                    return projectApi.addProject(project);
                })
                .then((result) => {
                    projectId = result.data.id;
                    return submitImages(projectId, images);
                })
                .then(() => {
                    return submitTags(projectId, tags);
                })
                .then(() => {
                    history.push('/admin');
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const cancel = () => {
        history.push('/admin');
    };

    return (
        <Grid container spacing={2}>
            <Grid item container>
                <Typography variant="h5">{title}</Typography>
            </Grid>
            {initLoading ? (
                <Grid item container justify="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Grid item container>
                    <ProjectForm
                        allTags={allTags}
                        submit={submit}
                        cancel={cancel}
                        initValues={initValues}
                        loading={loading}
                        error={error}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default CreateProjectView;
