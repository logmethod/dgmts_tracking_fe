/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";

// Material Dashboard 2 React example components
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";
import Card from "@mui/material/Card";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SummarizeIcon from "@mui/icons-material/Summarize";
import KeyIcon from "@mui/icons-material/Key";
import EditIcon from "@mui/icons-material/Edit";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MDButton from "components/MDButton";
import Model from "components/Model";
import EmployeeDetail from "components/Model/EmployeeDetail";
import * as React from "react";
import AddTask from "components/Model";
import AddEmployee from "components/Model/AddEmployee";
import AddProject from "components/Model/AddProject";
import { Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "redux/reducers/tasks";
import { getTasks } from "redux/reducers/tasks";
import { deleteProject } from "redux/reducers/projects";
import { getProjects } from "redux/reducers/projects";
import { IconButton, Tooltip } from "@mui/material";
import PasswordEdit from "components/Model/PasswordEdit";
import { userSelector } from "redux/reducers/user";
import { deleteEmployee } from "redux/reducers/employee";
import { getEmployees } from "redux/reducers/employee";

const useStyles = makeStyles((theme) => ({
  myClassName: {
    fontSize: "26px !important",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

function DataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  title,
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 5;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["5", "10", "15", "20", "25"];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 5), [defaultValue]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  const [open, setOpen] = React.useState(false);
  const [openSingleInputForm, setOpenSingleInputForm] = React.useState(false);

  const [action, setAction] = React.useState({ state: false, type: "", data: null });
  const [selectModel, setSelectModel] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [task, setTask] = React.useState({});
  const [project, setProject] = React.useState({});
  const [employee, setEmployee] = React.useState({});

  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();
  const handleClickOpen = (editMode = false, action = "", obj) => {
    console.log("test");
    setSelectModel(action);
    editMode && action.toLowerCase() === "tasks" && setTask(obj);

    editMode && action.toLowerCase() === "projects" && setProject(obj);
    editMode && action.toLowerCase() === "employees" && setEmployee(obj);
    setEdit(editMode);
    setOpen(!open);
  };

  const handleSingleFiledModal = () => {
    setOpenSingleInputForm(!openSingleInputForm);
  };

  const handleDelete = async (editMode, action = "", obj) => {
    let token = localStorage.getItem("token");

    let agree = confirm("Are You Sure");

    if (agree) {
      if (action === "Tasks") {
        let id = obj.values.task_id;
        let data = { id, token };
        await dispatch(deleteTask(data));
        dispatch(getTasks(data));
      }
      if (action === "Projects") {
        let id = obj.values.id;
        let data = { id, token };
        console.log("DATA", token);
        await dispatch(deleteProject(data));
        await dispatch(getProjects({ token }));
      }
      if (action === "Employees") {
        let id = obj.values.id;
        let data = { id, token };
        await dispatch(deleteEmployee(data));
        await dispatch(getEmployees({ token }));
      }
    }
  };
  const classes = useStyles();
  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  //open Employee model
  const [openModel, setOpenModel] = useState(false);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  const handleClose = () => {
    setOpenModel(false);
  };

  return (
    <>
      <TableContainer style={{ overflowX: "auto" }} sx={{ boxShadow: "none" }}>
        {entriesPerPage || canSearch ? (
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mx={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            {entriesPerPage && (
              <MDBox
                display="flex"
                alignItems="center"
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Autocomplete
                  disableClearable
                  value={pageSize.toString()}
                  options={entries}
                  onChange={(event, newValue) => {
                    setEntriesPerPage(parseInt(newValue, 10));
                  }}
                  size="small"
                  sx={{ width: "5rem" }}
                  renderInput={(params) => <MDInput {...params} />}
                />
                <MDTypography variant="caption" color="secondary">
                  &nbsp;&nbsp;entries per page
                </MDTypography>
              </MDBox>
            )}
            <MDTypography variant="h6" color="white">
              {title ? title : "Title "}
            </MDTypography>
            {canSearch && (
              <MDBox width="12rem" ml="auto" style={{ marginRight: "20px" }}>
                <MDInput
                  style={{ backgroundColor: "white", borderRadius: "5px" }}
                  placeholder="Search.s.."
                  value={search}
                  size="small"
                  fullWidth
                  onChange={({ currentTarget }) => {
                    setSearch(search);
                    onSearchChange(currentTarget.value);
                  }}
                />
              </MDBox>
            )}
            {/* {openModel && <EmployeeDetail Open={openModel} handleClose={handleClose} />}

          <Model open={true} /> */}
            <MDButton onClick={() => handleClickOpen(false, title, {})} variant="gradient">
              Add New {title}
            </MDButton>
            {/*{openModel && <EmployeeDetail Open={openModel} handleClose={handleClose} />}*/}
            {edit === false && selectModel && selectModel === "Tasks" && (
              <AddTask Open={open} handleClickOpen={handleClickOpen} Edit={false} />
            )}
            {edit && selectModel && selectModel === "Tasks" && (
              <AddTask
                Open={open}
                handleClickOpen={() => handleClickOpen(true, "tasks", {})}
                Edit={true}
                Task={task}
              />
            )}

            {edit === false && selectModel && selectModel === "Projects" && (
              <AddProject Open={open} handleClickOpen={handleClickOpen} Edit={false} />
            )}
            {edit && selectModel && selectModel === "Projects" && (
              <AddProject
                Open={open}
                handleClickOpen={handleClickOpen}
                Edit={true}
                Project={project}
              />
            )}
            {edit === false && selectModel && selectModel === "Employees" && (
              <AddEmployee Open={open} handleClickOpen={handleClickOpen} />
            )}
            {edit && selectModel && selectModel === "Employees" && (
              <AddEmployee
                Open={open}
                handleClickOpen={handleClickOpen}
                Edit={true}
                Employee={employee}
              />
            )}
          </MDBox>
        ) : null}

        <Table {...getTableProps()}>
          <MDBox component="thead">
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <>
                    {column.Header !== "ID" && (
                      <DataTableHeadCell
                        {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                        width={column.width ? column.width : "auto"}
                        align={column.align ? column.align : "left"}
                        sorted={setSortedValue(column)}
                      >
                        {column.render("Header")}
                      </DataTableHeadCell>
                    )}
                  </>
                ))}
              </TableRow>
            ))}
          </MDBox>

          <TableBody {...getTableBodyProps()}>
            {page.map((row, key) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  // onClick={() => setOpenModel(true)}
                  // style={{ backgroundColor: "green" }}
                >
                  {row.cells.map((cell) => {
                    return (
                      cell.column.Header !== "ID" && (
                        <DataTableBodyCell
                          noBorder={noEndBorder && rows.length - 1 === key}
                          align={cell.column.align ? cell.column.align : "left"}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                          {cell.column.Header === "Action" && (
                            <>
                              {title === "Employees" && (
                                <>
                                  <Tooltip title="View Reports">
                                    <IconButton
                                      onClick={() =>
                                        setAction({ state: true, type: "View Reports", data: row })
                                      }
                                    >
                                      <SummarizeIcon style={{ color: "#2196F3" }} />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Change Role">
                                    <IconButton
                                      onClick={() =>
                                        setAction({ state: true, type: "Edit Role", data: row })
                                      }
                                    >
                                      <SupervisorAccountIcon style={{ color: "#01579b" }} />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Change password">
                                    <IconButton
                                      onClick={() =>
                                        setAction({
                                          state: true,
                                          type: "Change Password",
                                          data: row,
                                        })
                                      }
                                    >
                                      <KeyIcon sx={{ fontSize: 30 }} style={{ color: "#ff9800" }} />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )}
                              <Tooltip title="Edit">
                                <IconButton onClick={() => handleClickOpen(true, title, row)}>
                                  <EditIcon color="success" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton onClick={() => handleDelete(true, title, row)}>
                                  <DeleteForeverRoundedIcon style={{ color: "#ff1744" }} />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </DataTableBodyCell>
                      )
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <MDBox
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
        >
          {showTotalEntries && (
            <MDBox mb={{ xs: 3, sm: 0 }}>
              <MDTypography variant="button" color="secondary" fontWeight="regular">
                Showing {entriesStart} to {entriesEnd} of {rows.length} entries
              </MDTypography>
            </MDBox>
          )}
          {pageOptions.length > 1 && (
            <MDPagination
              variant={pagination.variant ? pagination.variant : "gradient"}
              color={pagination.color ? pagination.color : "info"}
            >
              {canPreviousPage && (
                <MDPagination item onClick={() => previousPage()}>
                  <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
                </MDPagination>
              )}
              {renderPagination.length > 6 ? (
                <MDBox width="5rem" mx={1}>
                  <MDInput
                    inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                    value={customizedPageOptions[pageIndex]}
                    onChange={(handleInputPagination, handleInputPaginationValue)}
                  />
                </MDBox>
              ) : (
                renderPagination
              )}
              {canNextPage && (
                <MDPagination item onClick={() => nextPage()}>
                  <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
                </MDPagination>
              )}
            </MDPagination>
          )}
        </MDBox>
      </TableContainer>
      <PasswordEdit
        {...action}
        handleClose={() => setAction({ state: false, type: "", data: null })}
      />
    </>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 5, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: 5,
      entries: PropTypes.arrayOf(5),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default DataTable;
