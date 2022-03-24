import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import { ArrowForward } from "@mui/icons-material";

export default function AddEmployeeModel({ Open }) {
  const [open, setOpen] = React.useState(Open);
  console.log("open in compo --", Open);
  const handleClickOpen = (Open) => {
    setOpen(Open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Employee Name</DialogTitle>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <div style={{ display: "flex" }}>
              <MDBox mb={2}>
                <DialogContentText>To</DialogContentText>
                <DialogContentText
                  style={{
                    borderWidth: "1px",
                    borderColor: "#aaaaaa",
                    borderStyle: "solid",
                    padding: "8px",
                  }}
                >
                  {" "}
                  DD/MM/YYYY
                </DialogContentText>
              </MDBox>
              <ArrowForward
                style={{ marginRight: "69px", marginLeft: "69px", alignSelf: "center" }}
              />
              <MDBox mb={2}>
                <DialogContentText>From</DialogContentText>
                <DialogContentText
                  style={{
                    borderWidth: "1px",
                    borderColor: "#aaaaaa",
                    borderStyle: "solid",
                    padding: "8px",
                  }}
                >
                  DD/MM/YYYY
                </DialogContentText>
              </MDBox>
            </div>

            <MDBox mb={2} style={{ color: "#2D3748" }}>
              <DialogContentText>Total Working hours</DialogContentText>
              <DialogContentText>20.7</DialogContentText>
            </MDBox>
            <MDBox mb={2} style={{ marginBottom: "30px" }}>
              <DialogContentText style={{ color: "#2D3748" }}>Total Travel hours</DialogContentText>
              <DialogContentText>5.3</DialogContentText>
            </MDBox>
            <MDBox mb={2} style={{ marginBottom: "30px" }}>
              <DialogContentText style={{ color: "#2D3748" }}>Total Tasks</DialogContentText>
              <DialogContentText>05</DialogContentText>
            </MDBox>
          </MDBox>
        </MDBox>

        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton variant="gradient" color="info" fullWidth>
            Close
          </MDButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
