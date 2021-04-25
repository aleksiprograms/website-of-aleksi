import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import useProjectApi from '../hooks/useProjectApi';
import ProjectForm from '../components/project/ProjectForm';

const CreateProjectView = (props) => {
    const { match } = props;

    const history = useHistory();
    const userContext = useContext(UserContext);
    const projectApi = useProjectApi();
    const [initLoading, setInitLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [initValues, setInitValues] = useState(null);
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (match.params.id != null) {
            setTitle('Edit project');
            setInitLoading(true);
            setError(null);
            projectApi
                .getProject(match.params.id)
                .then((result) => {
                    setInitValues(result.data);
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setInitLoading(false);
                });
        } else {
            setTitle('Add project');
        }
    }, []);

    if (userContext.user == null) {
        return <Redirect to="/login" />;
    }

    const submit = (project) => {
        setLoading(true);
        if (match.params.id != null) {
            projectApi
                .editProject(project)
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
            projectApi
                .countProjects()
                .then((result) => {
                    project.placeInProjects = Number(result.data.count) + 1;
                    return projectApi.addProject(project);
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
