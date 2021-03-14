import { React, useState, useEffect } from "react";
import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
import { Table } from "../../components/Table/Table";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  IconButton,
  ButtonGroup,
  CircularProgress,
  TextField,
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import {
  getDosen,
  deleteDosen,
  putDosen,
  postDosen,
} from "../../functions/Dosen";

export default function Dosen() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editState, setEditState] = useState({
    id: "",
    nama: "",
  });
  const [tambahState, setTambahState] = useState({
    nidn: "",
    nama: "",
  });

  useEffect(() => {
    async function getData() {
      const data = await getDosen();
      let result = [];

      data.data.map((x, i) => {
        x = { ...x, no: i + 1 };
        result.push(x);
      });
      setState(result);
      setIsLoading(false);
    }
    getData();
  }, []);

  const getDataDosen = async () => {
    const data = await getDosen();
    let result = [];

    data.data.map((x, i) => {
      x = { ...x, no: i + 1 };
      result.push(x);
    });

    setState(result);
  };

  const editDosen = async () => {
    setIsLoading(true);
    const response = await putDosen(editState);
    if (response.errorMessage === null) {
      history.push(`/app/dosen`);
    }
    getDataDosen();
    setIsLoading(false);
    setEditState({ nama: "", nidn: "" });
  };

  const insertDosen = async () => {
    setIsLoading(true);
    console.log(tambahState);
    const response = await postDosen(tambahState);
    console.log(tambahState);
    if (response.errorMessage === null) {
      history.push(`/app/dosen`);
    }
    getDataDosen();
    setIsLoading(false);
    setTambahState({ nama: "", nidn: "" });
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
      name: "nidn",
      label: "nidn",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nama",
      label: "Nama",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "",
      options: {
        filter: true,
        sort: true,
        print: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
              >
                <IconButton size="small">
                  {/* CUSTOM MODAL EDIT */}
                  <CustomModalEdit
                    handleEdit={() => {
                      editDosen();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      setEditState({
                        id: rowData[0],
                        nidn: rowData[2],
                        nama: rowData[3],
                      });
                    }}
                  >
                    <Typography variant="caption">NIDN</Typography>
                    <TextField
                      style={{ marginBottom: "15px" }}
                      fullWidth
                      value={editState.nidn}
                      // onChange={(e) => {
                      //   setEditState((c) => ({ ...c, nidn: e.target.value }));
                      // }}
                      // label="NIDN Dosen"
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                    />
                    <Typography variant="caption">Nama Dosen</Typography>
                    <TextField
                      style={{ marginBottom: "15px" }}
                      fullWidth
                      value={editState.nama}
                      onChange={(e) => {
                        setEditState((c) => ({ ...c, nama: e.target.value }));
                      }}
                      // label="Nama Dosen"
                      variant="outlined"
                    />
                  </CustomModalEdit>
                </IconButton>
                <IconButton size="small">
                  {/* CUSTOM MODAL DELETE */}
                  <CustomModalDelete
                    handleDelete={async () => {
                      setIsLoading(true);
                      await deleteDosen(tableMeta.rowData[0]);
                      const data = await getDosen();
                      setState(data.data);
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
        title="Data Dosen"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertDosen();
            }}
          >
            <Typography variant="caption">NIDN</Typography>
            <TextField
              style={{ marginBottom: "15px" }}
              fullWidth
              value={tambahState.nidn}
              onChange={(e) => {
                setTambahState((c) => ({ ...c, nidn: e.target.value }));
              }}
              // label="NIDN Dosen"
              variant="outlined"
            />
            <Typography variant="caption">Nama Dosen</Typography>
            <TextField
              style={{ marginBottom: "15px" }}
              fullWidth
              value={tambahState.nama}
              onChange={(e) => {
                setTambahState((c) => ({ ...c, nama: e.target.value }));
              }}
              // label="Nama Dosen"
              variant="outlined"
            />
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
