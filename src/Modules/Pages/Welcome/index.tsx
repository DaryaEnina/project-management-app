import { Box } from '@mui/material';
import { Paths } from './../../../constants';
import { setMode } from '../../../store/slices/signinSignupSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import './welcome.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.signinSignup);
  const { t: translate } = useTranslation();

  return (
    <div className="welcome">
      <div>
        <Box
          className="welcome__login"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            maxWidth: '1200px',
          }}
        >
          {token ? (
            <Link className="signButton" to={Paths.main}>
              {translate('go-to-main-page')}
            </Link>
          ) : (
            <>
              <Link
                className="signButton"
                to={Paths.auth}
                onClick={() => dispatch(setMode('login'))}
              >
                {translate('Sign in')}
              </Link>
              <Link
                className="signButton"
                to={Paths.auth}
                onClick={() => dispatch(setMode('register'))}
              >
                {translate('Sign up')}
              </Link>
            </>
          )}
        </Box>
      </div>
      <div className="welcome__wrapper main">
        <div className="welcome__info">
          <h2 className="welcome__info--title">{translate('Project Management App Tittle')}</h2>
          <p className="welcome__info--text">{translate('About project')}</p>
          <h3 className="welcome__info--subtitle">{translate('RS School. React course.')}</h3>
          <p className="welcome__info--text">{translate('About course')}</p>
        </div>
        <div className="welcome__img info"></div>
      </div>
      <div className="welcome__wrapper team">
        <div className="welcome__img team-img"></div>
        <div className="welcome__team">
          <h2 className="welcome__team--title">{translate('Our team')}</h2>
          <div className="team__members">
            <div className="team__member">
              <div className="team__member-img memb-1"></div>
              <div className="team__member-info">
                <h3 className="team__member-title">{translate('Dmitry')}</h3>
                <p className="team__member-text">{translate('Mentor')}</p>
              </div>
            </div>
            <div className="team__member">
              <div className="team__member-img memb-1"></div>
              <div className="team__member-info">
                <h3 className="team__member-title">{translate('Dmitry TeamLead')}</h3>
                <p className="team__member-text">{translate('Front-end developer')}</p>
              </div>
            </div>
            <div className="team__member">
              <div className="team__member-img memb-1"></div>
              <div className="team__member-info">
                <h3 className="team__member-title">{translate('Elena')}</h3>
                <p className="team__member-text">{translate('Front-end developer')}</p>
              </div>
            </div>
            <div className="team__member">
              <div className="team__member-img memb-1"></div>
              <div className="team__member-info">
                <h3 className="team__member-title">{translate('Darya')}</h3>
                <p className="team__member-text">{translate('Front-end developer')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="welcome__wrapper video">
        <div className="welcome__video">
          <h2 className="welcome__video--title">{translate('Presentation')}</h2>
          <div className="welcome__video--video">
            <div className="welcome__video--video-container">
              <h2 className="welcome__video--title">{translate('Video-presentation')}</h2>
              <p className="welcome__video--link">
                <a
                  className="welcome__video--btn"
                  href="https://youtu.be/6Zphrm3wIZQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate('Watch')} &raquo;
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="welcome__img video-img"></div>
      </div>
    </div>
  );
};

export default Welcome;
