export const ActionLessColumn = [
  {
    name: "id",
    label: "ID",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
    },
  },
  {
    name: "no",
    label: "No",
    options: {
      filter: false,
      sort: true,
      display: true,
      customBodyRenderLite: (value, tableMeta, updateValue) => {
        return <>{tableMeta + 1}</>;
      },
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
    name: "no_pendaftaran",
    label: "Nomor Pendaftaran",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "no_hki",
    label: "Nomor Haki",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "tahun_ajaran",
    label: "Tahun Ajaran",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
    },
  },
  {
    name: "no_semester",
    label: "no_semester",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
    },
  },
  {
    name: "semester",
    label: "Semester",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "id_program_studi",
    label: "id_program_studi",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
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
    name: "id_dosen",
    label: "id_dosen",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
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
    name: "nidn_dosen",
    label: "nidn_dosen",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
    },
  },
];
