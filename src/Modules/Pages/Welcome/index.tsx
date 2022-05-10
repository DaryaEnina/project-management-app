import './welcome.scss';

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="welcome__wrapper main">
        <div className="welcome__info">
          <h2 className="welcome__info--title">Project Management App</h2>
          <p className="welcome__info--text">
            Project Management App - a training project to create an application that helps an
            individual in a team or group of developers achieve their goals.
          </p>
          <h3 className="welcome__info--subtitle">RS School. Курс React.</h3>
          <p className="welcome__info--text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nihil consequuntur
            amet repudiandae iusto atque dignissimos? Reprehenderit dolor, placeat tenetur
            consequuntur, alias laborum odio voluptas hic unde asperiores repudiandae culpa.
          </p>
        </div>
        <div className="welcome__img"></div>
      </div>
      <div className="welcome__wrapper team">
        <div className="welcome__video">
          <h2>Presentation</h2>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
