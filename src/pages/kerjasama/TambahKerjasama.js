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

import { getProgramStudi } from "../../functions/ProgramStudi";
import { getNegara } from "../../functions/Negara";
import { getJenisPartner } from "../../functions/JenisPartner";
import { getJenisDokumen } from "../../functions/JenisDokumen";
import { getBentukKegiatan } from "../../functions/BentukKegiatan";

import { postKerjasama } from "../../functions/Kerjasama";

export default function TambahKerjasama() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const [partner, setPartner] = useState("");
  const [programStudi, setProgramStudi] = useState("");
  const [jenisPartner, setJenisPartner] = useState("");
  const [jenisDokumen, setJenisDokumen] = useState("");
  const [bentukKegiatan, setBentukKegiatan] = useState("");
  const [status, setStatus] = useState("");
  const [negara, setNegara] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");

  const [dataProgramStudi, setDataProgramStudi] = useState([]);
  const [dataNegara, setDataNegara] = useState([]);
  const [dataJenisPartner, setDataJenisPartner] = useState([]);
  const [dataJenisDokumen, setDataJenisDokumen] = useState([]);
  const [dataBentukKegiatan, setDataBentukKegiatan] = useState([]);

  useEffect(() => {
    async function getData() {
      const dataProgramStudi = await getProgramStudi();
      const dataNegara = await getNegara();
      const dataJenisPartner = await getJenisPartner();
      const dataJenisDokumen = await getJenisDokumen();
      const dataBentukKegiatan = await getBentukKegiatan();
      setDataProgramStudi(dataProgramStudi.data);
      setDataNegara(dataNegara.data);
      setDataJenisPartner(dataJenisPartner.data);
      setDataJenisDokumen(dataJenisDokumen.data);
      setDataBentukKegiatan(dataBentukKegiatan.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const insertKerjasama = async () => {
    const data = {
      partner: partner,
      id_program_studi: programStudi,
      id_negara: negara,
      id_jenis_partner: jenisPartner,
      id_jenis_dokumen: jenisDokumen,
      id_bentuk_kegiatan: bentukKegiatan,
      tanggal_awal: tanggalAwal,
      tanggal_akhir: tanggalAkhir,
      status: status,
    };
    const response = await postKerjasama(data);

    if (response.errorMessage === null) {
      history.push(`/app/kerjasama`);
    }
  };

  return (
    <>
      <PageTitle
        title="Tambah Kerjasama"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/kerjasama"
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
          <Grid container spacing={4} style={{ backgroundColor: "white" }}>
            <Grid item xs={6}>
              <InputLabel shrink>Partner</InputLabel>
              <TextField
                id="partner"
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink>Program Studi</InputLabel>
              <Select
                value={programStudi}
                onChange={(e) => setProgramStudi(e.target.value)}
                fullWidth
              >
                {dataProgramStudi.map((x) => (
                  <MenuItem value={x.id}>{x.nama}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink>Negara</InputLabel>
              <Select
                value={negara}
                onChange={(e) => setNegara(e.target.value)}
                fullWidth
              >
                {dataNegara.map((x) => (
                  <MenuItem value={x.id}>{x.nicename}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink>Jenis Partner</InputLabel>
              <Select
                value={jenisPartner}
                onChange={(e) => setJenisPartner(e.target.value)}
                fullWidth
              >
                {dataJenisPartner.map((x) => (
                  <MenuItem value={x.id}>{x.nama}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink>Jenis Dokumen</InputLabel>
              <Select
                value={jenisDokumen}
                onChange={(e) => setJenisDokumen(e.target.value)}
                fullWidth
              >
                {dataJenisDokumen.map((x) => (
                  <MenuItem value={x.id}>{x.nama}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink>Bentuk Kegiatan</InputLabel>
              <Select
                value={bentukKegiatan}
                onChange={(e) => setBentukKegiatan(e.target.value)}
                fullWidth
              >
                {dataBentukKegiatan.map((x) => (
                  <MenuItem value={x.id}>{x.nama}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={tanggalAwal}
                id="tanggal_awal"
                label="Tanggal Awal"
                type="date"
                onChange={(e) => setTanggalAwal(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={tanggalAkhir}
                id="tanggal_akhir"
                label="Tanggal Akhir"
                type="date"
                onChange={(e) => setTanggalAkhir(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
              >
                <MenuItem value={1}>Aktif</MenuItem>
                <MenuItem value={0}>Non Aktif</MenuItem>
              </Select>
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
                // href="#/app/kerjasama"
                margin="normal"
                onClick={insertKerjasama}
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
