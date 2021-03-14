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
  getPengabdianMasyarakat,
  putPengabdianMasyarakat,
  deletePengabdianMasyarakat,
  postPengabdianMasyarakat,
} from "../../functions/PengabdianMasyarakat";
import { getDosen } from "../../functions/Dosen";

export default function PengabdianMasyarakat() {
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
    hibah_dikti: "",
    judul: "",
    id_dosen_1: "",
    id_dosen_2: "",
    id_dosen_3: "",
  });
  const [tambahState, setTambahState] = useState({
    id_program_studi: "",
    tahun_ajaran: "",
    semester: "",
    hibah_dikti: "",
    judul: "",
    id_dosen_1: null,
    id_dosen_2: null,
    id_dosen_3: null,
  });

  useEffect(() => {
    async function getData() {
      const dataDosen = await getDosen();
      const dataProgramStudi = await getProgramStudi();
      setDataDosen(dataDosen.data);
      setDataProgramStudi(dataProgramStudi.data);
      getDataPengabdianMasyarakat();
    }
    getData();
  }, []);

  const getDataPengabdianMasyarakat = async () => {
    setIsLoading(true);
    const data = await getPengabdianMasyarakat();
    let result = [];

    data.data.map((x, i) => {
      let jumlah_penulis = 0;
      if (x.dosen_1 !== null) jumlah_penulis++;
      if (x.dosen_2 !== null) jumlah_penulis++;
      if (x.dosen_3 !== null) jumlah_penulis++;

      const flattenData = {
        no: i + 1,
        id: x.id,
        id_program_studi: x.program_studi.id,
        nama_program_studi: x.program_studi.nama,
        tahun_ajaran: x.tahun_ajaran,
        semester: x.semester,
        hibah_dikti: x.hibah_dikti,
        judul: x.judul,
        id_dosen_1: x.dosen_1?.id,
        id_dosen_2: x.dosen_2?.id,
        id_dosen_3: x.dosen_2?.id,
        nama_dosen_1: x.dosen_1?.nama,
        nama_dosen_2: x.dosen_2?.nama,
        nama_dosen_3: x.dosen_3?.nama,
        nidn_dosen_1: x.dosen_1?.nidn,
        nidn_dosen_2: x.dosen_2?.nidn,
        nidn_dosen_3: x.dosen_3?.nidn,
        dosen_1: x.dosen_1,
        dosen_2: x.dosen_2,
        dosen_3: x.dosen_3,
        jumlah_penulis: jumlah_penulis,
        tahun_ajaran_semester: x.tahun_ajaran + "" + x.semester,
      };
      result.push(flattenData);
    });
    setIsLoading(false);
    setState(result);
  };

  const editPengabdianMasyarakat = async () => {
    setIsLoading(true);
    const response = await putPengabdianMasyarakat(editState);

    if (response.errorMessage === null) {
      history.push(`/app/pengabdianMasyarakat`);
    }
    getDataPengabdianMasyarakat();
    setEditState({
      id: "",
      id_program_studi: "",
      tahun_ajaran: "",
      semester: "",
      hibah_dikti: "",
      judul: "",
      id_dosen_1: null,
      id_dosen_2: null,
      id_dosen_3: null,
    });
  };

  const insertPengabdianMasyarakat = async () => {
    setIsLoading(true);
    console.log(tambahState);
    const response = await postPengabdianMasyarakat(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/pengabdianMasyarakat`);
    }
    getDataPengabdianMasyarakat();
    setIsLoading(false);
    setTambahState({
      id_program_studi: "",
      tahun_ajaran: "",
      semester: "",
      hibah_dikti: "",
      judul: "",
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
      name: "hibah_dikti",
      label: "Hibah Dikti",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "judul",
      label: "Judul",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "jumlah_penulis",
      label: "Penulis",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id_dosen_1",
      label: "Penulis",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "id_dosen_2",
      label: "Penulis",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "id_dosen_3",
      label: "Penulis",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "dosen_1",
      label: "dosen_1",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "dosen_2",
      label: "dosen_2",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "dosen_3",
      label: "dosen_3",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "nama_dosen_1",
      label: "nama_dosen_1",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "nama_dosen_2",
      label: "nama_dosen_2",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "nama_dosen_3",
      label: "nama_dosen_3",
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
                      editPengabdianMasyarakat();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      console.log(rowData);
                      setEditState({
                        id: rowData[0],
                        id_program_studi: rowData[2],
                        tahun_ajaran: rowData[3],
                        semester: rowData[4],
                        hibah_dikti: rowData[7],
                        judul: rowData[8],
                        id_dosen_1: rowData[10],
                        id_dosen_2: rowData[11],
                        id_dosen_3: rowData[12],
                        dosen_1: rowData[13],
                        dosen_2: rowData[14],
                        dosen_3: rowData[15],
                        nama_dosen_1: rowData[16],
                        nama_dosen_2: rowData[17],
                        nama_dosen_3: rowData[18],
                      });
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <InputLabel shrink>Judul</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.judul}
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
                        <InputLabel shrink>Hibah Dikti</InputLabel>
                        <Select
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.hibah_dikti}
                          inputProps={{ readOnly: true }}
                        >
                          <MenuItem value={"Ya"}>Ya</MenuItem>
                          <MenuItem value={"Tidak"}>Tidak</MenuItem>
                        </Select>
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
                      Data Penulis
                    </Typography>
                    <Grid container spacing={4}>
                      <Grid item xs={1}>
                        <Typography style={{ marginTop: 5, marginBottom: 5 }}>
                          1
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <InputLabel shrink>NIDN</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.dosen_1?.nidn}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <InputLabel shrink>Nama</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.dosen_1?.nama}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={1}>
                        <Typography style={{ marginTop: 5, marginBottom: 5 }}>
                          2
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <InputLabel shrink>NIDN</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.dosen_2?.nidn}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <InputLabel shrink>Nama</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.dosen_2?.nama}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={1}>
                        <Typography style={{ marginTop: 5, marginBottom: 5 }}>
                          3
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <InputLabel shrink>NIDN</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.dosen_3?.nidn}
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
                          value={editState.dosen_3?.nama}
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
                      editPengabdianMasyarakat();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      console.log(rowData);
                      setEditState({
                        id: rowData[0],
                        id_program_studi: rowData[2],
                        tahun_ajaran: rowData[3],
                        semester: rowData[4],
                        hibah_dikti: rowData[7],
                        judul: rowData[8],
                        id_dosen_1: rowData[10],
                        id_dosen_2: rowData[11],
                        id_dosen_3: rowData[12],
                        dosen_1: rowData[13],
                        dosen_2: rowData[14],
                        dosen_3: rowData[15],
                        nama_dosen_1: rowData[16],
                        nama_dosen_2: rowData[17],
                        nama_dosen_3: rowData[18],
                      });
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <InputLabel shrink>Judul</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.judul}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              judul: e.target.value,
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
                        <InputLabel shrink>Hibah Dikti</InputLabel>
                        <Select
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.hibah_dikti}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              hibah_dikti: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        >
                          <MenuItem value={"Ya"}>Ya</MenuItem>
                          <MenuItem value={"Tidak"}>Tidak</MenuItem>
                        </Select>
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
                        <InputLabel>Penulis 1</InputLabel>
                        <Autocomplete
                          value={editState.dosen_1}
                          onChange={(event, newValue) => {
                            console.log("newValue");
                            console.log(newValue);
                            setEditState((c) => ({
                              ...c,
                              nama_dosen_1: newValue?.nama
                                ? newValue.nama
                                : editState.nama_dosen_1,
                              dosen_1: newValue,
                              id_dosen_1: newValue?.id ? newValue.id : null,
                            }));
                          }}
                          inputValue={editState.nama_dosen_1}
                          onInputChange={(event, newInputValue, reason) => {
                            console.log("newInputValue");
                            console.log(newInputValue);
                            console.log(reason);
                            if (reason == "input") {
                              setEditState((c) => ({
                                ...c,
                                nama_dosen_1: newInputValue,
                              }));
                            } else {
                              setEditState((c) => ({
                                ...c,
                                nama_dosen_1: "",
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
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <InputLabel>Penulis 2</InputLabel>
                        <Autocomplete
                          value={editState.dosen_2}
                          onChange={(event, newValue) => {
                            console.log("newValue");
                            console.log(newValue);
                            setEditState((c) => ({
                              ...c,
                              nama_dosen_2: newValue?.nama
                                ? newValue.nama
                                : editState.nama_dosen_2,
                              dosen_2: newValue,
                              id_dosen_2: newValue?.id ? newValue.id : null,
                            }));
                          }}
                          inputValue={editState.nama_dosen_2}
                          onInputChange={(event, newInputValue, reason) => {
                            console.log("newInputValue");
                            console.log(newInputValue);
                            console.log(reason);

                            if (reason == "input") {
                              setEditState((c) => ({
                                ...c,
                                nama_dosen_2: newInputValue,
                              }));
                            } else {
                              setEditState((c) => ({
                                ...c,
                                nama_dosen_2: "",
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
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <InputLabel>Penulis 3</InputLabel>
                        <Autocomplete
                          style={{ marginBottom: "15px" }}
                          value={editState.dosen_3}
                          onChange={(event, newValue) => {
                            console.log("newValue");
                            console.log(newValue);
                            setEditState((c) => ({
                              ...c,
                              nama_dosen_3: newValue?.nama
                                ? newValue.nama
                                : editState.nama_dosen_3,
                              dosen_3: newValue,
                              id_dosen_3: newValue?.id ? newValue.id : null,
                            }));
                          }}
                          inputValue={editState.nama_dosen_3}
                          onInputChange={(event, newInputValue, reason) => {
                            console.log("newInputValue");
                            console.log(newInputValue);
                            console.log(reason);

                            if (reason == "input") {
                              setEditState((c) => ({
                                ...c,
                                nama_dosen_3: newInputValue,
                              }));
                            } else {
                              setEditState((c) => ({
                                ...c,
                                nama_dosen_3: "",
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
                      await deletePengabdianMasyarakat(tableMeta.rowData[0]);
                      getDataPengabdianMasyarakat();
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
        title="Pengabdian Masyarakat"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertPengabdianMasyarakat();
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <InputLabel shrink>Judul</InputLabel>
                <TextField
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.judul}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      judul: e.target.value,
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
                <InputLabel shrink>Hibah Dikti</InputLabel>
                <Select
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.hibah_dikti}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      hibah_dikti: e.target.value,
                    }));
                  }}
                  variant="outlined"
                >
                  <MenuItem value={"Ya"}>Ya</MenuItem>
                  <MenuItem value={"Tidak"}>Tidak</MenuItem>
                </Select>
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
                <InputLabel>Penulis 1</InputLabel>
                <Autocomplete
                  value={tambahState.dosen_1}
                  onChange={(event, newValue) => {
                    setTambahState((c) => ({
                      ...c,
                      id_dosen_1: newValue?.id ? newValue.id : null,
                    }));
                  }}
                  inputValue={tambahState.nama_dosen_1}
                  onInputChange={(event, newInputValue, reason) => {
                    setTambahState((c) => ({
                      ...c,
                      nama_dosen_1: newInputValue,
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
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <InputLabel>Penulis 2</InputLabel>
                <Autocomplete
                  value={tambahState.dosen_2}
                  onChange={(event, newValue) => {
                    setTambahState((c) => ({
                      ...c,
                      id_dosen_2: newValue?.id ? newValue.id : null,
                    }));
                  }}
                  inputValue={tambahState.nama_dosen_2}
                  onInputChange={(event, newInputValue, reason) => {
                    setTambahState((c) => ({
                      ...c,
                      nama_dosen_2: newInputValue,
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
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <InputLabel>Penulis 3</InputLabel>
                <Autocomplete
                  style={{ marginBottom: "15px" }}
                  value={tambahState.dosen_3}
                  onChange={(event, newValue) => {
                    setTambahState((c) => ({
                      ...c,
                      id_dosen_3: newValue?.id ? newValue.id : null,
                    }));
                  }}
                  inputValue={tambahState.nama_dosen_3}
                  onInputChange={(event, newInputValue, reason) => {
                    setTambahState((c) => ({
                      ...c,
                      nama_dosen_3: newInputValue,
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
