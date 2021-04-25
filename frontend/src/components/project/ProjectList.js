import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ProjectList = (props) => {
    const {
        projects,
        editProject,
        confirmRemoveProject,
        reorderProjects,
    } = props;

    const renderProject = (project, index) => {
        return (
            <Draggable
                key={project.id}
                draggableId={project.id + ''}
                index={index}
            >
                {(provided) => (
                    <ListItem
                        disableGutters
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <ListItemIcon {...provided.dragHandleProps}>
                            <DragIndicatorIcon />
                        </ListItemIcon>
                        <ListItemText primary={project.title} />
                        <ListItemIcon>
                            <Tooltip title="Edit">
                                <IconButton
                                    onClick={() => editProject(project.id)}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemIcon>
                            <Tooltip title="Delete">
                                <IconButton
                                    edge="end"
                                    onClick={() =>
                                        confirmRemoveProject(project.id)
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemIcon>
                    </ListItem>
                )}
            </Draggable>
        );
    };

    return (
        <DragDropContext onDragEnd={reorderProjects}>
            <Droppable droppableId="droppableProjects">
                {(provided) => (
                    <List
                        style={{ width: '100%' }}
                        disablePadding
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {projects.map((project, index) => {
                            return renderProject(project, index);
                        })}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
};

ProjectList.defaultProps = {
    projects: [],
    editProject: () => {},
    confirmRemoveProject: () => {},
    reorderProjects: () => {},
};

export default ProjectList;
