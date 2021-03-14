import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
import CustomModalDetail from "../../components/CustomModalDetail/CustomModalDetail";
import { Table } from "../../components/Table/Table";
import {
  Grid,
  IconButton,
  ButtonGroup,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { getProgramStudi } from "../../functions/ProgramStudi";
import {
  getSertifikasi,
  putSertifikasi,
  deleteSertifikasi,
  postSertifikasi,
} from "../../functions/Sertifikasi";
import { getDosen } from "../../functions/Dosen";

export default function Sertifikasi() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataProgramStudi, setDataProgramStudi] = useState([]);
  const [dataDosen, setDataDosen] = useState([]);
  const [editState, setEditState] = useState({
    id: "",
    id_program_studi: "",
    tahun_ajaran: "",
    semester: "",
    nama_dosen: "",
    pelatihan: "",
  });
  const [tambahState, setTambahState] = useState({
    id_program_studi: "",
    tahun_ajaran: "",
    semester: "",
    nama_dosen: "",
    pelatihan: "",
  });

  useEffect(() => {
    async function getData() {
      const dataDosen = await getDosen();
      const dataProgramStudi = await getProgramStudi();
      setDataDosen(dataDosen.data);
      setDataProgramStudi(dataProgramStudi.data);
      getDataSertifikasi();
    }
    getData();
  }, []);

  const getDataSertifikasi = async () => {
    setIsLoading(true);
    const data = await getSertifikasi();
    let result = [];

    data.data.map((x, i) => {
      const flattenData = {
        no: i + 1,
        id: x.id,
        id_program_studi: x.program_studi.id,
        nama_program_studi: x.program_studi.nama,
        tahun_ajaran: x.tahun_ajaran,
        semester: x.semester,
        nama_dosen: x.dosen?.nama,
        pelatihan: x.pelatihan,
        id_dosen: x.dosen?.id,
        nama_dosen: x.dosen?.nama,
        nidn_dosen: x.dosen?.nidn,
        dosen: x.dosen,
        penyelenggara: x.penyelenggara,
        tahun_ajaran_semester: x.tahun_ajaran + "" + x.semester,
      };
      result.push(flattenData);
    });
    setIsLoading(false);
    setState(result);
  };

  const editSertifikasi = async () => {
    setIsLoading(true);
    const response = await putSertifikasi(editState);

    if (response.errorMessage === null) {
      history.push(`/app/Sertifikasi`);
    }
    getDataSertifikasi();
    setEditState({
      id: "",
      id_program_studi: "",
      tahun_ajaran: "",
      semester: "",
      nama_dosen: "",
      pelatihan: "",
      id_dosen_1: null,
      id_dosen_2: null,
      id_dosen_3: null,
    });
  };

  const insertSertifikasi = async () => {
    setIsLoading(true);
    console.log(tambahState);
    const response = await postSertifikasi(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/Sertifikasi`);
    }
    getDataSertifikasi();
    setIsLoading(false);
    setTambahState({
      id_program_studi: "",
      tahun_ajaran: "",
      semester: "",
      nama_dosen: "",
      pelatihan: "",
      id_dosen_1: null,
      id_dosen_2: null,
      id_dosen_3: null,
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
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "tahun_ajaran",
      label: "Tahun Ajaran",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "semester",
      label: "Semester",
      options: {
        filter: true,
        sort: false,
        display: false,
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
      name: "tahun_ajaran_semester",
      label: "Semester",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nama_dosen",
      label: "Nama Dosen",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "pelatihan",
      label: "Pelatihan",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "penyelenggara",
      label: "Penyelenggara",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id_dosen",
      label: "id_dosen",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "dosen",
      label: "dosen",
      options: {
        filter: true,
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
                    handleEdit={() => {
                      editSertifikasi();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      console.log(rowData);
                      setEditState({
                        id: rowData[0],
                        id_program_studi: rowData[2],
                        tahun_ajaran: rowData[3],
                        semester: rowData[4],
                        nama_dosen: rowData[7],
                        pelatihan: rowData[8],
                        penyelenggara: rowData[9],
                        id_dosen: rowData[10],
                        dosen: rowData[11],
                      });
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <InputLabel shrink>Pelatihan</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.pelatihan}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <InputLabel shrink>Program Studi</InputLabel>
                        <Select
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
                      <Grid item xs={6}>
                        <InputLabel shrink>Penyelenggara</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.penyelenggara}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <InputLabel shrink>Tahun Ajaran</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.tahun_ajaran}
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel shrink>Semester</InputLabel>
                        <Select
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.semester}
                          inputProps={{ readOnly: true }}
                        >
                          <MenuItem value={1}>Ganjil</MenuItem>
                          <MenuItem value={2}>Genap</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                    <Typography
                      style={{ marginTop: 20, marginBottom: 20 }}
                      variant="h6"
                    >
                      Data Dosen
                    </Typography>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <InputLabel shrink>NIDN</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.dosen?.nidn}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <InputLabel shrink>Nama</InputLabel>
                        <TextField
                          style={{ marginRight: "6px", marginBottom: "15px" }}
                          fullWidth
                          value={editState.dosen?.nama}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </CustomModalDetail>
                </IconButton>
                {/* BUTTON EDIT */}
                <IconButton size="small">
                  <CustomModalEdit
                    handleEdit={() => {
                      editSertifikasi();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      console.log(rowData);
                      setEditState({
                        id: rowData[0],
                        id_program_studi: rowData[2],
                        tahun_ajaran: rowData[3],
                        semester: rowData[4],
                        nama_dosen: rowData[7],
                        pelatihan: rowData[8],
                        penyelenggara: rowData[9],
                        id_dosen: rowData[10],
                        dosen: rowData[11],
                      });
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <InputLabel shrink>pelatihan</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.pelatihan}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              pelatihan: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <InputLabel shrink>Program Studi</InputLabel>
                        <Select
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
                      <Grid item xs={6}>
                        <InputLabel shrink>Penyelenggara</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.penyelenggara}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              penyelenggara: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <InputLabel shrink>Tahun Ajaran</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.tahun_ajaran}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              tahun_ajaran: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel shrink>Semester</InputLabel>
                        <Select
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.semester}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              semester: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        >
                          <MenuItem value={1}>Ganjil</MenuItem>
                          <MenuItem value={2}>Genap</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <InputLabel>Dosen</InputLabel>
                        <Autocomplete
                          style={{ marginBottom: "15px" }}
                          value={editState.dosen}
                          onChange={(event, newValue) => {
                            console.log("newValue");
                            console.log(newValue);
                            setEditState((c) => ({
                              ...c,
                              nama_dosen: newValue?.nama
                                ? newValue.nama
                                : editState.nama_dosen,
                              dosen: newValue,
                              id_dosen: newValue?.id ? newValue.id : null,
                            }));
                          }}
                          inputValue={editState.nama_dosen}
                          onInputChange={(event, newInputValue, reason) => {
                            console.log("newInputValue");
                            console.log(newInputValue);
                            console.log(reason);
                            if (reason == "input") {
                              setEditState((c) => ({
                                ...c,
                                nama_dosen: newInputValue,
                              }));
                            } else {
                              setEditState((c) => ({
                                ...c,
                                nama_dosen: "",
                              }));
                            }
                          }}
                          options={dataDosen}
                          getOptionLabel={(option) => option.nama}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                          freeSolo
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </CustomModalEdit>
                </IconButton>
                {/* BUTTON DELETE */}
                <IconButton size="small">
                  {/* CUSTOM MODAL DELETE */}
                  <CustomModalDelete
                    handleDelete={async () => {
                      setIsLoading(true);
                      await deleteSertifikasi(tableMeta.rowData[0]);
                      getDataSertifikasi();
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
        title="Sertifikasi"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertSertifikasi();
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <InputLabel shrink>Pelatihan</InputLabel>
                <TextField
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.pelatihan}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      pelatihan: e.target.value,
                    }));
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <InputLabel shrink>Program Studi</InputLabel>
                <Select
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
              <Grid item xs={6}>
                <InputLabel shrink>Penyelenggara</InputLabel>
                <TextField
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.penyelenggara}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      penyelenggara: e.target.value,
                    }));
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <InputLabel shrink>Tahun Ajaran</InputLabel>
                <TextField
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.tahun_ajaran}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      tahun_ajaran: e.target.value,
                    }));
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel shrink>Semester</InputLabel>
                <Select
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.semester}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      semester: e.target.value,
                    }));
                  }}
                  variant="outlined"
                >
                  <MenuItem value={1}>Ganjil</MenuItem>
                  <MenuItem value={2}>Genap</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <InputLabel shrink>Dosen</InputLabel>
                <Autocomplete
                  style={{ marginBottom: "15px" }}
                  value={tambahState.dosen}
                  onChange={(event, newValue) => {
                    setTambahState((c) => ({
                      ...c,
                      id_dosen: newValue?.id ? newValue.id : null,
                    }));
                  }}
                  inputValue={tambahState.nama_dosen}
                  onInputChange={(event, newInputValue, reason) => {
                    setTambahState((c) => ({
                      ...c,
                      nama_dosen: newInputValue,
                    }));
                  }}
                  options={dataDosen}
                  getOptionLabel={(option) => option.nama}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                  freeSolo
                  fullWidth
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
