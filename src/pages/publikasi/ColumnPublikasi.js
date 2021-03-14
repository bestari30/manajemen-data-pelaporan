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
    name: "id_program_studi",
    label: "Program Studi",
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
    name: "semester",
    label: "Semester",
    options: {
      filter: true,
      sort: true,
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
    name: "id_tingkat",
    label: "Tingkat",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
    },
  },
  {
    name: "nama_tingkat",
    label: "Tingkat",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "nama_jurnal",
    label: "Jurnal",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "edisi",
    label: "Edisi",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "volume",
    label: "Volume",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "url",
    label: "URL",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
    },
  },
  {
    name: "jumlah_penulis",
    label: "Penulis",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "id_dosen_1",
    label: "id Dosen 1",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
    },
  },
  {
    name: "nama_dosen_1",
    label: "Nama Dosen 1",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
    },
  },
  {
    name: "id_dosen_2",
    label: "id Dosen 2",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
    },
  },
  {
    name: "nama_dosen_2",
    label: "Nama Dosen 2",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
    },
  },
  {
    name: "id_dosen_3",
    label: "id Dosen 3",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
    },
  },
  {
    name: "nama_dosen_3",
    label: "Nama Dosen 3",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
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
    label: "Ganjil/Genap",
    options: {
      filter: false,
      sort: false,
      display: false,
      download: false,
    },
  },
  {
    name: "hibah_dikti",
    label: "Hibah Dikti",
    options: {
      filter: true,
      sort: true,
      // customBodyRender: (value, tableMeta, updateValue) => {
      //   const hibah = tableMeta.rowData[tableMeta.columnIndex];
      //   if (hibah === "0") {
      //     return <>Tidak</>;
      //   } else if (hibah === "1") {
      //     return <>Ya</>;
      //   } else {
      //     return <>{hibah}</>;
      //   }
      // },
    },
  },
];
