import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
import EditPublikasi from "./EditPublikasi";
import { ActionLessColumn } from "./ColumnPublikasi";
import { DetailPublikasi } from "./DetailPublikasi";
import { ButtonGroup, Box } from "@material-ui/core";
import { Table } from "../../components/Table/Table";

export const PublikasiTableContainer = ({
  setDetailState,
  detailState,
  setIsLoading,
  deletePublikasi,
  getDataPublikasi,
  data,
  editPublikasi,
  setEditState,
  editState,
}) => {
  const columns = [
    ...ActionLessColumn,
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        download: false,
        print: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
              >
                <Box borderRight={"1px solid black"} mr={1}>
                  <DetailPublikasi
                    setDetailState={setDetailState}
                    detailState={detailState}
                    tableMeta={tableMeta}
                  />
                </Box>
                <Box borderRight={"1px solid black"}>
                  <EditPublikasi
                    editPublikasi={editPublikasi}
                    tableMeta={tableMeta}
                    setEditState={setEditState}
                    editState={editState}
                  />
                </Box>
                {/* CUSTOM MODAL DELETE */}
                <CustomModalDelete
                  handleDelete={async () => {
                    setIsLoading(true);
                    await deletePublikasi(tableMeta.rowData[0]);
                    getDataPublikasi();
                    setIsLoading(false);
                  }}
                />
              </ButtonGroup>
            </>
          );
        },
      },
    },
  ];

  return <Table data={data} columns={columns} />;
};
