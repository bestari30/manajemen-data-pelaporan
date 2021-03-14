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
import { getKategori } from "../../functions/Kategori";
import { getTingkat } from "../../functions/Tingkat";
import {
  getPrestasiMahasiswa,
  putPrestasiMahasiswa,
  deletePrestasiMahasiswa,
  postPrestasiMahasiswa,
} from "../../functions/PrestasiMahasiswa";
import { getMahasiswa } from "../../functions/Mahasiswa";

export default function PrestasiMahasiswa() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataProgramStudi, setDataProgramStudi] = useState([]);
  const [dataMahasiswa, setDataMahasiswa] = useState([]);
  const [dataKategori, setDataKategori] = useState([]);
  const [dataTingkat, setDataTingkat] = useState([]);
  const [editState, setEditState] = useState({
    id: "",
    id_program_studi: "",
    tahun_ajaran: "",
    semester: "",
    id_kategori: "",
    id_tingkat: "",
    nama_kegiatan: "",
    id_mahasiswa_1: "",
    id_mahasiswa_2: "",
    id_mahasiswa_3: "",
  });
  const [tambahState, setTambahState] = useState({
    id_program_studi: "",
    tahun_ajaran: "",
    semester: "",
    id_kategori: "",
    id_tingkat: "",
    nama_kegiatan: "",
    id_mahasiswa_1: null,
    id_mahasiswa_2: null,
    id_mahasiswa_3: null,
  });

  useEffect(() => {
    async function getData() {
      const dataMahasiswa = await getMahasiswa();
      const dataProgramStudi = await getProgramStudi();
      const dataKategori = await getKategori();
      const dataTingkat = await getTingkat();
      setDataMahasiswa(dataMahasiswa.data);
      setDataProgramStudi(dataProgramStudi.data);
      setDataKategori(dataKategori.data);
      setDataTingkat(dataTingkat.data);
      getDataPrestasiMahasiswa();
    }
    getData();
  }, []);

  const getDataPrestasiMahasiswa = async () => {
    setIsLoading(true);
    const data = await getPrestasiMahasiswa();
    let result = [];

    data.data.map((x, i) => {
      let jumlah_mahasiswa = 0;
      if (x.mahasiswa_1 !== null) jumlah_mahasiswa++;
      if (x.mahasiswa_2 !== null) jumlah_mahasiswa++;
      if (x.mahasiswa_3 !== null) jumlah_mahasiswa++;

      const flattenData = {
        no: i + 1,
        id: x.id,
        id_program_studi: x.program_studi.id,
        nama_program_studi: x.program_studi.nama,
        id_kategori: x.kategori.id,
        nama_kategori: x.kategori.nama,
        id_tingkat: x.tingkat.id,
        nama_tingkat: x.tingkat.nama,
        tahun_ajaran: x.tahun_ajaran,
        semester: x.semester,
        hibah_dikti: x.hibah_dikti,
        nama_kegiatan: x.nama_kegiatan,
        id_mahasiswa_1: x.mahasiswa_1?.id,
        id_mahasiswa_2: x.mahasiswa_2?.id,
        id_mahasiswa_3: x.mahasiswa_2?.id,
        nama_mahasiswa_1: x.mahasiswa_1?.nama,
        nama_mahasiswa_2: x.mahasiswa_2?.nama,
        nama_mahasiswa_3: x.mahasiswa_3?.nama,
        nim_mahasiswa_1: x.mahasiswa_1?.nim,
        nim_mahasiswa_2: x.mahasiswa_2?.nim,
        nim_mahasiswa_3: x.mahasiswa_3?.nim,
        mahasiswa_1: x.mahasiswa_1,
        mahasiswa_2: x.mahasiswa_2,
        mahasiswa_3: x.mahasiswa_3,
        jumlah_mahasiswa: jumlah_mahasiswa,
        tahun_ajaran_semester: x.tahun_ajaran + "" + x.semester,
      };
      result.push(flattenData);
    });
    setIsLoading(false);
    setState(result);
  };

  const editPrestasiMahasiswa = async () => {
    setIsLoading(true);
    const response = await putPrestasiMahasiswa(editState);

    if (response.errorMessage === null) {
      history.push(`/app/PrestasiMahasiswa`);
    }
    getDataPrestasiMahasiswa();
    setEditState({
      id: "",
      id_program_studi: "",
      tahun_ajaran: "",
      semester: "",
      hibah_dikti: "",
      nama_kegiatan: "",
      id_mahasiswa_1: null,
      id_mahasiswa_2: null,
      id_mahasiswa_3: null,
    });
  };

  const insertPrestasiMahasiswa = async () => {
    setIsLoading(true);
    console.log(tambahState);
    const response = await postPrestasiMahasiswa(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/PrestasiMahasiswa`);
    }
    getDataPrestasiMahasiswa();
    setIsLoading(false);
    setTambahState({
      id_program_studi: "",
      tahun_ajaran: "",
      semester: "",
      hibah_dikti: "",
      nama_kegiatan: "",
      id_mahasiswa_1: null,
      id_mahasiswa_2: null,
      id_mahasiswa_3: null,
    });
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
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
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "tahun_ajaran",
      label: "Tahun Ajaran",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "semester",
      label: "Semester",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
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
      name: "id_kategori",
      label: "id_kategori",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "nama_kategori",
      label: "Kategori",
      options: {
        filter: true,
        sort: true,
        display: true,
      },
    },
    {
      name: "id_tingkat",
      label: "id_tingkat",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "nama_tingkat",
      label: "Tingkat",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "nama_kegiatan",
      label: "Nama Kegiatan",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "jumlah_mahasiswa",
      label: "Jumlah Mahasiswa",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id_mahasiswa_1",
      label: "mahasiswa",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "id_mahasiswa_2",
      label: "mahasiswa",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "id_mahasiswa_3",
      label: "mahasiswa",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "mahasiswa_1",
      label: "mahasiswa_1",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "mahasiswa_2",
      label: "mahasiswa_2",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "mahasiswa_3",
      label: "mahasiswa_3",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "nama_mahasiswa_1",
      label: "nama_mahasiswa_1",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "nama_mahasiswa_2",
      label: "nama_mahasiswa_2",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "nama_mahasiswa_3",
      label: "nama_mahasiswa_3",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        display: false,
      },
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        empty: true,
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
                      editPrestasiMahasiswa();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      console.log(rowData);
                      setEditState({
                        id: rowData[0],
                        id_program_studi: rowData[2],
                        tahun_ajaran: rowData[3],
                        semester: rowData[4],
                        id_kategori: rowData[7],
                        id_tingkat: rowData[9],
                        nama_kegiatan: rowData[11],
                        id_mahasiswa_1: rowData[13],
                        id_mahasiswa_2: rowData[14],
                        id_mahasiswa_3: rowData[15],
                        mahasiswa_1: rowData[16],
                        mahasiswa_2: rowData[17],
                        mahasiswa_3: rowData[18],
                        nama_mahasiswa_1: rowData[19],
                        nama_mahasiswa_2: rowData[20],
                        nama_mahasiswa_3: rowData[21],
                      });
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <InputLabel shrink>Nama Kegiatan</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.nama_kegiatan}
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
                        <InputLabel shrink>Kategori</InputLabel>
                        <Select
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_kategori}
                          inputProps={{ readOnly: true }}
                        >
                          {dataKategori.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <InputLabel shrink>Tingkat</InputLabel>
                        <Select
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_tingkat}
                          inputProps={{ readOnly: true }}
                        >
                          {dataTingkat.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={3}>
                        <InputLabel shrink>Tahun Ajaran</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.tahun_ajaran}
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={3}>
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
                      Data mahasiswa
                    </Typography>
                    <Grid container spacing={4}>
                      <Grid item xs={1}>
                        <Typography style={{ marginTop: 5, marginBottom: 5 }}>
                          1
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <InputLabel shrink>NIM</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.mahasiswa_1?.nim}
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
                          value={editState.mahasiswa_1?.nama}
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
                        <InputLabel shrink>NIM</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.mahasiswa_2?.nim}
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
                          value={editState.mahasiswa_2?.nama}
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
                        <InputLabel shrink>NIM</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.mahasiswa_3?.nim}
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
                          value={editState.mahasiswa_3?.nama}
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
                      editPrestasiMahasiswa();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      console.log(rowData);
                      setEditState({
                        id: rowData[0],
                        id_program_studi: rowData[2],
                        tahun_ajaran: rowData[3],
                        semester: rowData[4],
                        id_kategori: rowData[7],
                        id_tingkat: rowData[9],
                        nama_kegiatan: rowData[11],
                        id_mahasiswa_1: rowData[13],
                        id_mahasiswa_2: rowData[14],
                        id_mahasiswa_3: rowData[15],
                        mahasiswa_1: rowData[16],
                        mahasiswa_2: rowData[17],
                        mahasiswa_3: rowData[18],
                        nama_mahasiswa_1: rowData[19],
                        nama_mahasiswa_2: rowData[20],
                        nama_mahasiswa_3: rowData[21],
                      });
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <InputLabel shrink>Nama Kegiatan</InputLabel>
                        <TextField
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.nama_kegiatan}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              nama_kegiatan: e.target.value,
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
                        <InputLabel shrink>Kategori</InputLabel>
                        <Select
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_kategori}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              id_kategori: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        >
                          {dataKategori.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <InputLabel shrink>Tingkat</InputLabel>
                        <Select
                          style={{ marginRight: "6px" }}
                          fullWidth
                          value={editState.id_tingkat}
                          onChange={(e) => {
                            setEditState((c) => ({
                              ...c,
                              id_tingkat: e.target.value,
                            }));
                          }}
                          variant="outlined"
                        >
                          {dataTingkat.map((x) => (
                            <MenuItem value={x.id}>{x.nama}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={3}>
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
                      <Grid item xs={3}>
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
                        <InputLabel>Mahasiswa 1</InputLabel>
                        <Autocomplete
                          value={editState.mahasiswa_1}
                          onChange={(event, newValue) => {
                            console.log("newValue");
                            console.log(newValue);
                            setEditState((c) => ({
                              ...c,
                              nama_mahasiswa_1: newValue?.nama
                                ? newValue.nama
                                : editState.nama_mahasiswa_1,
                              mahasiswa_1: newValue,
                              id_mahasiswa_1: newValue?.id ? newValue.id : null,
                            }));
                          }}
                          inputValue={editState.nama_mahasiswa_1}
                          onInputChange={(event, newInputValue, reason) => {
                            console.log("newInputValue");
                            console.log(newInputValue);
                            console.log(reason);
                            if (reason == "input") {
                              setEditState((c) => ({
                                ...c,
                                nama_mahasiswa_1: newInputValue,
                              }));
                            } else {
                              setEditState((c) => ({
                                ...c,
                                nama_mahasiswa_1: "",
                              }));
                            }
                          }}
                          options={dataMahasiswa}
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
                        <InputLabel>Mahasiswa 2</InputLabel>
                        <Autocomplete
                          value={editState.mahasiswa_2}
                          onChange={(event, newValue) => {
                            console.log("newValue");
                            console.log(newValue);
                            setEditState((c) => ({
                              ...c,
                              nama_mahasiswa_2: newValue?.nama
                                ? newValue.nama
                                : editState.nama_mahasiswa_2,
                              mahasiswa_2: newValue,
                              id_mahasiswa_2: newValue?.id ? newValue.id : null,
                            }));
                          }}
                          inputValue={editState.nama_mahasiswa_2}
                          onInputChange={(event, newInputValue, reason) => {
                            console.log("newInputValue");
                            console.log(newInputValue);
                            console.log(reason);

                            if (reason == "input") {
                              setEditState((c) => ({
                                ...c,
                                nama_mahasiswa_2: newInputValue,
                              }));
                            } else {
                              setEditState((c) => ({
                                ...c,
                                nama_mahasiswa_2: "",
                              }));
                            }
                          }}
                          options={dataMahasiswa}
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
                        <InputLabel>Mahasiswa 3</InputLabel>
                        <Autocomplete
                          style={{ marginBottom: "15px" }}
                          value={editState.mahasiswa_3}
                          onChange={(event, newValue) => {
                            console.log("newValue");
                            console.log(newValue);
                            setEditState((c) => ({
                              ...c,
                              nama_mahasiswa_3: newValue?.nama
                                ? newValue.nama
                                : editState.nama_mahasiswa_3,
                              mahasiswa_3: newValue,
                              id_mahasiswa_3: newValue?.id ? newValue.id : null,
                            }));
                          }}
                          inputValue={editState.nama_mahasiswa_3}
                          onInputChange={(event, newInputValue, reason) => {
                            console.log("newInputValue");
                            console.log(newInputValue);
                            console.log(reason);

                            if (reason == "input") {
                              setEditState((c) => ({
                                ...c,
                                nama_mahasiswa_3: newInputValue,
                              }));
                            } else {
                              setEditState((c) => ({
                                ...c,
                                nama_mahasiswa_3: "",
                              }));
                            }
                          }}
                          options={dataMahasiswa}
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
                      await deletePrestasiMahasiswa(tableMeta.rowData[0]);
                      getDataPrestasiMahasiswa();
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
        title="Prestasi Mahasiswa"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertPrestasiMahasiswa();
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <InputLabel shrink>Nama Kegiatan</InputLabel>
                <TextField
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.nama_kegiatan}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      nama_kegiatan: e.target.value,
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
                <InputLabel shrink>Kategori</InputLabel>
                <Select
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.id_kategori}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      id_kategori: e.target.value,
                    }));
                  }}
                  variant="outlined"
                >
                  {dataKategori.map((x) => (
                    <MenuItem value={x.id}>{x.nama}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <InputLabel shrink>Tingkat</InputLabel>
                <Select
                  style={{ marginRight: "6px" }}
                  fullWidth
                  value={tambahState.id_tingkat}
                  onChange={(e) => {
                    setTambahState((c) => ({
                      ...c,
                      id_tingkat: e.target.value,
                    }));
                  }}
                  variant="outlined"
                >
                  {dataTingkat.map((x) => (
                    <MenuItem value={x.id}>{x.nama}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
                <InputLabel>Mahasiswa 1</InputLabel>
                <Autocomplete
                  value={tambahState.mahasiswa_1}
                  onChange={(event, newValue) => {
                    setTambahState((c) => ({
                      ...c,
                      id_mahasiswa_1: newValue?.id ? newValue.id : null,
                    }));
                  }}
                  inputValue={tambahState.nama_mahasiswa_1}
                  onInputChange={(event, newInputValue, reason) => {
                    setTambahState((c) => ({
                      ...c,
                      nama_mahasiswa_1: newInputValue,
                    }));
                  }}
                  options={dataMahasiswa}
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
                <InputLabel>Mahasiswa 2</InputLabel>
                <Autocomplete
                  value={tambahState.mahasiswa_2}
                  onChange={(event, newValue) => {
                    setTambahState((c) => ({
                      ...c,
                      id_mahasiswa_2: newValue?.id ? newValue.id : null,
                    }));
                  }}
                  inputValue={tambahState.nama_mahasiswa_2}
                  onInputChange={(event, newInputValue, reason) => {
                    setTambahState((c) => ({
                      ...c,
                      nama_mahasiswa_2: newInputValue,
                    }));
                  }}
                  options={dataMahasiswa}
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
                <InputLabel>Mahasiswa 3</InputLabel>
                <Autocomplete
                  style={{ marginBottom: "15px" }}
                  value={tambahState.mahasiswa_3}
                  onChange={(event, newValue) => {
                    setTambahState((c) => ({
                      ...c,
                      id_mahasiswa_3: newValue?.id ? newValue.id : null,
                    }));
                  }}
                  inputValue={tambahState.nama_mahasiswa_3}
                  onInputChange={(event, newInputValue, reason) => {
                    setTambahState((c) => ({
                      ...c,
                      nama_mahasiswa_3: newInputValue,
                    }));
                  }}
                  options={dataMahasiswa}
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
