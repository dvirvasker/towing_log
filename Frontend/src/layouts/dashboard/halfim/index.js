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
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import MDTypography from "components/MDTypography";
import ImgDoughnutChart from "examples/Charts/DoughnutCharts/ImgDoughnutChart";
import HalfimForm from "layouts/Forms/halfim/halfimForm";
import SimpleInfoCard from "examples/Cards/InfoCards/SimpleInfoCard";
import MDButton from "components/MDButton";

// Dashboard components
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";

// user and auth import
import { authenticate, isAuthenticated, signin } from "auth/index";
import axios from "axios";
import Img3 from "assets/images/unitsimg/pikodDarom.png";
import Img2 from "assets/images/unitsimg/pikudtzafon.png";

const { user } = isAuthenticated();

function Dashboard() {
  const [halfimDate, setHalfimDate] = useState("1900-01-01T00:01");
  const [halfimData, setHalfimData] = useState({
    mk4Number: 0,
    malarGinsNumber: 0,
    mk3Number: 0,
    namerNumber: 0,
    pumaNumber: 0,
    achzaritNumber: 0,
    dahporimNumber: 0,
    tomatNumber: 0,
    hamerNumber: 0,
    s3ramahHalfim: 0,
    tomatHalfim: 0,
    s3ramahKshirot: 0,
    trucks: 0,

    itemsInStockZero: 0,

    ogda162: 0,
    ogda36: 0,
    ogda252: 0,
    ogda143: 0,
    ogda98: 0,

    drishotDarom: 0,
    dhiyotDarom: 0,
    nipukimDarom: 0,
    drishotZtafon: 0,
    dhiyotZtafon: 0,
    nipukimZtafon: 0,

    merkavamk4Text: "",
    merkavamk3Text: "",
    tomatText: "",
    ginsText: "",
    namerText: "",
    pumaText: "",
    achzaritText: "",
    dahpurText: "",
  });

  const [halfim, setHalfim] = useState(false);

  const hanztlatHalfim = Number(halfimData.tomatHalfim) + Number(halfimData.s3ramahHalfim);
  const hahzaraLekshirot = Number(halfimData.trucks) + Number(halfimData.s3ramahKshirot);
  const sumItems =
    Number(halfimData.mk4Number) +
    Number(halfimData.malarGinsNumber) +
    Number(halfimData.mk3Number) +
    Number(halfimData.namerNumber) +
    Number(halfimData.pumaNumber) +
    Number(halfimData.achzaritNumber) +
    Number(halfimData.dahporimNumber) +
    Number(halfimData.tomatNumber) +
    Number(halfimData.hamerNumber);

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

  const dateUpdate = (date1) => {
    const newestDate = date1;
    return `${newestDate.slice(0, 10)} ${newestDate.slice(11, 16)}`;
  };

  const addHalfimFile = () => (
    <Dialog
      px={5}
      open={halfim}
      onClose={() => setHalfim(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>
          <HalfimForm />
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const dashboard = () => (
    <>
      {user.admin === "0" || user.admin === "6" ? (
        <MDButton onClick={() => setHalfim(true)} color="mekatnar" iconOnly>
          <Icon>edit</Icon>
        </MDButton>
      ) : null}

      <MDBox py={3}>
        <MDBox bgColor="light" variant="gradient" borderRadius="lg" pb={1} mb={5} mt={3}>
          <Grid container sx={{ justifyContent: "space-evenly" }} spacing={2}>
            <Grid item xs={6} md={4} lg={2}>
              <MDBox mb={1}>
                <SimpleInfoCard title="סך כלים עומדים על ח''ח" value={sumItems} />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <MDBox mb={1}>
                <SimpleInfoCard title="פריטים במלאי 0" value={halfimData.itemsInStockZero} />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <MDBox mb={1}>
                <SimpleInfoCard title="כלים ששימשו להנצלת חלפים" value={hanztlatHalfim} />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <MDBox mb={1}>
                <SimpleInfoCard title="כלים שהוחזרו מבלוק 2" value={hahzaraLekshirot} />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <VerticalBarChart
                icon={{ color: "info", component: "leaderboard" }}
                title="פלטפורמות"
                description="עומד על ח''ח"
                chart={{
                  labels: [
                    "סימן 4",
                    "מלא''ר/גינס",
                    "סימן 3",
                    "נמר",
                    "פומה",
                    "אכזרית",
                    "דחפורים",
                    "תומ''ת",
                    "האמר",
                  ],
                  datasets: [
                    {
                      label: "כמות",
                      color: "blue_dark",
                      data: [
                        halfimData.mk4Number,
                        halfimData.malarGinsNumber,
                        halfimData.mk3Number,
                        halfimData.namerNumber,
                        halfimData.pumaNumber,
                        halfimData.achzaritNumber,
                        halfimData.dahporimNumber,
                        halfimData.tomatNumber,
                        halfimData.hamerNumber,
                      ],
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <HorizontalBarChart
                icon={{ color: "info", component: "leaderboard" }}
                title="כלים עומדים"
                description="בפילוח אוגדות מתמרנות"
                chart={{
                  labels: ["אוגדה 98", "טוגדה 143", "אוגדה 252", "אוגדה 36", "אוגדה 162"],
                  datasets: [
                    {
                      label: "כמות",
                      color: "blue_light",
                      data: [
                        halfimData.ogda162,
                        halfimData.ogda36,
                        halfimData.ogda252,
                        halfimData.ogda143,
                        halfimData.ogda98,
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
            <Grid item xs={12} md={12} lg={5}>
              <DataTable
                entriesPerPage={false}
                noEndBorder={false}
                showTotalEntries={false}
                isSorted={false}
                table={{
                  columns: [
                    { Header: "פלטפורמה", accessor: "platform", width: "3%" },
                    { Header: "פערים עיקריים", accessor: "textArea", width: "30%" },
                  ],
                  rows: [
                    {
                      platform: "מרכבה ס 4",
                      textArea: halfimData.merkavamk4Text === "" ? "-" : halfimData.merkavamk4Text,
                    },
                    {
                      platform: "מרכבה ס3",
                      textArea: halfimData.merkavamk3Text === "" ? "-" : halfimData.merkavamk3Text,
                    },
                    {
                      platform: "תומת",
                      textArea: halfimData.tomatText === "" ? "-" : halfimData.tomatText,
                    },
                    {
                      platform: "גינס",
                      textArea: halfimData.ginsText === "" ? "-" : halfimData.ginsText,
                    },
                    {
                      platform: "נמר",
                      textArea: halfimData.namerText === "" ? "-" : halfimData.namerText,
                    },
                    {
                      platform: "פומה",
                      textArea: halfimData.pumaText === "" ? "-" : halfimData.pumaText,
                    },
                    {
                      platform: "אכזרית",
                      textArea: halfimData.achzaritText === "" ? "-" : halfimData.achzaritText,
                    },
                    {
                      platform: "דחפור",
                      textArea: halfimData.dahpurText === "" ? "-" : halfimData.dahpurText,
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3.5}>
              <MDTypography variant="h4" color="mekatnar">
                דרישות וניפוקים
              </MDTypography>
              <MDBox py={2}> </MDBox>

              <MDBox mb={3}>
                <ImgDoughnutChart
                  imag
                  title="פד''ם"
                  description=""
                  chart={{
                    labels: ["דרישות", "דחיות", "ניפוקים"],
                    datasets: {
                      label: "Projects",
                      backgroundColors: ["info", "error", "success"],
                      data: [
                        halfimData.drishotDarom,
                        halfimData.dhiyotDarom,
                        halfimData.nipukimDarom,
                      ],
                    },
                  }}
                  donatImg={Img3}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3.5}>
              <MDBox py={4}> </MDBox>
              <MDBox mb={3}>
                <ImgDoughnutChart
                  imag
                  title="פצ''ן"
                  description=""
                  chart={{
                    labels: ["דרישות", "דחיות", "ניפוקים"],
                    datasets: {
                      label: "Projects",
                      backgroundColors: ["info", "error", "success"],
                      data: [
                        halfimData.drishotZtafon,
                        halfimData.dhiyotZtafon,
                        halfimData.nipukimZtafon,
                      ],
                    },
                  }}
                  donatImg={Img2}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {halfimDate !== "1900-01-01T00:01" && (
        <MDTypography variant="h6" textGradient color="secondary">
          עדכון אחרון:
          {dateUpdate(halfimDate)}
        </MDTypography>
      )}
    </>
  );

  useEffect(async () => {
    await axios
      .get(`http://localhost:5000/TowingLogApi/Halfim/`)
      .then(async (response) => {
        console.log(response.data);
        if (response.data !== null) {
          setHalfimData({
            ...halfimData,
            mk4Number: response.data.mk4Number,
            malarGinsNumber: response.data.malarGinsNumber,
            mk3Number: response.data.mk3Number,
            namerNumber: response.data.namerNumber,
            pumaNumber: response.data.pumaNumber,
            achzaritNumber: response.data.achzaritNumber,
            dahporimNumber: response.data.dahporimNumber,
            tomatNumber: response.data.tomatNumber,
            hamerNumber: response.data.hamerNumber,
            s3ramahHalfim: response.data.s3ramahHalfim,
            tomatHalfim: response.data.tomatHalfim,
            s3ramahKshirot: response.data.s3ramahKshirot,
            trucks: response.data.trucks,
            itemsInStockZero: response.data.itemsInStockZero,
            ogda162: response.data.ogda162,
            ogda36: response.data.ogda36,
            ogda252: response.data.ogda252,
            ogda143: response.data.ogda143,
            ogda98: response.data.ogda98,
            drishotDarom: response.data.drishotDarom,
            dhiyotDarom: response.data.dhiyotDarom,
            nipukimDarom: response.data.nipukimDarom,
            drishotZtafon: response.data.drishotZtafon,
            dhiyotZtafon: response.data.dhiyotZtafon,
            nipukimZtafon: response.data.nipukimZtafon,
            merkavamk4Text: response.data.merkavamk4Text,
            merkavamk3Text: response.data.merkavamk3Text,
            tomatText: response.data.tomatText,
            ginsText: response.data.ginsText,
            namerText: response.data.namerText,
            pumaText: response.data.pumaText,
            achzaritText: response.data.achzaritText,
            dahpurText: response.data.dahpurText,
          });
          setHalfimDate(response.data.date_update);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {addHalfimFile()}
      {dashboard()}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
