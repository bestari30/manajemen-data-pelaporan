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

import { getKategoriById, putKategori } from "../../functions/Kategori";

export default function EditKategori(params) {
  // http://localhost:3000/#/app/editKategori/1
  //alert(window.location.toString().slice(45));
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [namaKategori, setNamaKategori] = useState("");

  useEffect(() => {
    async function getData() {
      const dataKategori = await getKategoriById(params.match.params.id);
      setNamaKategori(dataKategori.data.nama);
      setIsLoading(false);
    }
    getData();
  }, []);

  const editKategori = async () => {
    const data = {
      id: params.match.params.id,
      nama: namaKategori,
    };
    const response = await putKategori(data);

    if (response.errorMessage === null) {
      history.push(`/app/kategori`);
    }
  };

  return (
    <>
      <PageTitle
        title="Edit Kategori"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/kategori"
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
              <InputLabel shrink>Nama Kategori</InputLabel>
              <TextField
                id="partner"
                value={namaKategori}
                onChange={(e) => setNamaKategori(e.target.value)}
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
                // href="#/app/Kategori"
                margin="normal"
                onClick={editKategori}
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
