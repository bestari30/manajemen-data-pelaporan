import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTableHeadCell: {
        fixedHeader: {
          backgroundColor: fade("#006600", 0.2), //#558000
          fontWeight: "900",
          textTransform: "uppercase",
          // width:"2px",
        },
      },
    },
  });

const options = {
  selectableRows: false,
  filterType: "dropdown",
  responsive: "stacked",
  filter: true,
  download: true,
  print: true,
  viewColumns: false,
};

export const Table = ({ data, columns }) => {
  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
};
