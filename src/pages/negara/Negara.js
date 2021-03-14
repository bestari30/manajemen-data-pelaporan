import { Table } from "../../components/Table/Table";
import { React, useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { getNegara } from "../../functions/Negara";

export default function Negara() {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await getNegara();
      let result = [];

      data.data.forEach((x, i) => {
        x = { ...x, no: i + 1 };
        result.push(x);
      });
      setState(result);
      setIsLoading(false);
    }
    getData();
  }, []);

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "no",
      label: "No",
      options: {
        filter: false,
        sort: true,
        display: true,
      },
    },
    {
      name: "iso",
      label: "ISO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Nama Negara",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nicename",
      label: "Nama Baik",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "iso3",
      label: "ISO 3",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "numcode",
      label: "Kode Negara",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phonecode",
      label: "Kode Telpon Negara",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  return (
    <>
      <PageTitle
        title="Negara"
        // button={
        //   <Button
        //     variant="contained"
        //     size="medium"
        //     color="primary"
        //     href="#/app/TambahNegara"
        //   >
        //     Tambah
        //   </Button>
        // }
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={50} style={{ marginTop: 50 }} />
            </div>
          ) : (
            <Table data={state} columns={columns} />
          )}
        </Grid>
      </Grid>
    </>
  );
}
