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

import { getNegaraById, putNegara } from "../../functions/Negara";

export default function EditNegara(params) {
  // http://localhost:3000/#/app/editNegara/1
  //alert(window.location.toString().slice(45));
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isoNegara, setIsoNegara] = useState("");
  const [namaNegara, setNamaNegara] = useState("");
  const [niceNameNegara, setNiceNameNegara] = useState("");
  const [iso3Negara, setIso3Negara] = useState("");
  const [kodeNegara, setKodeNegara] = useState("");
  const [kodeTeleponNegara, setKodeTeleponNegara] = useState("");

  useEffect(() => {
    async function getData() {
      const dataNegara = await getNegaraById(params.match.params.id);
      setIsoNegara(dataNegara.data.iso);
      setNamaNegara(dataNegara.data.name);
      setNiceNameNegara(dataNegara.data.nicename);
      setIso3Negara(dataNegara.data.iso3);
      setKodeNegara(dataNegara.data.numcode);
      setKodeTeleponNegara(dataNegara.data.phonecode);
      setIsLoading(false);
    }
    getData();
  }, []);

  const editNegara = async () => {
    // alert(namaNegara);
    const data = {
      id: params.match.params.id,
      iso: isoNegara,
      name: namaNegara,
      nicename: niceNameNegara,
      iso3: iso3Negara,
      numcode: kodeNegara,
      phonecode: kodeTeleponNegara,
    };
    const response = await putNegara(data);

    if (response.errorMessage === null) {
      history.push(`/app/negara`);
    }
  };

  return (
    <>
      <PageTitle
        title="Edit Negara"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/negara"
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
              <InputLabel shrink>ISO</InputLabel>
              <TextField
                id="partner"
                value={isoNegara}
                onChange={(e) => setIsoNegara(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink>Nama Negara</InputLabel>
              <TextField
                id="partner"
                value={namaNegara}
                onChange={(e) => setNamaNegara(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink>Nama Baik Negara</InputLabel>
              <TextField
                id="partner"
                value={niceNameNegara}
                onChange={(e) => setNiceNameNegara(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink>ISO 3</InputLabel>
              <TextField
                id="partner"
                value={iso3Negara}
                onChange={(e) => setIso3Negara(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink>Kode Negara</InputLabel>
              <TextField
                id="partner"
                value={kodeNegara}
                onChange={(e) => setKodeNegara(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink>Kode Telepon Negara</InputLabel>
              <TextField
                id="partner"
                value={kodeTeleponNegara}
                onChange={(e) => setKodeTeleponNegara(e.target.value)}
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
                // href="#/app/Negara"
                margin="normal"
                onClick={editNegara}
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
