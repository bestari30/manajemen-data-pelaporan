import CustomModalDetail from "../../components/CustomModalDetail/CustomModalDetail";
import { Grid, TextField, Select, MenuItem } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export const DetailPublikasi = ({ setDetailState, detailState, tableMeta }) => {
  return (
    <CustomModalDetail
      handleInitialData={async () => {
        const { rowData } = tableMeta;
        setDetailState({
          id: rowData[0],
          semester: rowData[4],
          judul: rowData[5],
          nama_jurnal: rowData[8],
          edisi: rowData[9],
          volume: rowData[10],
          url: rowData[11],
          nama_program_studi: rowData[3],
          nama_tingkat: rowData[7],
          nama_dosen_1: rowData[14],
          nama_dosen_2: rowData[16],
          nama_dosen_3: rowData[18],
          jumlah_penulis: rowData[12],
          tahun_ajaran: rowData[19],
          no_semester: rowData[20],
          hibah_dikti: rowData[21],
        });
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="caption">Judul</Typography>
          <TextField
            size="small"
            style={{ marginRight: "4px" }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={detailState.judul}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={5}>
          <Typography variant="caption">Jurnal</Typography>
          <TextField
            size="small"
            style={{ marginRight: "4px" }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={detailState.nama_jurnal}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">Edisi</Typography>
          <TextField
            size="small"
            style={{ marginRight: "4px" }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={detailState.edisi}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="caption">Volume</Typography>
          <TextField
            size="small"
            style={{ marginRight: "4px" }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={detailState.volume}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={5}>
          <Typography variant="caption">Program Studi</Typography>
          <TextField
            size="small"
            style={{ marginRight: "4px" }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={detailState.nama_program_studi}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">Tahun Ajaran</Typography>
          <TextField
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={detailState.tahun_ajaran}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="caption">Semester</Typography>
          <Select
            margin="dense"
            value={detailState.no_semester}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            style={{ marginBottom: "3px" }}
          >
            <MenuItem value={1}>Ganjil</MenuItem>
            <MenuItem value={2}>Genap</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography variant="caption">Nama Penulis 1</Typography>
          <TextField
            size="small"
            style={{ marginRight: "4px" }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={detailState.nama_dosen_1}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="caption">Nama Penulis 2</Typography>
          <TextField
            size="small"
            style={{ marginRight: "4px" }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={detailState.nama_dosen_2}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="caption">Nama Penulis 3</Typography>
          <TextField
            size="small"
            style={{ marginRight: "4px" }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={detailState.nama_dosen_3}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography variant="caption">URL</Typography>
          <TextField
            size="small"
            style={{ marginBottom: "13px" }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={detailState.url}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="caption">Hibah Dikti</Typography>
          <TextField
            size="small"
            style={{ marginBottom: "13px" }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={detailState.hibah_dikti}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="caption">Tingkat</Typography>
          <TextField
            size="small"
            style={{ marginRight: "4px" }}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={detailState.nama_tingkat}
          />
        </Grid>
      </Grid>
    </CustomModalDetail>
  );
};

export default DetailPublikasi;
