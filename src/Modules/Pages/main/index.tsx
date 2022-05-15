import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { getBoards } from '../../../store/slices/currentBoardSlice';

export const Main = () => {
  const { token } = useAppSelector((state) => state.signinSignup);
  const { boardList } = useAppSelector((state) => state.boardList);
  const dispatch = useAppDispatch();

  return (
    <>
      <button onClick={() => dispatch(getBoards({ token }))}></button>
      <div
        style={{
          fontSize: '40px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        Main Route
      </div>
    </>
  );
};
