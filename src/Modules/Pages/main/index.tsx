import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { getBoards } from '../../../store/slices/boardListSlice';

export const Main = () => {
  const { token } = useAppSelector((state) => state.signinSignup);
  const { boardList } = useAppSelector((state) => state.boardList);
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '40px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <button onClick={() => dispatch(getBoards({ token }))}>Load boards</button>
        {boardList.map((item, index) => (
          <p key={index}>{item.title}</p>
        ))}
      </div>
    </>
  );
};
