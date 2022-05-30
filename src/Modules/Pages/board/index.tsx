import { Box, Button, Paper, ThemeProvider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DraggableId, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Column from '../../../components/Column/Column';
import ModalNewBoard from '../../../components/ModalNewBoard/ModalNewBoard';
import { Paths } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { mainTheme } from '../../../mui';
import {
  complete,
  getCurrentBoard,
  updateColumn,
  updateTask,
} from '../../../store/slices/currentBoardSlice';
import { Loader } from '../../Loader';
import './board.scss';

interface DraggableLocation {
  droppableId: string;
  index: number;
}

interface Combine {
  draggableId: string;
  droppableId: string;
}

interface DragResult {
  reason: 'DROP' | 'CANCEL';
  destination?: DraggableLocation;
  source: DraggableLocation;
  combine?: Combine;
  mode: 'FLUID' | 'SNAP';
  draggableId: DraggableId;
}

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.signinSignup);
  const { currentBoard } = useAppSelector((state) => state.currentBoard);
  const { columns } = useAppSelector((state) => state.currentBoard.currentBoard);
  const loading = useAppSelector((state) => state.currentBoard.loading);
  const { t: translate } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate(Paths.home);
    }
  }, [token, navigate]);

  //with part from https://codesandbox.io/s/brave-jepsen-ff99rl?file=/src/App.js:4789-4813

  const onDragEnd = (result: DragResult, columns: ColumnInterface[]) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const { source, destination } = result;
    const sourceColumn = columns.filter(
      (column) => column?.id && column?.id === source.droppableId
    )[0];
    const destColumn = columns.filter(
      (column) => column?.id && column?.id === destination.droppableId
    )[0];
    const sourceItems = sourceColumn?.tasks && [...sourceColumn.tasks];
    if (source.droppableId !== destination.droppableId) {
      //move tasks between column
      if (sourceItems) {
        currentBoard.id &&
          sourceColumn.id &&
          destColumn?.id &&
          dispatch(
            updateTask({
              boardId: currentBoard.id,
              columnId: sourceColumn?.id,
              token: token,
              newColumnId: destColumn?.id,
              title: sourceColumn?.tasks?.filter((task) => task.id === result.draggableId)[0].title,
              description: sourceColumn?.tasks?.filter((task) => task.id === result.draggableId)[0]
                .description,
              taskId: result.draggableId,
              userId: localStorage.getItem('userId') || '',
              order: destColumn?.tasks?.length || 1,
            })
          )
            .then(() => dispatch(getCurrentBoard({ boardId: currentBoard.id || '', token })))
            .then(() => dispatch(complete()));
      }
    } else {
      const draggableColumn = currentBoard?.columns?.filter(
        (column) => column.id === result.draggableId
      )[0];
      if (draggableColumn) {
        //move column
        currentBoard.id &&
          dispatch(
            updateColumn({
              boardId: currentBoard.id,
              columnId: draggableColumn?.id,
              title: draggableColumn.title,
              order: result.destination.index + 1,
              token: token,
            })
          )
            .then(() => dispatch(getCurrentBoard({ boardId: currentBoard.id || '', token })))
            .then(() => dispatch(complete()));
      } else {
        //move tasks
        currentBoard?.id &&
          dispatch(
            updateTask({
              boardId: currentBoard.id,
              columnId: currentBoard.columns?.filter((column) =>
                column.tasks?.filter((task) => task.id === result.draggableId)
              )[0].id,
              token: token,
              title: currentBoard.columns
                ?.filter((column) =>
                  column.tasks?.filter((task) => task.id === result.draggableId)
                )[0]
                .tasks?.filter((task) => task.id === result.draggableId)[0]?.title,
              description: currentBoard.columns
                ?.filter((column) =>
                  column.tasks?.filter((task) => task.id === result.draggableId)
                )[0]
                .tasks?.filter((task) => task.id === result.draggableId)[0]?.description,
              taskId: result.draggableId,
              userId: localStorage.getItem('userId') || '',
              order: result.destination.index + 1,
            })
          )
            .then(() => dispatch(getCurrentBoard({ boardId: currentBoard.id || '', token })))
            .then(() => {
              dispatch(complete());
            });
      }
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <ThemeProvider theme={mainTheme}>
      <div>
        <Button onClick={() => navigate(-1)}>{translate('Back to main page')} </Button>
        <ModalNewBoard isOpen={open} onClose={() => setOpen(false)} item="column" />
        <div className="boardContainer">
          <Paper
            elevation={12}
            sx={{
              padding: '8px',
              margin: '32px 32px ',
              minWidth: '1100px',
              maxWidth: '95vw',
              height: '66vh',
            }}
          >
            <Typography variant="h3">{currentBoard.title}</Typography>
            <Button variant="outlined" onClick={() => setOpen(true)}>
              {translate('Create column')}
            </Button>
            <DragDropContext onDragEnd={(result) => columns && onDragEnd(result, columns)}>
              {currentBoard.id && (
                <Droppable droppableId={currentBoard.id} type="columns" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{ display: 'flex', maxHeight: '400px' }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'nowrap',
                          '& > :not(style)': {
                            m: 1,
                          },
                        }}
                      >
                        {columns?.map((column: ColumnInterface, index) => {
                          return (
                            <Draggable
                              key={column.id}
                              draggableId={column?.id || index.toString()}
                              index={index}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {column?.id && (
                                      <Column
                                        key={column.id}
                                        title={column.title}
                                        order={column.order}
                                        id={column.id}
                                        tasks={column.tasks}
                                      ></Column>
                                    )}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                      </Box>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </DragDropContext>
          </Paper>
        </div>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
          }}
        >
          {translate('Get things done!')}
        </Typography>
      </div>
    </ThemeProvider>
  );
};

export default Board;
