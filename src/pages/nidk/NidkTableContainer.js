import CustomModalDelete from "../../components/CustomModalDelete/CustomModalDelete";
import EditNidk from "./EditNidk";
import { ActionLessColumn } from "./ColumnNidk";
import { ButtonGroup, Box } from "@material-ui/core";
import { Table } from "../../components/Table/Table";

export const NidkTableContainer = ({
  setIsLoading,
  deleteNidk,
  getDataNidk,
  data,
  editNidk,
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
                <Box borderRight={"1px solid black"}>
                  <EditNidk
                    editNidk={editNidk}
                    tableMeta={tableMeta}
                    setEditState={setEditState}
                    editState={editState}
                  />
                </Box>
                {/* CUSTOM MODAL DELETE */}
                <CustomModalDelete
                  handleDelete={async () => {
                    setIsLoading(true);
                    await deleteNidk(tableMeta.rowData[0]);
                    getDataNidk();
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
