import { Box } from '@mui/material';
import { Paths } from './../../../constants';
import { setIsRegistrationMode } from '../../../store/slices/signinSignupSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import './welcome.scss';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.signinSignup);

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
            <Link
              className="signButton"
              to={Paths.main}
              onClick={() => dispatch(setIsRegistrationMode(false))}
            >
              Go to Main Page
            </Link>
          ) : (
            <>
              <Link
                className="signButton"
                to={Paths.auth}
                onClick={() => dispatch(setIsRegistrationMode(false))}
              >
                Sign In
              </Link>
              <Link
                className="signButton"
                to={Paths.auth}
                onClick={() => dispatch(setIsRegistrationMode(true))}
              >
                Sign Up
              </Link>
            </>
          )}
        </Box>
      </div>

      <div className="welcome__wrapper main">
        <div className="welcome__info">
          <h2 className="welcome__info--title">Project Management App</h2>
          <p className="welcome__info--text">
            Project Management App - a training project to create an application that helps an
            individual in a team or group of developers achieve their goals.
          </p>
          <h3 className="welcome__info--subtitle">RS School. Курс React.</h3>
          <p className="welcome__info--text">
            The Rolling Scopes is an independent international developer community founded in 2013.
            Now many developers around the world know about us and participate in our projects and
            events This is a free community school from The Rolling Scopes community. Everyone can
            study at RS School, regardless of age, professional employment and place of residence.
            Volunteer developers from various companies and countries participate in the training.
            We combine online and offline learning in our courses. School mentors - our iron people
            - teach students in their free time and for free! More about the school
          </p>
        </div>
        <div className="welcome__img info"></div>
      </div>
      <div className="welcome__wrapper team">
        <div className="welcome__img team-img"></div>
        <div className="welcome__team">
          <h2 className="welcome__team--title">Our team</h2>
          <div className="team__members">
            <div className="team__member">
              <div className="team__member-img memb-1"></div>
              <div className="team__member-info">
                <h3 className="team__member-title">Dmitry</h3>
                <p className="team__member-text">Mentor</p>
              </div>
            </div>
            <div className="team__member">
              <div className="team__member-img memb-1"></div>
              <div className="team__member-info">
                <h3 className="team__member-title">Dmitry TeamLead</h3>
                <p className="team__member-text">Front-end developer</p>
              </div>
            </div>
            <div className="team__member">
              <div className="team__member-img memb-1"></div>
              <div className="team__member-info">
                <h3 className="team__member-title">Elena</h3>
                <p className="team__member-text">Front-end developer</p>
              </div>
            </div>
            <div className="team__member">
              <div className="team__member-img memb-1"></div>
              <div className="team__member-info">
                <h3 className="team__member-title">Darya</h3>
                <p className="team__member-text">Front-end developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="welcome__wrapper video">
        <div className="welcome__video">
          <h2 className="welcome__video--title">Presentation</h2>
          <div className="welcome__video--video">
            <div className="welcome__video--video-container">
              <h2 className="welcome__video--title">Video-presentation</h2>
              <p className="welcome__video--text">About our project &hellip;</p>
              <p className="welcome__video--link">
                <a
                  className="welcome__video--btn"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More &raquo;
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
