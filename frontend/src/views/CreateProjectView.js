import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import useTagApi from '../hooks/useTagApi';
import useProjectApi from '../hooks/useProjectApi';
import useProjectTagApi from '../hooks/useProjectTagApi';
import ProjectForm from '../components/project/ProjectForm';

const CreateProjectView = (props) => {
    const { match } = props;

    const history = useHistory();
    const userContext = useContext(UserContext);
    const tagApi = useTagApi();
    const projectApi = useProjectApi();
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

    const submit = (project, tags) => {
        console.log('project', project);
        setLoading(true);
        if (match.params.id != null) {
            projectApi
                .editProject(project)
                .then(() => {
                    return submitTags(project.id, tags);
                })
                .then(() => {
                    history.push('/admin');
                })
                .catch((error) => {
                    console.log('error', error);
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            projectApi
                .countProjects()
                .then((result) => {
                    project.place = Number(result.data.count) + 1;
                    return projectApi.addProject(project);
                })
                .then((result) => {
                    console.log('result new', result);
                    return submitTags(result.data.id, tags);
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
