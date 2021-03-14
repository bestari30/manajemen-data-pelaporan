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
  getBentukKegiatanById,
  putBentukKegiatan,
} from "../../functions/BentukKegiatan";

export default function EditBentukKegiatan(params) {
  // http://localhost:3000/#/app/editBentukKegiatan/1
  //alert(window.location.toString().slice(45));
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [namaBentukKegiatan, setNamaBentukKegiatan] = useState("");

  useEffect(() => {
    async function getData() {
      const dataBentukKegiatan = await getBentukKegiatanById(
        params.match.params.id,
      );
      setNamaBentukKegiatan(dataBentukKegiatan.data.nama);
      setIsLoading(false);
    }
    getData();
  }, []);

  const editBentukKegiatan = async () => {
    const data = {
      id: params.match.params.id,
      nama: namaBentukKegiatan,
    };
    const response = await putBentukKegiatan(data);

    if (response.errorMessage === null) {
      history.push(`/app/bentukkegiatan`);
    }
  };

  return (
    <>
      <PageTitle
        title="Edit Bentuk Kegiatan"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/bentukkegiatan"
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
              <InputLabel shrink>Nama Bentuk Kegiatan</InputLabel>
              <TextField
                id="partner"
                value={namaBentukKegiatan}
                onChange={(e) => setNamaBentukKegiatan(e.target.value)}
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
                onClick={editBentukKegiatan}
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
