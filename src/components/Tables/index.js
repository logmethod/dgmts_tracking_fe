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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { getProjects, projectSelector } from "redux/reducers/projects";
import { userSelector } from "../../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getEmployees, employeeSelector } from "redux/reducers/employee";
import { getTasks } from "redux/reducers/tasks";
import { tasksSelector } from "redux/reducers/tasks";

function Tables(props) {
  const [projectRow, setProjectRow] = useState([]);
  const [employeeRow, setEmployeeRow] = useState([]);
  const [tasksRow, setTasksRow] = useState([]);
  const dispatch = useDispatch();

  const { projects } = useSelector(projectSelector);
  const { employee } = useSelector(employeeSelector);
  const { tasks } = useSelector(tasksSelector);
  console.log("tasks", tasks);
  const { token } = useSelector(userSelector);

  console.log("project", projects);
  console.log("row", projectRow);
  useEffect(() => {
    projects.length === 0 && dispatch(getProjects({ token }));
    setProjectRow(projects);
  }, [projects]);

  useEffect(() => {
    employee.length === 0 && dispatch(getEmployees({ token }));
    setEmployeeRow(employee);
  }, [employee]);

  useEffect(() => {
    tasks.length === 0 && dispatch(getTasks({ token }));
    setTasksRow(tasks);
  }, [tasks]);

  const getRows = () => {
    let rows;
    let columns;
    if (props?.title === "Tasks") {
      rows = tasksRow && tasksRow;
      columns = [
        { Header: "Task Title", accessor: "task_title", align: "left" },
        { Header: "Project Manager", accessor: "project_manager", align: "center" },
        { Header: "Start Date", accessor: "start_date", align: "center" },
        { Header: "Project Title", accessor: "project_title", align: "center" },
        { Header: "Action", align: "center" },
      ];
    }
    if (props?.title === "Projects") {
      columns = [
        { Header: "Name", accessor: "title", align: "left" },
        { Header: "Site Location", accessor: "site_address", align: "center" },
        { Header: "Contact Number", accessor: "site_contact", align: "center" },
      ];
      rows = projectRow && projectRow;
      console.log("rest", rows);
    }
    if (props?.title === "Employees") {
      columns = [
        { Header: "Name", accessor: "name", align: "left" },
        { Header: "Email", accessor: "email", align: "left" },
        { Header: "Contact", accessor: "contact", align: "center" },
        { Header: "Role", accessor: "role", align: "center" },
        { Header: "Report", accessor: "Report", align: "center" },
      ];
      rows = employeeRow && employeeRow;
    }

    return { rows, columns };
  };
  const columns = getRows().columns;
  const rows = getRows().rows;

  // let test = projectRow.length > 0 ? projectRow : rows;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  noEndBorder={false}
                  pagination={true}
                  canSearch={true}
                  showTotalEntries={true}
                  title={props.title}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
