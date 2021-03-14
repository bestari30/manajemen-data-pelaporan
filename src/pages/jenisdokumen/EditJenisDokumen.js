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
  getJenisDokumenById,
  putJenisDokumen,
} from "../../functions/JenisDokumen";

export default function EditJenisDokumen(params) {
  // http://localhost:3000/#/app/editJenisDokumen/1
  //alert(window.location.toString().slice(45));
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [namaJenisDokumen, setNamaJenisDokumen] = useState("");

  useEffect(() => {
    async function getData() {
      const dataJenisDokumen = await getJenisDokumenById(
        params.match.params.id,
      );
      setNamaJenisDokumen(dataJenisDokumen.data.nama);
      setIsLoading(false);
    }
    getData();
  }, []);

  const editJenisDokumen = async () => {
    const data = {
      id: params.match.params.id,
      nama: namaJenisDokumen,
    };
    const response = await putJenisDokumen(data);

    if (response.errorMessage === null) {
      history.push(`/app/jenisdokumen`);
    }
  };

  return (
    <>
      <PageTitle
        title="Edit Jenis Dokumen"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/jenisdokumen"
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
              <InputLabel shrink>Nama Jenis Dokumen</InputLabel>
              <TextField
                id="partner"
                value={namaJenisDokumen}
                onChange={(e) => setNamaJenisDokumen(e.target.value)}
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
                onClick={editJenisDokumen}
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
