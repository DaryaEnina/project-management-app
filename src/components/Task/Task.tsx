import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import './Task.scss';

const Task = (task: TaskInterface) => (
  <div className="task" data-testid="Task">
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <div className="task__description">
            <Typography component="span" variant="h6">
              {task.title}
            </Typography>
            <IconButton aria-label="previous">
              <EditIcon />
            </IconButton>
          </div>
          <div className="task__description">
            <Typography component="span" variant="h6">
              Description
            </Typography>
            <IconButton aria-label="previous">
              <EditIcon />
            </IconButton>
          </div>
          <div className="task__description">
            <Typography variant="subtitle1" color="text.secondary" component="span">
              Assignee: User
            </Typography>
            <IconButton aria-label="previous">
              <EditIcon />
            </IconButton>
          </div>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <IconButton aria-label="previous">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  </div>
);

export default Task;
