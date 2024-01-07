/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import {
  Dialog,
  DialogContent,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import adminManagementData from "layouts/tables/data/userManagementTable";
import { useEffect, useState } from "react";

import { authenticate, isAuthenticated, signin } from "auth/index";
import axios from "axios";
import AppThumnailCard from "examples/Cards/AppThumnailCard";
import ImgDoughnutChart from "examples/Charts/DoughnutCharts/ImgDoughnutChart";
import { Navigate, Outlet } from "react-router-dom";
import { CardBody, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

import Img3 from "assets/images/unitsimg/pikudmerkaz.png";
import Img2 from "assets/images/unitsimg/pikudtzafon.png";
import MDButton from "components/MDButton";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import SimpleInfoCard from "examples/Cards/InfoCards/SimpleInfoCard";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import VerticalBarChartStacked from "examples/Charts/BarCharts/VerticalBarChartStacked";
import NesoaShchikaForm from "layouts/Forms/nesoashchika/nesoashchikaForm";
import NesoaShchikaFormDB from "layouts/Forms/nesoashchika/nesoashchikaFormDB";

const NesoaShchikaDashbord = () => {
  const [toAddFile, setToAddFile] = useState(false);
  const [num, setNum] = useState("");
  const { user } = isAuthenticated();
  const [update, setUpdate] = useState();

  const [nesoaShchika, setNesoashchika] = useState([]);
  const [c4, setc4] = useState(0);
  const [c3, setc3] = useState(0);
  const [namer, setnamer] = useState(0);
  const [dahforim, setdahforim] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/nesoashchika/`)
      .then((response) => {
        console.log(response.data.length);
        setNum(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (num > 0) {
      axios
        .get(`http://localhost:5000/TowingLogApi/nesoashchika/`)
        .then((response) => {
          console.log(response.data.length);
          setNesoashchika(response.data[0]);
          setUpdate(response.data[0].updatedAt);
          setc4(((response.data[0].c4_tools_damaged * 100) / response.data[0].c4_tools).toFixed(0));
          setc3(
            (
              ((response.data[0].c3_bz_tools_damaged + response.data[0].c3_rmh_tools_damaged) *
                100) /
              (response.data[0].c3_bz_tools + response.data[0].c3_rmh_tools)
            ).toFixed(0)
          );
          setnamer(
            ((response.data[0].namer_tools_damaged * 100) / response.data[0].namer_tools).toFixed(0)
          );
          setdahforim(
            (
              (response.data[0].dahforim_tools_damaged * 100) /
              response.data[0].dahforim_tools
            ).toFixed(0)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [num]);

  const addFile = () => (
    <Dialog
      px={5}
      open={toAddFile}
      onClose={() => setToAddFile(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // fullWidth={true}
      maxWidth="xl"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>{num > 0 ? <NesoaShchikaFormDB /> : <NesoaShchikaForm />}</DialogContent>
      </MDBox>
    </Dialog>
  );
  const dashbord = () => (
    <MDBox py={1.5}>
      {/* <MDBox bgColor="mekatnar" opacity={0.95} borderRadius="lg" mb={5}> */}
      <MDBox bgColor="light" variant="gradient" borderRadius="lg" pb={1} mb={5} mt={5}>
        <MDTypography
          variant="h4"
          sx={{ justifySelf: "center" }}
          fontWeight="medium"
          color="dark"
          m={1}
        >
          ממוצע ק"מ לכלי ליום
        </MDTypography>
        <Grid container sx={{ justifyContent: "space-evenly" }} spacing={2}>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <SimpleInfoCard title="סימן 4" value={nesoaShchika.c4_km_day} />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <SimpleInfoCard title="סימן 3" value={nesoaShchika.c3_km_day} />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <SimpleInfoCard title="נמר" value={nesoaShchika.namer_km_day} />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <SimpleInfoCard title="פומה" value={nesoaShchika.puma_km_day} />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <SimpleInfoCard title="אכזרית" value={nesoaShchika.ahzarit_km_day} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Grid container sx={{ justifyContent: "space-evenly" }} spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <MDBox mb={3}>
            <VerticalBarChart
              icon={{ color: "info", component: "local_shipping" }}
              title='ק"מ ממוצע לכלי (מתחילת התמרון עד דלתות שמים)'
              chart={{
                labels: ["אכזרית", "פומה", "נמר", "סימן 3", "סימן 4"],
                datasets: [
                  {
                    label: "כמות",
                    color: "blue_light",
                    data: [
                      nesoaShchika.ahzarit_km_avg,
                      nesoaShchika.puma_km_avg,
                      nesoaShchika.namer_km_avg,
                      nesoaShchika.c3_km_avg,
                      nesoaShchika.c4_km_avg,
                    ],
                  },
                ],
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <MDBox mb={3}>
            <VerticalBarChart
              icon={{ color: "info", component: "local_shipping" }}
              title='שע"מ ממוצע לכלי (מתחילת התמרון עד דלתות שמים)'
              chart={{
                labels: ["דחפורים", "פומה", "נמר", "סימן 3", "סימן 4"],
                datasets: [
                  {
                    label: "כמות",
                    color: "blue_dark",
                    data: [
                      nesoaShchika.dahforim_sham_avg,
                      nesoaShchika.puma_sham_avg,
                      nesoaShchika.namer_sham_avg,
                      nesoaShchika.c3_sham_avg,
                      nesoaShchika.c4_sham_avg,
                    ],
                  },
                ],
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <MDBox mb={3}>
            <VerticalBarChartStacked
              icon={{ color: "info", component: "leaderboard" }}
              title="שחיקה מבצעית"
              chart={{
                labels: ["דחפורים", "נמר", "סימן 3", "סימן 4"],

                datasets: [
                  {
                    label: "כלים פגועים",
                    color: "blue_5",
                    data: [
                      nesoaShchika.dahforim_tools_damaged,
                      nesoaShchika.namer_tools_damaged,
                      nesoaShchika.c3_rmh_tools_damaged + nesoaShchika.c3_bz_tools_damaged,
                      nesoaShchika.c4_tools_damaged,
                    ],
                  },
                  {
                    label: "כמות כלים תקינים",
                    color: "blue_4",
                    data: [
                      nesoaShchika.dahforim_tools,
                      nesoaShchika.namer_tools,
                      nesoaShchika.c3_rmh_tools + nesoaShchika.c3_bz_tools,
                      nesoaShchika.c4_tools,
                    ],
                  },
                ],
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <MDBox mb={3}>
            <HorizontalBarChart
              icon={{ color: "info", component: "local_shipping" }}
              title="אחוז שחיקה לפי פלטפורמה"
              chart={{
                labels: ["דחפורים", "נמר", "סימן 3 ", "סימן 4"],
                datasets: [
                  {
                    label: "אחוז שחיקה",
                    color: "blue_light",
                    data: [dahforim, namer, c3, c4],
                  },
                ],
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      {update && (
        <MDTypography variant="h6" textGradient color="dark">
          עדכון אחרון:{update.slice(0, 10)} {update.slice(11, 16)}
        </MDTypography>
      )}
    </MDBox>
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {(user.admin === "0" || user.admin === "3") && (
        <MDButton variant="gradient" onClick={() => setToAddFile(true)} color="mekatnar" iconOnly>
          <Icon>edit</Icon>
        </MDButton>
      )}

      {dashbord()}
      {addFile()}
      <Outlet />
      <Footer />
    </DashboardLayout>
  );
};

export default NesoaShchikaDashbord;
