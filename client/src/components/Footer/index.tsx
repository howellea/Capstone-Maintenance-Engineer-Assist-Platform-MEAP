import { useLocation, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button className="btn btn-dark mb-3" onClick={handleGoBack}>
            &larr; Go Back
          </button>
        )}
        <h4 className="m-0">
          Made with{' '}
          <span className="emoji" role="img" aria-label="heart" aria-hidden="false">
            ❤️
          </span>{' '}
          by the <strong>MEAP Project Team</strong>.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
