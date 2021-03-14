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

import { getMahasiswaById, putMahasiswa } from "../../functions/Mahasiswa";

export default function EditMahasiswa(params) {
  // http://localhost:3000/#/app/editMahasiswa/1
  //alert(window.location.toString().slice(45));
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [namaMahasiswa, setNamaMahasiswa] = useState("");

  useEffect(() => {
    async function getData() {
      const dataMahasiswa = await getMahasiswaById(params.match.params.id);
      setNamaMahasiswa(dataMahasiswa.data.nama);
      setIsLoading(false);
    }
    getData();
  }, []);

  const editMahasiswa = async () => {
    const data = {
      id: params.match.params.id,
      nama: namaMahasiswa,
    };
    const response = await putMahasiswa(data);

    if (response.errorMessage === null) {
      history.push(`/app/mahasiswa`);
    }
  };

  return (
    <>
      <PageTitle
        title="Edit Mahasiswa"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/mahasiswa"
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
              <InputLabel shrink>Nama Mahasiswa</InputLabel>
              <TextField
                id="partner"
                value={namaMahasiswa}
                onChange={(e) => setNamaMahasiswa(e.target.value)}
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
                margin="normal"
                onClick={editMahasiswa}
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
