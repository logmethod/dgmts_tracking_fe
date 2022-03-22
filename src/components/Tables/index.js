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

function Tables(props) {
  const getRows = () => {
    let rows;
    let columns;
    if (props?.title === "Tasks") {
      rows = [
        {
          "Reference ID": 73249326565,
          "Task Title": "14155 SullyField",
          "Project Manager": "Asad Qurashi",
          "Assigned To": "Murtaz Haider",
          "Site Location": "14155 Sullyfield Circle Suite H, Chantilly, VA 20151",
          "Start Date": "09/05/22",
          "Start Time": "TBD",
        },
        {
          "Reference ID": 73249326565,
          "Task Title": "14155 SullyField",
          "Project Manager": "Ishaq",
          "Assigned To": "Murtaz Haider",
          "Site Location": "14155 Sullyfield Circle Suite H, Chantilly, VA 20151",
          "Start Date": "09/05/22",
          "Start Time": "TBD",
        },
        {
          "Reference ID": 73249326565,
          "Task Title": "14155 SullyField",
          "Project Manager": "Asad Qurashi",
          "Assigned To": "Murtaz Haider",
          "Site Location": "14155 Sullyfield Circle Suite H, Chantilly, VA 20151",
          "Start Date": "09/05/22",
          "Start Time": "TBD",
        },
        {
          "Reference ID": 73249326565,
          "Task Title": "14155 SullyField",
          "Project Manager": "Asad Qurashi",
          "Assigned To": "Murtaz Haider",
          "Site Location": "14155 Sullyfield Circle Suite H, Chantilly, VA 20151",
          "Start Date": "09/05/22",
          "Start Time": "TBD",
        },
        {
          "Reference ID": 73249326565,
          "Task Title": "14155 SullyField",
          "Project Manager": "Asad Qurashi",
          "Assigned To": "Murtaz Haider",
          "Site Location": "14155 Sullyfield Circle Suite H, Chantilly, VA 20151",
          "Start Date": "09/05/22",
          "Start Time": "TBD",
        },
        {
          "Reference ID": 73249326565,
          "Task Title": "14155 SullyField",
          "Project Manager": "Asad Qurashi",
          "Assigned To": "Murtaz Haider",
          "Site Location": "14155 Sullyfield Circle Suite H, Chantilly, VA 20151",
          "Start Date": "09/05/22",
          "Start Time": "TBD",
        },
        {
          "Reference ID": 73249326565,
          "Task Title": "14155 SullyField",
          "Project Manager": "Asad Qurashi",
          "Assigned To": "Murtaz Haider",
          "Site Location": "14155 Sullyfield Circle Suite H, Chantilly, VA 20151",
          "Start Date": "09/05/22",
          "Start Time": "TBD",
        },
        {
          "Reference ID": 73249326565,
          "Task Title": "14155 SullyField",
          "Project Manager": "Asad Qurashi",
          "Assigned To": "Murtaz Haider",
          "Site Location": "14155 Sullyfield Circle Suite H, Chantilly, VA 20151",
          "Start Date": "09/05/22",
          "Start Time": "TBD",
        },
        {
          "Reference ID": 73249326565,
          "Task Title": "14155 SullyField",
          "Project Manager": "Asad Qurashi",
          "Assigned To": "Murtaz Haider",
          "Site Location": "14155 Sullyfield Circle Suite H, Chantilly, VA 20151",
          "Start Date": "09/05/22",
          "Start Time": "TBD",
        },
        {
          "Reference ID": 73249326565,
          "Task Title": "14155 SullyField",
          "Project Manager": "Asad Qurashi",
          "Assigned To": "Murtaz Haider",
          "Site Location": "14155 Sullyfield Circle Suite H, Chantilly, VA 20151",
          "Start Date": "09/05/22",
          "Start Time": "TBD",
        },
        {
          "Reference ID": 73249326565,
          "Task Title": "14155 SullyField",
          "Project Manager": "Asad Qurashi",
          "Assigned To": "Murtaz Haider",
          "Site Location": "14155 Sullyfield Circle Suite H, Chantilly, VA 20151",
          "Start Date": "09/05/22",
          "Start Time": "TBD",
        },
        {
          "Reference ID": 73249326565,
          "Task Title": "14155 SullyField",
          "Project Manager": "Asad Qurashi",
          "Assigned To": "Murtaz Haider",
          "Site Location": "14155 Sullyfield Circle Suite H, Chantilly, VA 20151",
          "Start Date": "09/05/22",
          "Start Time": "TBD",
        },
        {
          "Reference ID": 73249326565,
          "Task Title": "14155 SullyField",
          "Project Manager": "Asad Qurashi",
          "Assigned To": "Murtaz Haider",
          "Site Location": "14155 Sullyfield Circle Suite H, Chantilly, VA 20151",
          "Start Date": "09/05/22",
          "Start Time": "TBD",
        },
      ];
      columns = [
        { Header: "Reference ID", accessor: "Reference ID", align: "left" },
        { Header: "Task Title", accessor: "Task Title", align: "left" },
        { Header: "Project Manager", accessor: "Project Manager", align: "center" },
        { Header: "Assigned To", accessor: "Assigned To", align: "center" },
        { Header: "Site Location", accessor: "Site Location", align: "center" },
        { Header: "Start Date", accessor: "Start Date", align: "center" },
        { Header: "Start Time", accessor: "State Time", align: "center" },
        { Header: "z", accessor: "z", align: "center" },
      ];
    }
    if (props?.title === "Projects") {
      columns = [
        { Header: "Name", accessor: "Name", align: "left" },
        { Header: "Site Location", accessor: "Site Location", align: "center" },
        { Header: "Contact Number", accessor: "Contact Number", align: "center" },
        { Header: "Contact Name", accessor: "Contact Name", align: "center" },
      ];
      rows = [
        {
          Name: "Project 1",
          "Site Location": "14155 Sullyfield Circle, Suite h, Chantilly, VA 20151",
          "Contact Number": "090078601",
          "Contact Name": "ASAD",
        },
        {
          Name: "Project 2",
          "Site Location": "14155 Sullyfield Circle, Suite h, Chantilly, VA 20151",
          "Contact Number": "090078601",
          "Contact Name": "Ishaq",
        },
        {
          Name: "Project 2",
          "Site Location": "14155 Sullyfield Circle, Suite h, Chantilly, VA 20151",
          "Contact Number": "090078601",
          "Contact Name": "Ubaid",
        },
        {
          Name: "Project 1",
          "Site Location": "14155 Sullyfield Circle, Suite h, Chantilly, VA 20151",
          "Contact Number": "090078601",
          "Contact Name": "ASAD",
        },
        {
          Name: "Project 2",
          "Site Location": "14155 Sullyfield Circle, Suite h, Chantilly, VA 20151",
          "Contact Number": "090078601",
          "Contact Name": "Ishaq",
        },
        {
          Name: "Project 2",
          "Site Location": "14155 Sullyfield Circle, Suite h, Chantilly, VA 20151",
          "Contact Number": "090078601",
          "Contact Name": "Ubaid",
        },
      ];
    }
    if (props?.title === "Employees") {
      columns = [
        { Header: "Name", accessor: "Name", align: "left" },
        { Header: "Email", accessor: "Email", align: "left" },
        { Header: "Contact", accessor: "Contact", align: "center" },
        { Header: "Role", accessor: "Role", align: "center" },
        { Header: "Report", accessor: "Report", align: "center" },
      ];
      rows = [
        {
          Name: "Employee 1",
          Email: "xyz@gmail.com",
          Contact: "090078601",
          Role: "Technician",
          Report: "View",
        },
        {
          Name: "Employee 1",
          Email: "xyz@gmail.com",
          Contact: "090078601",
          Role: "Technician",
          Report: "View",
        },
        {
          Name: "Employee 1",
          Email: "xyz@gmail.com",
          Contact: "090078601",
          Role: "Technician",
          Report: "View",
        },
        {
          Name: "Employee 1",
          Email: "xyz@gmail.com",
          Contact: "090078601",
          Role: "Technician",
          Report: "View",
        },
        {
          Name: "Employee 1",
          Email: "xyz@gmail.com",
          Contact: "090078601",
          Role: "Technician",
          Report: "View",
        },
        {
          Name: "Employee 1",
          Email: "xyz@gmail.com",
          Contact: "090078601",
          Role: "Technician",
          Report: "View",
        },
        {
          Name: "Employee 1",
          Email: "xyz@gmail.com",
          Contact: "090078601",
          Role: "Technician",
          Report: "View",
        },
        {
          Name: "Employee 1",
          Email: "xyz@gmail.com",
          Contact: "090078601",
          Role: "Technician",
          Report: "View",
        },
        {
          Name: "Employee 1",
          Email: "xyz@gmail.com",
          Contact: "090078601",
          Role: "Technician",
          Report: "View",
        },
        {
          Name: "Employee 1",
          Email: "xyz@gmail.com",
          Contact: "090078601",
          Role: "Technician",
          Report: "View",
        },
        {
          Name: "Employee 1",
          Email: "xyz@gmail.com",
          Contact: "090078601",
          Role: "Technician",
          Report: "View",
        },
      ];
    }

    return { rows, columns };
  };
  const columns = getRows().columns;
  const rows = getRows().rows;

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
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
