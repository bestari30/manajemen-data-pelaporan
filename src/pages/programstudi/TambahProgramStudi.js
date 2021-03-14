import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { postProgramStudi } from "../../functions/ProgramStudi";

export default function TambahProgramStudi() {
  const history = useHistory();
  const [namaProgramStudi, setNamaProgramStudi] = useState("");

  const insertProgramStudi = async () => {
    // alert(namaProgramStudi);
    const data = {
      nama: namaProgramStudi,
    };
    const response = await postProgramStudi(data);

    if (response.errorMessage === null) {
      history.push(`/app/programstudi`);
    }
  };

  return (
    <>
      <PageTitle
        title="Tambah Program Studi"
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
      <Grid item>
        <Box boxShadow={3} p={3} bgcolor={"white"}>
          <Grid item xs={6}>
            <>
              <InputLabel shrink>Nama Program Studi</InputLabel>
              <TextField
                id="partner"
                value={namaProgramStudi}
                onChange={(e) => setNamaProgramStudi(e.target.value)}
                type="text"
                fullWidth
              />
            </>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "40px" }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              margin="normal"
              onClick={insertProgramStudi}
            >
              Simpan
            </Button>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}
