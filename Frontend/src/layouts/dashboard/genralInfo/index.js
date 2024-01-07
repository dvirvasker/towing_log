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
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import MDButton from "components/MDButton";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import SimpleInfoCard from "examples/Cards/InfoCards/SimpleInfoCard";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import VerticalBarChartStacked from "examples/Charts/BarCharts/VerticalBarChartStacked";
import PersonnelForm from "layouts/Forms/PersonnelForms/PersonnelForm";
import PersonnelFormDB from "layouts/Forms/PersonnelForms/PersonnelFormDB";
import SdacPowerForm from "layouts/Forms/SdacPowerForms/SdacPowerForm";
import SdacPowerFormDB from "layouts/Forms/SdacPowerForms/SdacPowerFormDB";
import KshirotForm from "layouts/Forms/KshirotForms/KshirotForm";
import KshirotFormDB from "layouts/Forms/KshirotForms/KshirotFormsDB";

const genralInfo = () => {
  const { user } = isAuthenticated();
  const [showBtnEdit, setShowBtnEdit] = useState(false);

  const [totalSolider, setTotalSolider] = useState(0);
  const [personnelDate, setPersonnelDate] = useState("1900-01-01T00:01");
  const [toAddFilePersonnel, setToAddFilePersonnel] = useState(false);
  const [checkDataPersonnel, setCheckDataPersonnel] = useState("update");
  const [personnel, setPersonnel] = useState({
    hova_soldiers: 0,
    keva: 0,
    civilian_employee: 0,
    student: 0,
    miluim: 0,

    casualty: 0,
    back_to_unit: 0,
    sadir_halalim: 0,
    miluim_halalim: 0,
  });

  const [sdacPowerDate, setSdacPowerDate] = useState("1900-01-01T00:01");
  const [toAddFileSdacPower, setToAddFileSdacPower] = useState(false);
  const [checkDataSdacPower, setCheckDataSdacPower] = useState("update");
  const [sdacPower, setSdacPower] = useState({
    darom_tank: 0,
    darom_namer: 0,
    darom_hashaz: 0,
    darom_ngmash: 0,
    darom_tomat: 0,
    darom_zma: 0,
    darom_car: 0,

    merkaz_tank: 0,
    merkaz_ngmash: 0,
    merkaz_zma: 0,
    merkaz_car: 0,

    zafon_tank: 0,
    zafon_namer: 0,
    zafon_hashaz: 0,
    zafon_ngmash: 0,
    zafon_tomat: 0,
    zafon_zma: 0,
    zafon_car: 0,
  });

  const [weeksName, setWeekName] = useState([]);
  const [c3, setC3] = useState([]);

  const [kshirotDate, setKshirotDate] = useState("1900-01-01T00:01");
  const [toAddFilekshirot, setToAddFileKshirot] = useState(false);
  const [checkDatakshirot, setCheckDatakshirot] = useState("update");
  const [kshirot, setkshirot] = useState({
    weeksArray: [{}],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/personnel/`)
      .then((response) => {
        console.log(response.data);
        if (response.data !== null) {
          setPersonnel({
            ...personnel,
            hova_soldiers: response.data.hova_soldiers,
            keva: response.data.keva,
            civilian_employee: response.data.civilian_employee,
            student: response.data.student,
            miluim: response.data.miluim,

            casualty: response.data.casualty,
            back_to_unit: response.data.back_to_unit,
            sadir_halalim: response.data.sadir_halalim,
            miluim_halalim: response.data.miluim_halalim,
          });

          setTotalSolider(
            response.data.hova_soldiers +
              response.data.keva +
              response.data.civilian_employee +
              response.data.student +
              response.data.miluim
          );
        } else {
          setCheckDataPersonnel("add");
        }
        setPersonnelDate(response.data.updatedAt);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/sdacPower/`)
      .then((response) => {
        console.log(response.data);
        if (response.data !== null) {
          setSdacPower({
            ...sdacPower,
            darom_tank: response.data.darom_tank,
            darom_namer: response.data.darom_namer,
            darom_hashaz: response.data.darom_hashaz,
            darom_ngmash: response.data.darom_ngmash,
            darom_tomat: response.data.darom_tomat,
            darom_zma: response.data.darom_zma,
            darom_car: response.data.darom_car,

            merkaz_tank: response.data.merkaz_tank,
            merkaz_ngmash: response.data.merkaz_ngmash,
            merkaz_zma: response.data.merkaz_zma,
            merkaz_car: response.data.merkaz_car,

            zafon_tank: response.data.zafon_tank,
            zafon_namer: response.data.zafon_namer,
            zafon_hashaz: response.data.zafon_hashaz,
            zafon_ngmash: response.data.zafon_ngmash,
            zafon_tomat: response.data.zafon_tomat,
            zafon_zma: response.data.zafon_zma,
            zafon_car: response.data.zafon_car,
          });
        } else {
          setCheckDataSdacPower("add");
        }
        setSdacPowerDate(response.data.updatedAt);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/kshirot/`)
      .then((response) => {
        console.log(response.data);
        if (response.data !== null) {
          setkshirot({
            ...kshirot,
            weeksArray: response.data.weeksArray,
          });
          setWeekName(response.data.weeksArray.map((elment) => elment.week_name));
          setC3(response.data.weeksArray.map((elment) => elment.c3));
        } else {
          setCheckDatakshirot("add");
        }
        setKshirotDate(response.data.updatedAt);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(weeksName);
  }, []);

  const addFilePersonnel = () => (
    <Dialog
      px={5}
      open={toAddFilePersonnel}
      onClose={() => setToAddFilePersonnel(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // fullWidth={true}
      maxWidth="xl"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>
          {" "}
          {checkDataPersonnel === "add" ? <PersonnelForm /> : <PersonnelFormDB />}{" "}
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const addFileSdacPower = () => (
    <Dialog
      px={5}
      open={toAddFileSdacPower}
      onClose={() => setToAddFileSdacPower(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // fullWidth={true}
      maxWidth="xl"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>
          {" "}
          {checkDataSdacPower === "add" ? <SdacPowerForm /> : <SdacPowerFormDB />}{" "}
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const addFileKshirot = () => (
    <Dialog
      px={5}
      open={toAddFilekshirot}
      onClose={() => setToAddFileKshirot(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // fullWidth={true}
      maxWidth="xl"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>
          {" "}
          {checkDatakshirot === "add" ? <KshirotForm /> : <KshirotFormDB />}{" "}
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const lastDateUpdate = (date1, date2, date3) => {
    console.log(c3);
    let newestDate = date1;
    if (date2 > newestDate) {
      newestDate = date2;
    }
    if (date3 > newestDate) {
      newestDate = date3;
    }
    return `${newestDate.slice(0, 10)} ${newestDate.slice(11, 16)}`;
  };

  const dashbord = () => (
    <>
      {user.admin === "0" || user.admin === "2" || user.admin === "3" ? (
        <MDButton onClick={() => setShowBtnEdit(!showBtnEdit)} color="mekatnar" iconOnly>
          <Icon>edit</Icon>
        </MDButton>
      ) : null}

      {showBtnEdit && (user.admin === "0" || user.admin === "2") ? (
        <MDBox py={1.5}>
          <MDBox>
            <MDButton
              variant="gradient"
              onClick={() => setToAddFilePersonnel(true)}
              size="large"
              color="mekatnar"
            >
              עדכון טופס כוח אדם
              <Icon>edit</Icon>
            </MDButton>
          </MDBox>
        </MDBox>
      ) : null}

      <MDBox py={1.5}>
        <MDBox bgColor="light" variant="gradient" borderRadius="lg" pb={1} mb={5}>
          <MDTypography
            variant="h4"
            sx={{ justifySelf: "center" }}
            fontWeight="medium"
            color="dark"
            m={2}
          >
            אנשים -כ"א פעיל: {totalSolider}
          </MDTypography>
          <Grid container sx={{ justifyContent: "space-evenly" }} spacing={0}>
            <Grid item xs={6} md={4} lg={1.3}>
              <MDBox mb={1.5}>
                <SimpleInfoCard title="חובה" value={personnel.hova_soldiers} />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={4} lg={1.3}>
              <MDBox mb={1.5}>
                <SimpleInfoCard title="קבע" value={personnel.keva} />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={4} lg={1.3}>
              <MDBox mb={1.5}>
                <SimpleInfoCard title="אע''צ" value={personnel.civilian_employee} />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={4} lg={1.3}>
              <MDBox mb={1.5}>
                <SimpleInfoCard title="לומדים" value={personnel.student} />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={4} lg={1.3}>
              <MDBox mb={1.5}>
                <SimpleInfoCard title="מילוואים" value={personnel.miluim} />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={4} lg={1.3}>
              <MDBox mb={1.5}>
                <SimpleInfoCard title="נפגעים" value={personnel.casualty} />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={4} lg={1.3}>
              <MDBox mb={1.5}>
                <SimpleInfoCard title="חזרו ליחידה" value={personnel.back_to_unit} />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={4} lg={1.3}>
              <MDBox mb={1.5}>
                <SimpleInfoCard
                  title="חללים"
                  value={personnel.sadir_halalim + personnel.miluim_halalim}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={4}>
          <MDTypography variant="h3" fontWeight="medium" textGradient color="dark">
            סד"כ עוצמה
          </MDTypography>
          {showBtnEdit && (user.admin === "0" || user.admin === "3") ? (
            <MDBox py={1.5}>
              <MDBox>
                <MDButton
                  variant="gradient"
                  onClick={() => setToAddFileSdacPower(true)}
                  size="large"
                  color="mekatnar"
                >
                  עדכון טופס סד"כ עוצמה
                  <Icon>edit</Icon>
                </MDButton>
              </MDBox>
            </MDBox>
          ) : null}
        </MDBox>
        <Grid container sx={{ justifyContent: "space-evenly" }} spacing={2}>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={3}>
              <VerticalBarChart
                icon={{ color: "info", component: "leaderboard" }}
                title="פיקוד דרום"
                chart={{
                  labels: ["רכב", "צמ''ה", "תומ''ת", "נגמ''ש", "חס''צ", "נמר ", "טנקים"],
                  datasets: [
                    {
                      label: "כמות",
                      color: "blue_5",
                      data: [
                        sdacPower.darom_car,
                        sdacPower.darom_zma,
                        sdacPower.darom_tomat,
                        sdacPower.darom_ngmash,
                        sdacPower.darom_hashaz,
                        sdacPower.darom_namer,
                        sdacPower.darom_tank,
                      ],
                    },
                  ],
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={3}>
              <VerticalBarChart
                icon={{ color: "info", component: "leaderboard" }}
                title="פיקוד מרכז"
                chart={{
                  labels: ["רכב", "צמ''ה", "נגמ''ש", "טנקים"],
                  datasets: [
                    {
                      label: "כמות",
                      color: "blue_4",
                      data: [
                        sdacPower.merkaz_car,
                        sdacPower.merkaz_zma,
                        sdacPower.merkaz_ngmash,
                        sdacPower.merkaz_tank,
                      ],
                    },
                  ],
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={3}>
              <VerticalBarChartStacked
                icon={{ color: "info", component: "leaderboard" }}
                title="פיקוד צפון"
                chart={{
                  labels: ["רכב", "דחפורים", "תומ''ת", "נגמ''ש", "חט''צ", "נמר", "טנקים"],

                  datasets: [
                    {
                      label: "כמות",
                      color: "blue_light",
                      data: [
                        sdacPower.zafon_car,
                        sdacPower.zafon_zma,
                        sdacPower.zafon_tomat,
                        sdacPower.zafon_ngmash,
                        sdacPower.zafon_hashaz,
                        sdacPower.zafon_namer,
                        sdacPower.zafon_tank,
                      ],
                    },
                  ],
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mb={4}>
          <MDTypography variant="h3" fontWeight="medium" textGradient color="dark">
            ממוצע כשירות
          </MDTypography>
          {showBtnEdit && (user.admin === "0" || user.admin === "3") ? (
            <MDBox py={1.5}>
              <MDBox>
                <MDButton
                  variant="gradient"
                  onClick={() => setToAddFileKshirot(true)}
                  size="large"
                  color="mekatnar"
                >
                  עדכון טופס כשירות
                  <Icon>edit</Icon>
                </MDButton>
              </MDBox>
            </MDBox>
          ) : null}
        </MDBox>
        <Grid container sx={{ justifyContent: "space-evenly" }} spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="מרכבה סימן 3"
                description="ממוצע מרחק מחלקתי"
                date="just updated"
                chart={{
                  labels: weeksName.map((el, index) => weeksName[index]),
                  datasets: {
                    label: "אחוז ס'3",
                    // data: c3.map((el ,index)=>c3[index]),
                    data: kshirot.weeksArray.map((el, index) => kshirot.weeksArray[index].c3),
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="מרכבה סימן 4"
                description="ממוצע מרחק מחלקתי"
                date="just updated"
                chart={{
                  labels: weeksName.map((el, index) => weeksName[index]),
                  datasets: {
                    label: "אחוז ס'4",
                    data: kshirot.weeksArray.map((el, index) => kshirot.weeksArray[index].c4),
                  },
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container sx={{ justifyContent: "space-evenly" }} spacing={2} marginTop={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="צמ''ה"
                description="ממוצע מרחק מחלקתי"
                date="just updated"
                chart={{
                  labels: weeksName.map((el, index) => weeksName[index]),
                  datasets: {
                    label: "אחוז צמ''ה",
                    data: kshirot.weeksArray.map((el, index) => kshirot.weeksArray[index].zma),
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="נמר"
                description="ממוצע מרחק מחלקתי"
                date="just updated"
                chart={{
                  labels: weeksName.map((el, index) => weeksName[index]),
                  datasets: {
                    label: "אחוז נמר",
                    data: kshirot.weeksArray.map((el, index) => kshirot.weeksArray[index].namer),
                  },
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {(personnelDate !== "1900-01-01T00:01" || sdacPowerDate !== "1900-01-01T00:01") && (
          <MDTypography variant="h6" textGradient color="secondary">
            עדכון אחרון:
            {lastDateUpdate(personnelDate, sdacPowerDate, kshirotDate)}
          </MDTypography>
        )}
      </MDBox>
    </>
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {dashbord()}
      {addFilePersonnel()}
      {addFileSdacPower()}
      {addFileKshirot()}
      <Outlet />
      <Footer />
    </DashboardLayout>
  );
};

export default genralInfo;
