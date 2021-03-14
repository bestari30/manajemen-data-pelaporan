import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
import CustomModalDetail from "../../components/CustomModalDetail/CustomModalDetail";
import { Table } from "../../components/Table/Table";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
  Grid,
  IconButton,
  ButtonGroup,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  getKerjasama,
  putKerjasama,
  postKerjasama,
  deleteKerjasama,
} from "../../functions/Kerjasama";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { getProgramStudi } from "../../functions/ProgramStudi";
import { getNegara } from "../../functions/Negara";
import { getJenisPartner } from "../../functions/JenisPartner";
import { getJenisDokumen } from "../../functions/JenisDokumen";
import { getBentukKegiatan } from "../../functions/BentukKegiatan";

export default function Kerjasama() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataProgramStudi, setDataProgramStudi] = useState([]);
  const [dataNegara, setDataNegara] = useState([]);
  const [dataJenisPartner, setDataJenisPartner] = useState([]);
  const [dataJenisDokumen, setDataJenisDokumen] = useState([]);
  const [dataBentukKegiatan, setDataBentukKegiatan] = useState([]);
  const [editState, setEditState] = useState({
    id: "",
    partner: "",
    id_program_studi: "",
    id_negara: "",
    id_jenis_partner: "",
    id_jenis_dokumen: "",
    id_bentuk_kegiatan: "",
    tanggal_awal: "",
    tanggal_akhir: "",
    status: "",
  });
  const [tambahState, setTambahState] = useState({
    partner: "",
    id_program_studi: "",
    id_negara: "",
    id_jenis_partner: "",
    id_jenis_dokumen: "",
    id_bentuk_kegiatan: "",
    tanggal_awal: "",
    tanggal_akhir: "",
    status: "",
  });

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

      const data = await getKerjasama();
      let result = [];
      data.data.forEach((x, i) => {
        const flattenData = {
          no: i + 1,
          id: x.id,
          tanggal_awal: x.tanggal_awal,
          tanggal_akhir: x.tanggal_akhir,
          partner: x.partner,
          status: x.status,
          dokumen: x.dokumen,
          nama_program_studi: x.program_studi.nama,
          nama_jenis_partner: x.jenis_partner.nama,
          nama_jenis_dokumen: x.jenis_dokumen.nama,
          nama_bentuk_kegiatan: x.bentuk_kegiatan.nama,
          nama_negara: x.negara.name,
          id_program_studi: x.program_studi.id,
          id_jenis_partner: x.jenis_partner.id,
          id_jenis_dokumen: x.jenis_dokumen.id,
          id_bentuk_kegiatan: x.bentuk_kegiatan.id,
          id_negara: x.negara.id,
        };
        result.push(flattenData);
      });
      setState(result);
      setIsLoading(false);
    }
    getData();
  }, []);

  const getDataKerjasama = async () => {
    const data = await getKerjasama();
    let result = [];

    data.data.forEach((x, i) => {
      const flattenData = {
        no: i + 1,
        id: x.id,
        tanggal_awal: x.tanggal_awal,
        tanggal_akhir: x.tanggal_akhir,
        partner: x.partner,
        status: x.status,
        dokumen: x.dokumen,
        nama_program_studi: x.program_studi.nama,
        nama_jenis_partner: x.jenis_partner.nama,
        nama_jenis_dokumen: x.jenis_dokumen.nama,
        nama_bentuk_kegiatan: x.bentuk_kegiatan.nama,
        nama_negara: x.negara.name,
        id_program_studi: x.program_studi.id,
        id_jenis_partner: x.jenis_partner.id,
        id_jenis_dokumen: x.jenis_dokumen.id,
        id_bentuk_kegiatan: x.bentuk_kegiatan.id,
        id_negara: x.negara.id,
      };
      result.push(flattenData);
    });

    setState(result);
  };

  const editKerjasama = async () => {
    setIsLoading(true);
    const response = await putKerjasama(editState);

    if (response.errorMessage === null) {
      history.push(`/app/kerjasama`);
    }
    getDataKerjasama();
    setIsLoading(false);
    setEditState({
      id: "",
      partner: "",
      id_program_studi: "",
      id_negara: "",
      id_jenis_partner: "",
      id_jenis_dokumen: "",
      id_bentuk_kegiatan: "",
      tanggal_awal: "",
      tanggal_akhir: "",
      status: "",
    });
  };

  const insertKerjasama = async () => {
    setIsLoading(true);
    const response = await postKerjasama(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/kerjasama`);
    }
    getDataKerjasama();
    setIsLoading(false);
    setEditState({
      id: "",
      partner: "",
      id_program_studi: "",
      id_negara: "",
      id_jenis_partner: "",
      id_jenis_dokumen: "",
      id_bentuk_kegiatan: "",
      tanggal_awal: "",
      tanggal_akhir: "",
      status: "",
    });
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        display: false,
        download: false,
      },
    },
    {
      name: "no",
      label: "No",
      options: {
        filter: false,
        sort: true,
        display: true,
      },
    },
    {
      name: "id_program_studi",
      label: "Program Studi",
      options: {
        filter: false,
        sort: false,
        display: false,
        download: false,
      },
    },
    {
      name: "nama_program_studi",
      label: "Program Studi",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "tanggal_awal",
      label: "Tanggal Awal",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "tanggal_akhir",
      label: "Tanggal Akhir",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "partner",
      label: "Partner",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "id_negara",
      label: "Negara",
      options: {
        filter: false,
        sort: false,
        display: false,
        download: false,
      },
    },
    {
      name: "nama_negara",
      label: "Negara",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id_jenis_partner",
      label: "Jenis Partner",
      options: {
        filter: false,
        sort: false,
        display: false,
        download: false,
      },
    },
    {
      name: "nama_jenis_partner",
      label: "Jenis Partner",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id_jenis_dokumen",
      label: "Jenis Partner",
      options: {
        filter: false,
        sort: false,
        display: false,
        download: false,
      },
    },
    {
      name: "nama_jenis_dokumen",
      label: "Jenis Dokumen",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id_bentuk_kegiatan",
      label: "Jenis Partner",
      options: {
        filter: false,
        sort: false,
        display: false,
        download: false,
      },
    },
    {
      name: "nama_bentuk_kegiatan",
      label: "Bentuk Kegiatan",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dokumen",
      label: "Dokumen",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        print: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
              >
                {/* BUTTON VIEW */}
                <IconButton size="small">
                  <CustomModalDetail
                    handleEdit={() => {}}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      console.log(rowData);
                      setEditState({
                        id: rowData[0],
                        partner: rowData[6],
                        id_program_studi: rowData[2],
                        id_negara: rowData[7],
                        id_jenis_partner: rowData[9],
                        id_jenis_dokumen: rowData[11],
                        id_bentuk_kegiatan: rowData[13],
                        tanggal_awal: rowData[4],
                        tanggal_akhir: rowData[5],
                        status: rowData[15],
                        dokumen: rowData[16],
                      });
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Typography variant="caption">Partner</Typography>
                        <TextField
                          size="small"
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.partner}
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption">
                          Nama Program Studi
                        </Typography>
                        <Select
                          margin="dense"
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_program_studi}
                          inputProps={{ readOnly: true }}
                        >
                          {dataProgramStudi.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Typography variant="caption">Negara</Typography>
                        <Select
                          margin="dense"
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_negara}
                          inputProps={{ readOnly: true }}
                        >
                          {dataNegara.map((x) => (
                            <MenuItem value={x.id}>{x.name}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption">Jenis Partner</Typography>
                        <Select
                          margin="dense"
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_jenis_partner}
                          inputProps={{ readOnly: true }}
                        >
                          {dataJenisPartner.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Typography variant="caption">Jenis Dokumen</Typography>
                        <Select
                          margin="dense"
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_jenis_dokumen}
                          inputProps={{ readOnly: true }}
                        >
                          {dataJenisDokumen.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption">
                          Bentuk Kegiatan
                        </Typography>
                        <Select
                          margin="dense"
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_bentuk_kegiatan}
                          inputProps={{ readOnly: true }}
                        >
                          {dataBentukKegiatan.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Typography variant="caption">Tanggal Awal</Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="date"
                          value={editState.tanggal_awal}
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption">Tanggal Akhir</Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="date"
                          value={editState.tanggal_akhir}
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Typography variant="caption">Status</Typography>
                        <Select
                          margin="dense"
                          style={{ marginBottom: "10px" }}
                          value={editState.status}
                          inputProps={{ readOnly: true }}
                          fullWidth
                        >
                          <MenuItem value="Aktif">Aktif</MenuItem>
                          <MenuItem value="Non-Aktif">Non Aktif</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption">Dokumen URL</Typography>
                        <TextField
                          size="small"
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.dokumen}
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                    </Grid>
                  </CustomModalDetail>
                </IconButton>
                <IconButton size="small">
                  <CustomModalEdit
                    handleEdit={() => {
                      editKerjasama();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      console.log(rowData);
                      setEditState({
                        id: rowData[0],
                        partner: rowData[6],
                        id_program_studi: rowData[2],
                        id_negara: rowData[7],
                        id_jenis_partner: rowData[9],
                        id_jenis_dokumen: rowData[11],
                        id_bentuk_kegiatan: rowData[13],
                        tanggal_awal: rowData[4],
                        tanggal_akhir: rowData[5],
                        status: rowData[15],
                      });
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Typography variant="caption">Partner</Typography>
                        <TextField
                          size="small"
                          variant="outlined"
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.partner}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              partner: e.target.value,
                            }));
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption">
                          Nama Program Studi
                        </Typography>
                        <Select
                          margin="dense"
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_program_studi}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              id_program_studi: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        >
                          {dataProgramStudi.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Typography variant="caption">Negara</Typography>
                        <Select
                          margin="dense"
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_negara}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              id_negara: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        >
                          {dataNegara.map((x) => (
                            <MenuItem value={x.id}>{x.name}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption">Jenis Partner</Typography>
                        <Select
                          margin="dense"
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_jenis_partner}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              id_jenis_partner: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        >
                          {dataJenisPartner.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Typography variant="caption">Jenis Dokumen</Typography>
                        <Select
                          margin="dense"
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_jenis_dokumen}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              id_jenis_dokumen: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        >
                          {dataJenisDokumen.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption">
                          Bentuk Kegiatan
                        </Typography>
                        <Select
                          margin="dense"
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_bentuk_kegiatan}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              id_bentuk_kegiatan: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        >
                          {dataBentukKegiatan.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Typography variant="caption">Tanggal Awal</Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="date"
                          value={editState.tanggal_awal}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              tanggal_awal: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption">Tanggal Akhir</Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="date"
                          value={editState.tanggal_akhir}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              tanggal_akhir: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Typography variant="caption">Status</Typography>
                        <Select
                          margin="dense"
                          style={{ marginBottom: "10px" }}
                          value={editState.status}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              status: e.target.value,
                            }));
                          }}
                          fullWidth
                          variant="outlined"
                        >
                          <MenuItem value="Aktif">Aktif</MenuItem>
                          <MenuItem value="Non-Aktif">Non Aktif</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption">
                          Upload Dokumen
                        </Typography>
                        <input
                          accept="image/*"
                          id="contained-button-file"
                          // multiple
                          type="file"
                        />
                      </Grid>
                    </Grid>
                  </CustomModalEdit>
                </IconButton>
                <IconButton size="small">
                  {/* CUSTOM MODAL DELETE */}
                  <CustomModalDelete
                    handleDelete={async () => {
                      setIsLoading(true);
                      await deleteKerjasama(tableMeta.rowData[0]);
                      getDataKerjasama();
                      setIsLoading(false);
                    }}
                  />
                </IconButton>
              </ButtonGroup>
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <PageTitle
        title="Kerjasama"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertKerjasama();
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography variant="caption">Partner</Typography>
                <TextField
                  size="small"
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.partner}
                  onChange={(e) => {
                    setTambahState((c) => ({ ...c, partner: e.target.value }));
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Program Studi</Typography>
                <Select
                  margin="dense"
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.id_program_studi}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      id_program_studi: e.target.value,
                    }));
                  }}
                  variant="outlined"
                >
                  {dataProgramStudi.map((x) => (
                    <MenuItem value={x.id}>{x.nama}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography variant="caption">Negara</Typography>
                <Select
                  margin="dense"
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.id_negara}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      id_negara: e.target.value,
                    }));
                  }}
                  variant="outlined"
                >
                  {dataNegara.map((x) => (
                    <MenuItem value={x.id}>{x.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Jenis Partner</Typography>
                <Select
                  margin="dense"
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.id_jenis_partner}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      id_jenis_partner: e.target.value,
                    }));
                  }}
                  variant="outlined"
                >
                  {dataJenisPartner.map((x) => (
                    <MenuItem value={x.id}>{x.nama}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography variant="caption">Jenis Dokumen</Typography>
                <Select
                  margin="dense"
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.id_jenis_dokumen}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      id_jenis_dokumen: e.target.value,
                    }));
                  }}
                  variant="outlined"
                >
                  {dataJenisDokumen.map((x) => (
                    <MenuItem value={x.id}>{x.nama}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Bentuk Kegiatan</Typography>
                <Select
                  margin="dense"
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.id_bentuk_kegiatan}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      id_bentuk_kegiatan: e.target.value,
                    }));
                  }}
                  variant="outlined"
                >
                  {dataBentukKegiatan.map((x) => (
                    <MenuItem value={x.id}>{x.nama}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography variant="caption">Tanggal Awal</Typography>
                <TextField
                  size="small"
                  fullWidth
                  type="date"
                  value={tambahState.tanggal_awal}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      tanggal_awal: e.target.value,
                    }));
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Tanggal Akhir</Typography>
                <TextField
                  size="small"
                  fullWidth
                  type="date"
                  value={tambahState.tanggal_akhir}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      tanggal_akhir: e.target.value,
                    }));
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography variant="caption">Status</Typography>
                <Select
                  margin="dense"
                  style={{ marginBottom: "13px" }}
                  value={tambahState.status}
                  onChange={(e) => {
                    setTambahState((c) => ({ ...c, status: e.target.value }));
                  }}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="Aktif">Aktif</MenuItem>
                  <MenuItem value="Non-Aktif">Non Aktif</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Upload Dokumen</Typography>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  // multiple
                  type="file"
                />
              </Grid>
            </Grid>
          </CustomModalTambah>
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={50} style={{ marginTop: 50 }} />
            </div>
          ) : (
            <Table data={state} columns={columns} />
          )}
        </Grid>
      </Grid>
    </>
  );
}
