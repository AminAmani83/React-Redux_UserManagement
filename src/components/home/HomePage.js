import React from "react";
import PropTypes from "prop-types";

const HomePage = (props) => {
  const handleAboutPageButtonClick = () => {
    props.history.push("/about");
  };

  return (
    <>
      <div className="jumbotron">
        <h1>React &amp; Redux User Management</h1>
      </div>
      <div className="page-main-content">
        <div className="row justify-content-center">
          <div className="col-12 text-center pt-3 mb-4">
            <p>
              An application for managing users and addresses with full CRUD
              functionality.
            </p>
            <p>
              It uses React with a Redux store, Plus a JSON server or a PHP API
              and MySQL database for back end.
            </p>
            <p>
              Please use the above menus for navigation, and check out the About
              page for more info.
            </p>
            <p>
              <button
                onClick={handleAboutPageButtonClick}
                className="btn btn-info"
              >
                About
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default HomePage;
