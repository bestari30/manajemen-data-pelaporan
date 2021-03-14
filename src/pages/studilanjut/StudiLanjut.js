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
  getStudiLanjut,
  putStudiLanjut,
  deleteStudiLanjut,
  postStudiLanjut,
} from "../../functions/StudiLanjut";
import { getDosen } from "../../functions/Dosen";

export default function StudiLanjut() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataProgramStudi, setDataProgramStudi] = useState([]);
  const [dataDosen, setDataDosen] = useState([]);
  const [editState, setEditState] = useState({
    id: "",
    id_program_studi: "",
    tahun_ajaran: "",
    program_studi: "",
    nama_dosen: "",
    universitas: "",
  });
  const [tambahState, setTambahState] = useState({
    id_program_studi: "",
    tahun_ajaran: "",
    program_studi: "",
    nama_dosen: "",
    universitas: "",
  });

  useEffect(() => {
    async function getData() {
      const dataDosen = await getDosen();
      const dataProgramStudi = await getProgramStudi();
      setDataDosen(dataDosen.data);
      setDataProgramStudi(dataProgramStudi.data);
      getDataStudiLanjut();
    }
    getData();
  }, []);

  const getDataStudiLanjut = async () => {
    setIsLoading(true);
    const data = await getStudiLanjut();
    let result = [];

    data.data.map((x, i) => {
      const flattenData = {
        no: i + 1,
        id: x.id,
        id_program_studi: x.program_studi.id,
        nama_program_studi: x.program_studi.nama,
        tahun_ajaran: x.tahun_ajaran,
        program_studi: x.program_studi,
        program_studi_lanjut: x.program_studi_lanjut,
        nama_dosen: x.dosen?.nama,
        universitas: x.universitas,
        id_dosen: x.dosen?.id,
        nama_dosen: x.dosen?.nama,
        nidn_dosen: x.dosen?.nidn,
        dosen: x.dosen,
        status: x.status,
      };
      result.push(flattenData);
    });
    setIsLoading(false);
    setState(result);
  };

  const editStudiLanjut = async () => {
    setIsLoading(true);
    const response = await putStudiLanjut(editState);

    if (response.errorMessage === null) {
      history.push(`/app/StudiLanjut`);
    }
    getDataStudiLanjut();
    setEditState({
      id: "",
      id_program_studi: "",
      tahun_ajaran: "",
      program_studi: "",
      nama_dosen: "",
      universitas: "",
    });
  };

  const insertStudiLanjut = async () => {
    setIsLoading(true);
    console.log(tambahState);
    const response = await postStudiLanjut(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/StudiLanjut`);
    }
    getDataStudiLanjut();
    setIsLoading(false);
    setTambahState({
      id_program_studi: "",
      tahun_ajaran: "",
      program_studi: "",
      nama_dosen: "",
      universitas: "",
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
      name: "nama_program_studi",
      label: "Program Studi",
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
      name: "program_studi_lanjut",
      label: "Program Studi Lanjut",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "universitas",
      label: "universitas",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "tahun_ajaran",
      label: "Tahun Studi",
      options: {
        filter: true,
        sort: true,
        display: true,
      },
    },
    {
      name: "status",
      label: "status",
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
                      editStudiLanjut();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      console.log(rowData);
                      setEditState({
                        id: rowData[0],
                        id_program_studi: rowData[2],
                        nama_dosen: rowData[4],
                        program_studi_lanjut: rowData[5],
                        universitas: rowData[6],
                        tahun_ajaran: rowData[7],
                        status: rowData[8],
                        id_dosen: rowData[9],
                        dosen: rowData[10],
                      });
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={3}>
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
                      <Grid item xs={3}>
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
                      <Grid item xs={6}>
                        <InputLabel shrink>Nama</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.dosen?.nama}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <InputLabel shrink>Program Studi Lanjut</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.program_studi_lanjut}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel shrink>Universitas</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.universitas}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <InputLabel shrink>Tahun Studi</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.tahun_ajaran}
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel shrink>Status</InputLabel>
                        <TextField
                          style={{ marginBottom: "15px" }}
                          fullWidth
                          value={editState.status}
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
                      editStudiLanjut();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      console.log(rowData);
                      setEditState({
                        id: rowData[0],
                        id_program_studi: rowData[2],
                        nama_dosen: rowData[4],
                        program_studi_lanjut: rowData[5],
                        universitas: rowData[6],
                        tahun_ajaran: rowData[7],
                        status: rowData[8],
                        id_dosen: rowData[9],
                        dosen: rowData[10],
                      });
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <InputLabel shrink>Dosen</InputLabel>
                        <Autocomplete
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
                            <TextField {...params} variant="outlined" />
                          )}
                          freeSolo
                          fullWidth
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
                        <InputLabel shrink>Program Studi Lanjut</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.program_studi_lanjut}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              program_studi_lanjut: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <InputLabel shrink>Universitas</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.universitas}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              universitas: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel shrink>Tahun Studi</InputLabel>
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
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <InputLabel shrink>Status</InputLabel>
                        <Select
                          style={{ marginBottom: "15px" }}
                          fullWidth
                          value={editState.status}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              status: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        >
                          <MenuItem value="Berjalan">Berjalan</MenuItem>
                          <MenuItem value="Selesai">Selesai</MenuItem>
                        </Select>
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
                      await deleteStudiLanjut(tableMeta.rowData[0]);
                      getDataStudiLanjut();
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
        title="Studi Lanjut"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertStudiLanjut();
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <InputLabel shrink>Dosen</InputLabel>
                <Autocomplete
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
                    <TextField {...params} variant="outlined" />
                  )}
                  freeSolo
                  fullWidth
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
                <InputLabel shrink>Program Studi Lanjut</InputLabel>
                <TextField
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.program_studi_lanjut}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      program_studi_lanjut: e.target.value,
                    }));
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <InputLabel shrink>Universitas</InputLabel>
                <TextField
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.universitas}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      universitas: e.target.value,
                    }));
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel shrink>Tahun Studi</InputLabel>
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
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <InputLabel shrink>Status</InputLabel>
                <Select
                  style={{ marginBottom: "15px" }}
                  fullWidth
                  value={tambahState.status}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      status: e.target.value,
                    }));
                  }}
                  variant="outlined"
                >
                  <MenuItem value="Berjalan">Berjalan</MenuItem>
                  <MenuItem value="Selesai">Selesai</MenuItem>
                </Select>
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
