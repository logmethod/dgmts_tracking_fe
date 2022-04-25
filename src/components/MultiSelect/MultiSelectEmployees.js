import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MDBox from "components/MDBox";
import { useDispatch, useSelector } from "react-redux";
import { employeeSelector } from "redux/reducers/employee";

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

export default function MultipleSelectPlaceholder({ setManager }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [employeeRow, setEmployeeRow] = React.useState([]);

  const { employee } = useSelector(employeeSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    employee.length === 0 && dispatch(getEmployees({ token }));
    setEmployeeRow(employee);
  }, [employee]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedUser = employee.find((emp) => emp.id === value);
    setPersonName(selectedUser.name.split(",") || "");
    // alert(typeof value === "string" ? value.split(",") : value);
    setManager(typeof value === "string" ? value.split(",") : selectedUser.name);
  };

  var employeExloadAdmin = employee.filter((el) => el.role != "ADMIN");

  return (
    <div>
      <MDBox mb={2}>
        <FormControl sx={{ m: 1, width: 500, mt: 3 }}>
          <Select
            displayEmpty
            value={personName}
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
            onChange={handleChange}
            input={<OutlinedInput value={personName} />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Select Employees</em>;
              }

              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Select Employees</em>
            </MenuItem>
            {employeExloadAdmin.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                style={getStyles(item.name, personName, theme)}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </MDBox>
    </div>
  );
}
