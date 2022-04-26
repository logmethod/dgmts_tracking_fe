import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MDBox from "components/MDBox";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, projectSelector } from "redux/reducers/projects";
import { getEmployees, employeeSelector } from "redux/reducers/employee";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectProject() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [projectRow, setProjectRow] = React.useState([]);
  const [employeeRow, setEmployeeRow] = React.useState([]);

  const { projects } = useSelector(projectSelector);
  const { employee } = useSelector(employeeSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    projects.length === 0 && dispatch(getProjects({ token }));
    setProjectRow(projects);
  }, [projects]);

  React.useEffect(() => {
    employee.length === 0 && dispatch(getEmployees({ token }));
    setEmployeeRow(employee);
  }, [employee]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  var projectsTitleArray = projects.map(function (el) {
    return el.title;
  });
  const names = projectsTitleArray;
  return (
    <div>
      <MDBox mb={2}>
        <FormControl sx={{ m: 1, width: 500, mt: 3 }}>
          <Select
            displayEmpty
            value={personName}
            style={{
              paddingTop: "12px",
              paddingBottom: "12px",
              marginLeft: "-7px",
              marginRight: "-2px",
            }}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Select Project</em>;
              }

              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Select Project</em>
            </MenuItem>
            {names.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </MDBox>
    </div>
  );
}
