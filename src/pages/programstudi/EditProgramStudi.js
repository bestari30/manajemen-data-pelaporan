import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import {
  getProgramStudiById,
  putProgramStudi,
} from "../../functions/ProgramStudi";

export default function EditProgramStudi(params) {
  // http://localhost:3000/#/app/editprogramstudi/1
  //alert(window.location.toString().slice(45));
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [namaProgramStudi, setNamaProgramStudi] = useState("");

  useEffect(() => {
    async function getData() {
      const dataProgramStudi = await getProgramStudiById(
        params.match.params.id,
      );
      setNamaProgramStudi(dataProgramStudi.data.nama);
      setIsLoading(false);
    }
    getData();
  }, []);

  const editProgramStudi = async () => {
    const data = {
      id: params.match.params.id,
      nama: namaProgramStudi,
    };
    const response = await putProgramStudi(data);

    if (response.errorMessage === null) {
      history.push(`/app/programstudi`);
    }
  };

  return (
    <>
      <PageTitle
        title="Edit Program Studi"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/programstudi"
            margin="normal"
          >
            Kembali
          </Button>
        }
      />
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={50} style={{ marginTop: 50 }} />
        </div>
      ) : (
        <>
          <Grid
            item
            spacing={4}
            style={{
              padding: "45px",
              backgroundColor: "white",
              boxShadow: "1px 3px 8px 1px grey",
            }}
          >
            <Grid item xs={6}>
              <InputLabel shrink>Nama Program Studi</InputLabel>
              <TextField
                id="partner"
                value={namaProgramStudi}
                onChange={(e) => setNamaProgramStudi(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "40px" }}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                margin="normal"
                onClick={editProgramStudi}
              >
                Simpan
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
