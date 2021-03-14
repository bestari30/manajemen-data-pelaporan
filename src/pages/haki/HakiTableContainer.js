import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
import EditHaki from "./EditHaki";
import { DetailHaki } from "./DetailHaki";
import { ActionLessColumn } from "./ColumnHaki";
import { ButtonGroup, Box } from "@material-ui/core";
import { Table } from "../../components/Table/Table";

export const HakiTableContainer = ({
  setDetailState,
  detailState,
  setIsLoading,
  deleteHaki,
  getDataHaki,
  data,
  editHaki,
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
                  <DetailHaki
                    setDetailState={setDetailState}
                    detailState={detailState}
                    tableMeta={tableMeta}
                  />
                </Box>
                <Box borderRight={"1px solid black"}>
                  <EditHaki
                    editHaki={editHaki}
                    tableMeta={tableMeta}
                    setEditState={setEditState}
                    editState={editState}
                  />
                </Box>
                {/* CUSTOM MODAL DELETE */}
                <CustomModalDelete
                  handleDelete={async () => {
                    setIsLoading(true);
                    await deleteHaki(tableMeta.rowData[0]);
                    getDataHaki();
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
