import { React, useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";

import { getProgramStudi } from "./functions/Tables";

const columns = [
  {
    name: "id",
    label: "ID",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "nama",
    label: "Nama",
    options: {
      filter: true,
      sort: true,
    },
  },
];

const options = {
  filterType: "checkbox",
};

export default function Tables() {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await getProgramStudi();
      setState(data.data);
    }
    getData();
  }, []);

  return (
    <>
      <PageTitle
        title="Program Studi"
        button={
          <Button variant="contained" size="medium" color="primary">
            Tambah
          </Button>
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Program Studi"
            data={state}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
