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
  getJenisPartnerById,
  putJenisPartner,
} from "../../functions/JenisPartner";

export default function EditJenisPartner(params) {
  // http://localhost:3000/#/app/editJenisPartner/1
  //alert(window.location.toString().slice(45));
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [namaJenisPartner, setNamaJenisPartner] = useState("");

  useEffect(() => {
    async function getData() {
      const dataJenisPartner = await getJenisPartnerById(
        params.match.params.id,
      );
      setNamaJenisPartner(dataJenisPartner.data.nama);
      setIsLoading(false);
    }
    getData();
  }, []);

  const editJenisPartner = async () => {
    const data = {
      id: params.match.params.id,
      nama: namaJenisPartner,
    };
    const response = await putJenisPartner(data);

    if (response.errorMessage === null) {
      history.push(`/app/jenispartner`);
    }
  };

  return (
    <>
      <PageTitle
        title="Edit Jenis Partner"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/jenispartner"
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
              <InputLabel shrink>Nama Jenis Partner</InputLabel>
              <TextField
                id="partner"
                value={namaJenisPartner}
                onChange={(e) => setNamaJenisPartner(e.target.value)}
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
                onClick={editJenisPartner}
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
