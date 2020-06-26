import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ConditionalDisplay from "../common/ConditionalDisplay";
import UserFilterForm from "./UserFilterForm";
import SortableTh from "./SortableTh";

const UserList = (props) => {
  //////////////////////////////////////////////////////
  // A. Paginating /////////////////////////////////////
  //////////////////////////////////////////////////////
  const itemsPerPage = props.pagination.enabled
    ? props.pagination.itemsPerPage
    : props.users.length;
  const [pageNumber, setPageNumber] = useState(1);
  const nextPage = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };
  const prevPage = () => {
    setPageNumber((prevPage) => prevPage - 1);
  };

  //////////////////////////////////////////////////////
  // B. Filtering //////////////////////////////////////
  //////////////////////////////////////////////////////
  const [userToFilter, setUserToFilter] = useState({ ...props.newUser });
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [displayFilterForm, setDisplayFilterForm] = useState(false);

  useEffect(() => {
    setFilteredUserList([...props.users]);
  }, [props.users]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setFilteredUserList(
      props.users.filter(
        (u) =>
          u.name.toLowerCase().includes(userToFilter.name.toLowerCase()) &&
          u.province
            .toLowerCase()
            .includes(userToFilter.province.toLowerCase()) &&
          u.city.toLowerCase().includes(userToFilter.city.toLowerCase()) &&
          u.street.toLowerCase().includes(userToFilter.street.toLowerCase()) &&
          (String(userToFilter.age) === "null" ||
            String(u.age).includes(String(userToFilter.age)))
      )
    );
    // Note: String(null) works, but null.toString() throws an error
    // age is null by default, everything else is a string
  };

  const handleFilterFieldChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserToFilter((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFilterForm = () => {
    setDisplayFilterForm((prev) => !prev);
  };

  const handleFilterFormReset = () => {
    setUserToFilter({ ...props.newUser });
  };

  //////////////////////////////////////////////////////
  // C. Sorting ////////////////////////////////////////
  //////////////////////////////////////////////////////
  const [sortedByColumn, setSortedByColumn] = useState({
    column: props.enableSorting ? "name" : "", // default sort column
    reversed: false,
  });

  const handleSortUserClick = (e) => {
    if (!props.enableSorting) return;
    const sortProperty = e.target.getAttribute("name");
    let unOrderedUserList = [...filteredUserList];

    if (sortProperty === sortedByColumn.column) {
      // alread sorted by this column
      setFilteredUserList(unOrderedUserList.reverse());
      setSortedByColumn((prev) => ({ ...prev, reversed: !prev.reversed }));
      return;
    }

    // A new column was selected, save the colum name & reset the arrow
    setSortedByColumn({ column: sortProperty, reversed: false });

    if (sortProperty === "age") {
      // sort integer
      setFilteredUserList(
        unOrderedUserList.sort((u1, u2) => u1[sortProperty] - u2[sortProperty])
      );
    } else {
      // sort string
      setFilteredUserList(
        unOrderedUserList.sort((u1, u2) =>
          u1[sortProperty].localeCompare(u2[sortProperty])
        )
      );
    }
  };

  return (
    <>
      <ConditionalDisplay
        isVisible={props.enableFiltration && !displayFilterForm}
      >
        <div
          className="text-right mb-2"
          onClick={toggleFilterForm}
          style={{ cursor: "pointer" }}
        >
          Filter Results
        </div>
      </ConditionalDisplay>

      <ConditionalDisplay isVisible={displayFilterForm}>
        <div>
          <UserFilterForm
            user={userToFilter}
            handleSubmit={handleFilterSubmit}
            handleFieldChange={handleFilterFieldChange}
            handleClose={toggleFilterForm}
            handleReset={handleFilterFormReset}
          />
        </div>
      </ConditionalDisplay>

      <table className={"table " + (props.enableSorting ? "sortable" : "")}>
        <thead>
          <tr>
            <th>
              <SortableTh
                handleSortUserClick={handleSortUserClick}
                sortedByColumn={sortedByColumn}
                columnName="id"
                columnLabel="ID"
              />
            </th>
            <th>
              <SortableTh
                handleSortUserClick={handleSortUserClick}
                sortedByColumn={sortedByColumn}
                columnName="name"
                columnLabel="Name"
              />
            </th>
            <th>
              <SortableTh
                handleSortUserClick={handleSortUserClick}
                sortedByColumn={sortedByColumn}
                columnName="age"
                columnLabel="Age"
              />
            </th>
            <th>
              <SortableTh
                handleSortUserClick={handleSortUserClick}
                sortedByColumn={sortedByColumn}
                columnName="province"
                columnLabel="Province"
              />
            </th>
            <th>
              <SortableTh
                handleSortUserClick={handleSortUserClick}
                sortedByColumn={sortedByColumn}
                columnName="city"
                columnLabel="City"
              />
            </th>
            <th>
              <SortableTh
                handleSortUserClick={handleSortUserClick}
                sortedByColumn={sortedByColumn}
                columnName="street"
                columnLabel="Street"
              />
            </th>
            <th>
              <button
                className="btn btn-outline-info"
                onClick={props.handleAddUserClick}
              >
                Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUserList.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <div className="row">
                  <div className="text-center mt-5 text-warning col-6 offset-3">
                    No Users Found
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            filteredUserList
              .slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage)
              .map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="text"
                      style={{ maxWidth: 100 }}
                      className="bg-dark text-light pl-1"
                      value={user.id}
                      readOnly
                    />
                  </td>
                  <td>
                    <Link to={"/user/" + user.id}>{user.name}</Link>
                  </td>
                  <td>{user.age}</td>
                  <td>{user.province}</td>
                  <td>{user.city}</td>
                  <td>{user.street}</td>
                  <td>
                    <button
                      name={user.id}
                      className="btn btn-outline-danger"
                      onClick={props.handleDeleteUserClick}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>

      <ConditionalDisplay isVisible={props.pagination.enabled}>
        <div className="row mt-3 mb-3">
          <div className="col-3">
            Number of Users: {filteredUserList.length}
          </div>

          <div className="col-3 offset-6 text-right">
            <ConditionalDisplay isVisible={pageNumber !== 1}>
              <span onClick={prevPage} style={{ cursor: "pointer" }}>
                &lt;
              </span>
            </ConditionalDisplay>

            <span className="pl-3 pr-3">
              Page: {pageNumber} /{" "}
              {Math.ceil(filteredUserList.length / itemsPerPage)}
            </span>

            <ConditionalDisplay
              isVisible={pageNumber < filteredUserList.length / itemsPerPage}
            >
              <span onClick={nextPage} style={{ cursor: "pointer" }}>
                &gt;
              </span>
            </ConditionalDisplay>
          </div>
        </div>
      </ConditionalDisplay>
    </>
  );
};

UserList.propTypes = {
  users: PropTypes.array, // includes addresses
  newUser: PropTypes.object.isRequired,
  handleDeleteUserClick: PropTypes.func.isRequired,
  handleAddUserClick: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    enabled: PropTypes.bool,
    itemsPerPage: PropTypes.number,
  }),
  enableFiltration: PropTypes.bool.isRequired,
  enableSorting: PropTypes.bool.isRequired,
};

export default UserList;
