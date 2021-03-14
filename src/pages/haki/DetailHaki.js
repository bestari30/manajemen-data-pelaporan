import CustomModalDetail from "../../components/CustomModalDetail/CustomModalDetail";
import { Grid, TextField, Select, MenuItem } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export const DetailHaki = ({ setDetailState, detailState, tableMeta }) => {
  return (
    <CustomModalDetail
      handleInitialData={async () => {
        const { rowData } = tableMeta;
        setDetailState({
          id: rowData[0],
          judul: rowData[2],
          no_pendaftaran: rowData[3],
          no_hki: rowData[4],
          tahun_ajaran: rowData[5],
          no_semester: rowData[6],
          nama_program_studi: rowData[9],
          nama_dosen: rowData[11],
          nidn_dosen: rowData[12],
        });
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="caption">Judul</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={detailState.judul}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">Nomor Haki</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={detailState.no_hki}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">Nomor Pendaftaran</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={detailState.no_pendaftaran}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="caption">Program Studi</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={detailState.nama_program_studi}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">Tahun Ajaran</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={detailState.tahun_ajaran}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">Semester</Typography>
          <Select
            variant="outlined"
            margin="dense"
            value={detailState.no_semester}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          >
            <MenuItem value={1}>Ganjil</MenuItem>
            <MenuItem value={2}>Genap</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="caption">NIDN</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={detailState.nidn_dosen}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">Nama Dosen</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={detailState.nama_dosen}
            InputProps={{
              readOnly: true,
            }}
            style={{ marginBottom: "15px" }}
          />
        </Grid>
      </Grid>
    </CustomModalDetail>
  );
};

export default DetailHaki;
