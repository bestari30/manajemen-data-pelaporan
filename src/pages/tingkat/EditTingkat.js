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

import { getTingkatById, putTingkat } from "../../functions/Tingkat";

export default function EditTingkat(params) {
  // http://localhost:3000/#/app/editTingkat/1
  //alert(window.location.toString().slice(45));
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [namaTingkat, setNamaTingkat] = useState("");

  useEffect(() => {
    async function getData() {
      const dataTingkat = await getTingkatById(params.match.params.id);
      setNamaTingkat(dataTingkat.data.nama);
      setIsLoading(false);
    }
    getData();
  }, []);

  const editTingkat = async () => {
    const data = {
      id: params.match.params.id,
      nama: namaTingkat,
    };
    const response = await putTingkat(data);

    if (response.errorMessage === null) {
      history.push(`/app/tingkat`);
    }
  };

  return (
    <>
      <PageTitle
        title="Edit Tingkat"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/tingkat"
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
            container
            spacing={4}
            style={{ padding: "20px", backgroundColor: "white" }}
          >
            <Grid item xs={6}>
              <InputLabel shrink>Nama Tingkat</InputLabel>
              <TextField
                id="partner"
                value={namaTingkat}
                onChange={(e) => setNamaTingkat(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={6}
            style={{ padding: "20px", backgroundColor: "white" }}
          >
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                // href="#/app/Tingkat"
                margin="normal"
                onClick={editTingkat}
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
