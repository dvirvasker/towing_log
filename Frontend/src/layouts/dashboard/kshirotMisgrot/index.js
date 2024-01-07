/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
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
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Dialog, DialogContent } from "@mui/material";
import { setMiniSidenav, setOpenConfigurator, useMaterialUIController } from "context";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PieChart from "examples/Charts/PieChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import MDTypography from "components/MDTypography";
import MilitaryIndustryForm from "layouts/Forms/kshirotMisgrot/MilitaryIndustryForm";
import CivilIndustryForm from "layouts/Forms/kshirotMisgrot/CivilIndustryForm";
import HoliyotForm from "layouts/Forms/kshirotMisgrot/HoliyotForm";
// import MDProgress from "components/MDProgress";
import MDCircularProgress from "components/MDCircularProgress";
// import CircularProgress from "@mui/material/CircularProgress";
import MDButton from "components/MDButton";

// Dashboard components
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";

// user and auth import
import { authenticate, isAuthenticated, signin } from "auth/index";
import axios from "axios";

const { user } = isAuthenticated();

function Dashboard() {
  const [showButton, setShowButton] = useState(false);
  const [holiyotDate, setHoliyotDate] = useState("1900-01-01T00:01");
  const [maintenanceMilitary, setMaintenanceMilitary] = useState(false);
  const [militaryindustry, setMilitaryindustryData] = useState({
    ztakahim: "",
    tvachOgdati: "",
    egedTeneVeMerhavim: "",
    matkaliyot: "",
    atoda: "",

    reservationCenters: "",
    yachsam: "",
    pakladVeMesayat: "",
    unitsMatkaliyot: "",
  });
  const [militaryindustryDate, setmilitaryindustryDate] = useState("1900-01-01T00:01");
  const [militarykshirot, setMmilitarykshirot] = useState(0);
  const [maintenanceCivil, setMaintenanceCivil] = useState(false);
  const [civilindustry, setCivilindustryData] = useState({
    batashVeKravi: "",
    trucksAndMinhala: "",
    ztmaVeMi: "",
    merkazHovala: "",
    pikudHaoref: "",
    hatal: "",
    masha: "",
    maharas: "",

    krtfilerVeZoko: "",
    machpileKoach: "",
    tosefetHozit: "",
    mifalimMerotakim: "",
  });
  const [civilindustryDate, setcivilindustryDate] = useState("1900-01-01T00:01");
  const [civilkshirot, setCivilkshirot] = useState(0);
  const [holiyot, setHoliyot] = useState(false);
  const [holiyotData, setHoliyotData] = useState({
    masha: "",
    eged: "",
    rapat: "",
    hatal: "",
  });

  const ksirotColor = (num) => {
    const value = Math.round(num);
    let color = "";
    if (value >= 0 && value <= 59) {
      color = "error";
    } else if (value >= 60 && value <= 79) {
      color = "warning";
    } else if (value >= 80 && value <= 100) {
      color = "success";
    }
    return [color];
  };

  const dateUpdate = (date1, date2, date3) => {
    let newestDate = date1;

    if (date2 > newestDate) {
      newestDate = date2;
    }

    if (date3 > newestDate) {
      newestDate = date3;
    }
    return `${newestDate.slice(0, 10)} ${newestDate.slice(11, 16)}`;
  };

  const addMaintenanceMilitaryFile = () => (
    <Dialog
      px={5}
      open={maintenanceMilitary}
      onClose={() => setMaintenanceMilitary(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>
          <MilitaryIndustryForm />
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const addMaintenanceCivilFile = () => (
    <Dialog
      px={5}
      open={maintenanceCivil}
      onClose={() => setMaintenanceCivil(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>
          <CivilIndustryForm />
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const addHoliyotFile = () => (
    <Dialog
      px={5}
      open={holiyot}
      onClose={() => setHoliyot(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="l"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>
          <HoliyotForm />
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const dashboard = () => (
    <>
      {user.admin === "0" || user.admin === "4" || user.admin === "5" ? (
        <MDButton onClick={() => setShowButton(!showButton)} color="mekatnar" iconOnly>
          <Icon>edit</Icon>
        </MDButton>
      ) : null}

      <MDBox py={3}>
        <MDBox bgColor="light" borderRadius="lg" variant="gradient" opacity={3} p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDTypography variant="h4" color="mekatnar">
                אחזקה צבאית
              </MDTypography>
              {showButton && (user.admin === "0" || user.admin === "4") ? (
                <>
                  <Grid container py={2}>
                    <MDButton
                      variant="gradient"
                      onClick={() => setMaintenanceMilitary(true)}
                      size="medium"
                      color="mekatnar"
                    >
                      <Icon>edit</Icon> טופס אחזקה צבאית
                    </MDButton>
                  </Grid>
                  <Grid container>
                    <MDButton
                      variant="gradient"
                      onClick={() => setHoliyot(true)}
                      size="medium"
                      color="primary"
                    >
                      <Icon>edit</Icon> טופס חוליות
                    </MDButton>
                  </Grid>
                </>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDTypography variant="h6" color="dark">
                אחוז כשירות
              </MDTypography>
              <MDCircularProgress
                value={militarykshirot.toFixed(0)}
                color={ksirotColor(militarykshirot)[0]}
                variant="gradient"
                label
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDTypography variant="h4" color="info">
                אחזקה אזרחית
              </MDTypography>

              {showButton && (user.admin === "0" || user.admin === "5") ? (
                <Grid container py={5}>
                  <MDButton
                    variant="gradient"
                    onClick={() => setMaintenanceCivil(true)}
                    size="medium"
                    color="info"
                  >
                    <Icon>edit</Icon> טופס אחזקה אזרחית
                  </MDButton>
                </Grid>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDTypography variant="h6" color="dark">
                אחוז כשירות
              </MDTypography>
              <MDCircularProgress
                value={civilkshirot.toFixed(0)}
                color={ksirotColor(civilkshirot)[0]}
                variant="gradient"
                label
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <VerticalBarChart
                icon={{ color: "mekatnar", component: "leaderboard" }}
                title="אחזקה צבאית"
                description="נתוני אחזקה צבאית"
                chart={{
                  labels: ["צק''חים", "תווך אוגדתי", "אגד טנ''א ומרחבים", "יח' מטכ''ליות", "עתודה"],
                  datasets: [
                    {
                      label: "אחוז",
                      color: "mekatnar",
                      data: [
                        militaryindustry.ztakahim,
                        militaryindustry.tvachOgdati,
                        militaryindustry.egedTeneVeMerhavim,
                        militaryindustry.matkaliyot,
                        militaryindustry.atoda,
                      ],
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <VerticalBarChart
                icon={{ color: "mekatnar", component: "leaderboard" }}
                title="אחזקה אזרחית"
                description="נתוני אחזקה אזרחית"
                chart={{
                  labels: [
                    "בט''ש וקרבי",
                    "משאיות ומנהלה",
                    "צמ''ה ומ''י",
                    "מרכז הובלה",
                    "פיקוד העורף",
                    "חט''ל",
                    "מש''א",
                    "מרה''ס",
                  ],
                  datasets: [
                    {
                      label: "אחוז",
                      color: "blue_light",
                      data: [
                        civilindustry.batashVeKravi,
                        civilindustry.trucksAndMinhala,
                        civilindustry.ztmaVeMi,
                        civilindustry.merkazHovala,
                        civilindustry.pikudHaoref,
                        civilindustry.hatal,
                        civilindustry.masha,
                        civilindustry.maharas,
                      ],
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <PieChart
                icon={{ color: "mekatnar", component: "pie_chart" }}
                title="מופעלים"
                description="באחזקה צבאית"
                chart={{
                  labels: ["מרכזי הזמנות", "יחס''ם", "פקל''ד ומסייעת", "יחידות מטכ''ליות"],
                  datasets: {
                    label: "מופעלים",
                    backgroundColors: ["success", "primary", "dark", "secondary"],
                    data: [
                      militaryindustry.reservationCenters,
                      militaryindustry.yachsam,
                      militaryindustry.pakladVeMesayat,
                      militaryindustry.unitsMatkaliyot,
                    ],
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4.5}>
              <HorizontalBarChart
                icon={{ color: "mekatnar", component: "leaderboard" }}
                title="חוליות מטכ''ליות"
                description="נתוני חוליות מטכ''ליות"
                chart={{
                  labels: ["חט''ל", "רפ''ט", "אגד", "מש''א"],
                  datasets: [
                    {
                      label: "כמות",
                      color: "blue_5",
                      data: [
                        holiyotData.hatal,
                        holiyotData.rapat,
                        holiyotData.eged,
                        holiyotData.masha,
                      ],
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4.5}>
              <HorizontalBarChart
                icon={{ color: "mekatnar", component: "leaderboard" }}
                title="מופעלים"
                description="באחזקה אזרחית"
                chart={{
                  labels: ["קרטפילר וזוקו", "מכפילי כוח", "תוספת חוזית", "מפעלים מרותקים"],
                  datasets: [
                    {
                      label: "כמות",
                      color: "blue_4",
                      data: [
                        civilindustry.krtfilerVeZoko,
                        civilindustry.machpileKoach,
                        civilindustry.tosefetHozit,
                        civilindustry.mifalimMerotakim,
                      ],
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {(holiyotDate !== "1900-01-01T00:01" ||
        civilindustryDate !== "1900-01-01T00:01" ||
        militaryindustryDate !== "1900-01-01T00:01") && (
        <MDTypography variant="h6" textGradient color="secondary">
          עדכון אחרון:
          {dateUpdate(holiyotDate, civilindustryDate, militaryindustryDate)}
        </MDTypography>
      )}
    </>
  );

  useEffect(async () => {
    await axios
      .get(`http://localhost:5000/TowingLogApi/Holiyot/`)
      .then(async (response) => {
        console.log(response.data);
        if (response.data !== null) {
          setHoliyotData({
            ...holiyotData,
            masha: response.data.masha,
            eged: response.data.eged,
            rapat: response.data.rapat,
            hatal: response.data.hatal,
          });
          setHoliyotDate(response.data.date_update);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    await axios
      .get(`http://localhost:5000/TowingLogApi/Militaryindustry/`)
      .then(async (response) => {
        console.log(response.data);
        if (response.data !== null) {
          setMilitaryindustryData({
            ...militaryindustry,
            ztakahim: response.data.ztakahim,
            tvachOgdati: response.data.tvachOgdati,
            egedTeneVeMerhavim: response.data.egedTeneVeMerhavim,
            matkaliyot: response.data.matkaliyot,
            atoda: response.data.atoda,

            reservationCenters: response.data.reservationCenters,
            yachsam: response.data.yachsam,
            pakladVeMesayat: response.data.pakladVeMesayat,
            unitsMatkaliyot: response.data.unitsMatkaliyot,
          });
          const kshirot =
            response.data.ztakahim +
            response.data.tvachOgdati +
            response.data.egedTeneVeMerhavim +
            response.data.matkaliyot +
            response.data.atoda;
          setMmilitarykshirot(kshirot / 5);
          setmilitaryindustryDate(response.data.date_update);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    await axios
      .get(`http://localhost:5000/TowingLogApi/Civilindustry/`)
      .then(async (response) => {
        console.log(response.data);
        if (response.data !== null) {
          setCivilindustryData({
            ...civilindustry,
            batashVeKravi: response.data.batashVeKravi,
            trucksAndMinhala: response.data.trucksAndMinhala,
            ztmaVeMi: response.data.ztmaVeMi,
            merkazHovala: response.data.merkazHovala,
            pikudHaoref: response.data.pikudHaoref,
            hatal: response.data.hatal,
            masha: response.data.masha,
            maharas: response.data.maharas,

            krtfilerVeZoko: response.data.krtfilerVeZoko,
            machpileKoach: response.data.machpileKoach,
            tosefetHozit: response.data.tosefetHozit,
            mifalimMerotakim: response.data.mifalimMerotakim,
          });
          const kshirot =
            response.data.batashVeKravi +
            response.data.trucksAndMinhala +
            response.data.ztmaVeMi +
            response.data.merkazHovala +
            response.data.pikudHaoref +
            response.data.hatal +
            response.data.masha +
            response.data.maharas;
          setCivilkshirot(kshirot / 8);
          setcivilindustryDate(response.data.date_update);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {addMaintenanceMilitaryFile()}
      {addMaintenanceCivilFile()}
      {addHoliyotFile()}
      {dashboard()}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
