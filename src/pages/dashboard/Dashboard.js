import { React, useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
} from "recharts";

import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";

import { getPenelitianCountByProgramStudi } from "../../functions/Penelitian";
import { getPengabdianMasyarakatCountByProgramStudi } from "../../functions/PengabdianMasyarakat";
import { getPublikasiCountByProgramStudi } from "../../functions/Publikasi";
import { getProgramStudi } from "../../functions/ProgramStudi";
import { countKerjasamaByStatus } from "../../functions/Kerjasama";
import { countSertifikasiByProgramStudi } from "../../functions/Sertifikasi";
import { countStudiLanjutByProgramStudi } from "../../functions/StudiLanjut";
import { countHakiByProgramStudi } from "../../functions/Haki";
import { countPrestasiMahasiswaKategoriByProgramStudi } from "../../functions/PrestasiMahasiswa";
import { getKategori } from "../../functions/Kategori";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    uhuy,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function Dashboard() {
  const [chart1, setChart1] = useState([]);
  const [chart2, setChart2] = useState([]);
  const [chart3, setChart3] = useState([]);
  const [chartKerjasama, setChartKerjasama] = useState([]);
  const [dataKategori, setDataKategori] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const dataPenelitianCountByProgramStudi = await getPenelitianCountByProgramStudi();
      const dataPengabdianMasyarakatCountByProgramStudi = await getPengabdianMasyarakatCountByProgramStudi();
      const dataPublikasiCountByProgramStudi = await getPublikasiCountByProgramStudi();
      const dataProgramStudi = await getProgramStudi();

      const dataCountKerjasamaByStatus = await countKerjasamaByStatus();
      let dataChartKerjasama = dataCountKerjasamaByStatus.data;
      dataChartKerjasama.map((x) => {
        x.name = x.status;
        x.value = parseInt(x.count);
      });
      setChartKerjasama(dataChartKerjasama);

      let dataChart1 = dataProgramStudi.data;
      dataChart1.map((x) => {
        x["Penelitian"] = 0;
        x["Publikasi"] = 0;
        x["Pengabdian Masyarakat"] = 0;

        dataPenelitianCountByProgramStudi.data.map((penelitian) => {
          if (penelitian.program_studi.id === x.id) {
            x["Penelitian"] = parseInt(penelitian.count);
          }
        });
        dataPublikasiCountByProgramStudi.data.map((publikasi) => {
          if (publikasi.program_studi.id === x.id) {
            x["Publikasi"] = parseInt(publikasi.count);
          }
        });
        dataPengabdianMasyarakatCountByProgramStudi.data.map(
          (pengabdianMasyarakat) => {
            if (pengabdianMasyarakat.program_studi.id === x.id) {
              x["Pengabdian Masyarakat"] = parseInt(pengabdianMasyarakat.count);
            }
          },
        );
      });
      setChart1(dataChart1);

      const datacountSertifikasiByProgramStudi = await countSertifikasiByProgramStudi();
      const datacountStudiLanjutByProgramStudi = await countStudiLanjutByProgramStudi();
      const datacountHakiByProgramStudi = await countHakiByProgramStudi();
      let dataChart2 = dataProgramStudi.data;
      dataChart2.map((x) => {
        x["Sertifikasi"] = 0;
        x["Studi Lanjut"] = 0;
        x["HAKI"] = 0;

        datacountSertifikasiByProgramStudi.data.map((sertifikasi) => {
          if (sertifikasi.program_studi.id === x.id) {
            x["Sertifikasi"] = parseInt(sertifikasi.count);
          }
        });
        datacountStudiLanjutByProgramStudi.data.map((studilanjut) => {
          if (studilanjut.program_studi.id === x.id) {
            x["Studi Lanjut"] = parseInt(studilanjut.count);
          }
        });
        datacountHakiByProgramStudi.data.map((haki) => {
          if (haki.program_studi.id === x.id) {
            x["HAKI"] = parseInt(haki.count);
          }
        });
      });
      setChart2(dataChart2);

      const datacountPrestasiMahasiswaKategoriByProgramStudi = await countPrestasiMahasiswaKategoriByProgramStudi();
      const dataKategori = await getKategori();
      setDataKategori(dataKategori.data);
      let dataChart3 = dataProgramStudi.data;
      dataChart3.map((x) => {
        dataKategori.data.map((kategori) => {
          x[kategori.nama] = 0;
          datacountPrestasiMahasiswaKategoriByProgramStudi.data.map(
            (prestasiMahasiswa) => {
              if (
                prestasiMahasiswa.program_studi.id === x.id &&
                prestasiMahasiswa.kategori.id === kategori.id
              ) {
                x[kategori.nama] = parseInt(prestasiMahasiswa.count);
              }
            },
          );
        });
      });
      setChart3(dataChart3);
      setIsLoading(false);
    }
    getData();
  }, []);

  const [state, setState] = useState({
    activeIndex: 0,
  });

  return (
    <>
      <PageTitle title="Dashboard" />
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={50} style={{ marginTop: 50 }} />
        </div>
      ) : (
        <>
          <Grid item xs={12}>
            <Widget
              header={
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Jumlah Penelitian, Publikasi, dan Penelitian Masyarakat
                </Typography>
              }
            >
              <ResponsiveContainer width="100%" minWidth={500} height={350}>
                <BarChart
                  width={500}
                  height={300}
                  data={chart1}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="nama"
                    interval={0}
                    orientation="bottom"
                    tick={false}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Penelitian" fill="#4ac0c0" />
                  <Bar dataKey="Publikasi" fill="#36a2eb" />
                  <Bar dataKey="Pengabdian Masyarakat" fill="#c1bfc0" />
                </BarChart>
              </ResponsiveContainer>
            </Widget>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 25 }}>
            <Widget
              header={
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Jumlah Sertifikasi, Studi Lanjut, dan HAKI
                </Typography>
              }
            >
              <ResponsiveContainer width="100%" minWidth={500} height={350}>
                <BarChart
                  width={500}
                  height={300}
                  data={chart2}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="nama"
                    interval={0}
                    orientation="bottom"
                    tick={false}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Sertifikasi" fill="#4ac0c0" />
                  <Bar dataKey="Studi Lanjut" fill="#36a2eb" />
                  <Bar dataKey="HAKI" fill="#c1bfc0" />
                </BarChart>
              </ResponsiveContainer>
            </Widget>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 25 }}>
            <Widget
              header={
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Jumlah Prestasi Mahasiswa
                </Typography>
              }
            >
              <ResponsiveContainer width="100%" minWidth={500} height={350}>
                <BarChart
                  width={500}
                  height={300}
                  data={chart3}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="nama"
                    interval={0}
                    orientation="bottom"
                    tick={false}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Bidang Sains" fill="#4ac0c0" />
                  <Bar dataKey="Bidang Olahraga" fill="#36a2eb" />
                  <Bar dataKey="Bidang Seni" fill="#c1bfc0" />
                  <Bar
                    dataKey="Bidang Lainnya (keagamaan, bakat/minat)"
                    fill="#ff8043"
                  />
                  {/* {dataKategori.map((x) => { */}
                  {/* // <Bar dataKey={x.nama} fill="#4ac0c0" /> */}
                  {/* })} */}
                </BarChart>
              </ResponsiveContainer>
            </Widget>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 25 }}>
            <Widget
              header={
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Jumlah Kerjasama
                </Typography>
              }
            >
              <ResponsiveContainer width="100%" minWidth={500} height={350}>
                <PieChart width={400} height={400}>
                  <Pie
                    activeIndex={state.activeIndex}
                    activeShape={renderActiveShape}
                    data={chartKerjasama}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseOver={(_, index) => setState({ activeIndex: index })}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Widget>
          </Grid>
        </>
      )}
    </>
  );
}
