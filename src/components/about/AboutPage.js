import React from "react";

const AboutPage = () => {
  return (
    <>
      <div className="jumbotron">
        <h1>About This Project</h1>
      </div>

      <div className="page-main-content">
        <div className="row justify-content-center">
          <div className="col-4 text-center border pt-3 mb-4">
            <p>
              <strong>Technologies Used:</strong>
            </p>
            <p>
              Font End:
              <br />
              React + Redux + React-Router
            </p>
            <p>
              Back End:
              <br />
              JSON Server + PHP API + MySQL
            </p>
          </div>
          <div className="col-12 text-justify">
            <p>
              This project is a user management application, with 2 database
              tables (users and addresses) where each user has one address and
              each address can belong to multiple users.
            </p>
            <p>
              You can view all users, filter the results based on any of the
              user properties, sort them ascending or descending by clicking on
              the table headers, and have pagination as well. Furthermore, you
              can add new users/addresses, and edit or delete the existing ones.
              You cannot remove an address if there is a user connected to it,
              and if you delete the last user who uses a particular address,
              that address would be removed too.
            </p>
            <p>
              A Redux store has been used for data management. With the help of
              action creators and “thunks”, intents are sent to the API first,
              and if the API call is successful, actions are dispatched to the
              reducers to update the store accordingly. If the API calls fail,
              an error message (toast) will be shown on the screen. The number
              of pending API calls are monitored, and a loading icon will be
              displayed on the screen while they resolve.
            </p>
            <p>
              A mock API was creating with JSON Server and used during the
              development phase. It was later replaced with an off-the-shelf PHP
              API for deployment on the server. The JSON Server API has been
              tweaked to closely mimic the PHP API.
            </p>
            <p>
              GUIDs are used as the primary key for the tables, and they are
              auto-generated for new items with the help of MySQL triggers.
            </p>
            <p>
              Using meaningful variable and file names, and adding comments
              wherever necessary, this code is readable and maintainable.
            </p>
            <p>
              This project has been created based on the React and Redux course
              instructions on www.pluralsight.com and the boilerplate code has
              been borrowed from the course material.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
