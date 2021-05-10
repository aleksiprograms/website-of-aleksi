import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    List,
    ListItem,
    ListItemIcon,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const DragDropList = (props) => {
    const { droppableId, items, onReorder, onEdit, onRemove } = props;

    const renderItem = (item, index) => {
        return (
            <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                {(provided) => (
                    <ListItem
                        disableGutters
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <ListItemIcon {...provided.dragHandleProps}>
                            <DragIndicatorIcon />
                        </ListItemIcon>
                        {item.content}
                        {onEdit && (
                            <ListItemIcon>
                                <Tooltip title="Edit">
                                    <IconButton onClick={() => onEdit(item.id)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemIcon>
                        )}
                        {onRemove && (
                            <ListItemIcon>
                                <Tooltip title="Delete">
                                    <IconButton
                                        edge="end"
                                        onClick={() => onRemove(item.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemIcon>
                        )}
                    </ListItem>
                )}
            </Draggable>
        );
    };

    return (
        <DragDropContext onDragEnd={onReorder}>
            <Droppable droppableId={droppableId}>
                {(provided) => (
                    <List
                        style={{ width: '100%' }}
                        disablePadding
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {items.map((item, index) => {
                            return renderItem(item, index);
                        })}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
};

DragDropList.defaultProps = {
    droppableId: 'droppableItems',
    items: [
        { id: 1, content: <div>item 1</div> },
        { id: 2, content: <div>item 2</div> },
        { id: 3, content: <div>item 3</div> },
    ],
    onReorder: () => {},
    onEdit: undefined,
    onRemove: undefined,
};

export default DragDropList;
