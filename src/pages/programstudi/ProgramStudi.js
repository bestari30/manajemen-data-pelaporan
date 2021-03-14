import PageTitle from "../../components/PageTitle/PageTitle";
import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
import { Table } from "../../components/Table/Table";
import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {
  getProgramStudi,
  deleteProgramStudi,
  putProgramStudi,
  postProgramStudi,
} from "../../functions/ProgramStudi";
import {
  Grid,
  ButtonGroup,
  CircularProgress,
  TextField,
  IconButton,
} from "@material-ui/core";

export default function ProgramStudi() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editState, setEditState] = useState({
    id: "",
    nama: "",
  });
  const [tambahState, setTambahState] = useState({
    nama: "",
  });

  useEffect(() => {
    async function getData() {
      const data = await getProgramStudi();
      let result = [];

      data.data.forEach((x, i) => {
        x = { ...x, no: i + 1 };
        result.push(x);
      });
      setState(result);
      setIsLoading(false);
    }
    getData();
  }, []);

  const getDataProgramStudi = async () => {
    const data = await getProgramStudi();
    let result = [];

    data.data.forEach((x, i) => {
      x = { ...x, no: i + 1 };
      result.push(x);
    });

    setState(result);
  };

  const editProgramStudi = async () => {
    setIsLoading(true);
    const response = await putProgramStudi(editState);
    if (response.errorMessage === null) {
      history.push(`/app/programstudi`);
    }
    getDataProgramStudi();
    setIsLoading(false);
    setEditState({ nama: "" });
  };

  const insertProgramStudi = async () => {
    setIsLoading(true);
    const response = await postProgramStudi(tambahState);

    if (response.errorMessage === null) {
      history.push(`/app/programstudi`);
    }
    getDataProgramStudi();
    setIsLoading(false);
    setTambahState({ nama: "" });
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
                      editProgramStudi();
                    }}
                    handleInitialData={async () => {
                      const { rowData } = tableMeta;
                      setEditState({ nama: rowData[2], id: rowData[0] });
                    }}
                  >
                    <Typography variant="caption">
                      Nama Program Studi
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={editState.nama}
                      onChange={(e) => {
                        setEditState((c) => ({ ...c, nama: e.target.value }));
                      }}
                      style={{ marginBottom: "13px" }}
                    />
                  </CustomModalEdit>
                </IconButton>
                <IconButton size="small">
                  {/* CUSTOM MODAL DELETE */}
                  <CustomModalDelete
                    handleDelete={async () => {
                      setIsLoading(true);
                      await deleteProgramStudi(tableMeta.rowData[0]);
                      const data = await getProgramStudi();
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
        title="Program Studi"
        button={
          // CUSTOM MODAL TAMBAH
          <CustomModalTambah
            handleTambah={() => {
              insertProgramStudi();
            }}
          >
            <Typography variant="caption">Nama Program Studi</Typography>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={tambahState.nama}
              onChange={(e) => {
                setTambahState((c) => ({ ...c, nama: e.target.value }));
              }}
              style={{ marginBottom: "13px" }}
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
