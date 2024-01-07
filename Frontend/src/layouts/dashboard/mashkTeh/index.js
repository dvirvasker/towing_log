/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
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
  responsiveFontSizes,
} from "@mui/material";
import adminManagementData from "layouts/tables/data/userManagementTable";
import { useEffect, useState } from "react";

import { authenticate, isAuthenticated, signin } from "auth/index";
import axios from "axios";
import AppThumnailCard from "examples/Cards/AppThumnailCard";
import ImgDoughnutChart from "examples/Charts/DoughnutCharts/ImgDoughnutChart";
import { Navigate, Outlet } from "react-router-dom";
import { CardBody, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

import Img3 from "assets/images/unitsimg/pikodDarom.png";
import Img2 from "assets/images/unitsimg/pikudtzafon.png";
import MDButton from "components/MDButton";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import SimpleInfoCard from "examples/Cards/InfoCards/SimpleInfoCard";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import MashkTechForm from "layouts/Forms/MashkTehForms/MashkTechForm";
import MashkTechFormDB from "layouts/Forms/MashkTehForms/MashkTehFormDB";
import MDCircularProgress from "components/MDCircularProgress";
import VerticalBarChartStacked from "examples/Charts/BarCharts/VerticalBarChartStacked";

const { user } = isAuthenticated();

const mashkTeh = () => {
  const [timeUpdate, setTimeUpdate] = useState();
  const [toAddFile, setToAddFile] = useState(false);
  const [toEditFile, setToEditFile] = useState(false);

  const [checkData, setCheckData] = useState("update");

  const [hatcimCalPercent, setHatcimCalPercent] = useState(0);
  const [bkhasCalPercent, setBkhasCalPercent] = useState(0);
  const [malarCalPercent, setMalarCalPercent] = useState(0);
  const [hatcimP, setHatcimP] = useState(0);
  const [pikodZafonCal, setPikodZafonCal] = useState(0);
  const [pikodDaromCal, setPikodDaromCal] = useState(0);

  const [mashkTehDB, setMashkTehDB] = useState({
    hatcim: 0,
    hatcim_kshirot: 0,
    bkhas: 0,
    bkhas_kshirot: 0,
    malar: 0,
    malar_kshirot: 0,
    malarCars: 0,
    malarCars_kshirot: 0,
    departments_caza: 0,
    migunim: 0,
    Pergolas: 0,

    pikodZafon_totalNum: 0,
    pikodZafon_totalNum_kshirot: 0,
    pikodDarom_totalNum: 0,
    pikodDarom_totalNum_kshirot: 0,

    raklar: 0,
    lhat: 0,
    nativ_hasra: 0,
    robotics: 0,
    barack: 0,

    life_support: 0,
    bow: 0,
    windbreaker: 0,
    hanit: 0,

    dummy_platforms: 0,
    rear_line_platforms: 0,
    rock_pos: 0,
    military_profession: 0,
    outpost_defenses: 0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/mashkTeh/`)
      .then((response) => {
        console.log(response.data);
        if (response.data !== null) {
          setMashkTehDB({
            ...mashkTehDB,
            hatcim: response.data.hatcim,
            hatcim_kshirot: response.data.hatcim_kshirot,
            bkhas: response.data.bkhas,
            bkhas_kshirot: response.data.bkhas_kshirot,
            malar: response.data.malar,
            malar_kshirot: response.data.malar_kshirot,
            malarCars: response.data.malarCars,
            malarCars_kshirot: response.data.malarCars_kshirot,
            departments_caza: response.data.departments_caza,
            migunim: response.data.migunim,
            Pergolas: response.data.Pergolas,

            pikodZafon_totalNum: response.data.pikodZafon_totalNum,
            pikodZafon_totalNum_kshirot: response.data.pikodZafon_totalNum_kshirot,
            pikodDarom_totalNum: response.data.pikodDarom_totalNum,
            pikodDarom_totalNum_kshirot: response.data.pikodDarom_totalNum_kshirot,

            raklar: response.data.raklar,
            lhat: response.data.lhat,
            nativ_hasra: response.data.nativ_hasra,
            robotics: response.data.robotics,
            barack: response.data.barack,

            life_support: response.data.life_support,
            bow: response.data.bow,
            windbreaker: response.data.windbreaker,
            hanit: response.data.hanit,

            dummy_platforms: response.data.dummy_platforms,
            rear_line_platforms: response.data.rear_line_platforms,
            rock_pos: response.data.rock_pos,
            outpost_defenses: response.data.outpost_defenses,
          });

          // console.log(hatcimCalPercent);
          if (
            response.data.hatcim !== 0 &&
            response.data.bkhas !== 0 &&
            response.data.malar !== 0 &&
            response.data.pikodZafon_totalNum !== 0 &&
            response.data.pikodDarom_totalNum !== 0
          ) {
            setHatcimCalPercent((response.data.hatcim_kshirot * 100) / response.data.hatcim);
            setBkhasCalPercent((response.data.bkhas_kshirot * 100) / response.data.bkhas);
            setMalarCalPercent((response.data.malar_kshirot * 100) / response.data.malar);

            setPikodZafonCal(
              (response.data.pikodZafon_totalNum_kshirot * 100) / response.data.pikodZafon_totalNum
            );
            setPikodDaromCal(
              (response.data.pikodDarom_totalNum_kshirot * 100) / response.data.pikodDarom_totalNum
            );
          }

          setTimeUpdate(response.data.updatedAt);
        } else {
          setCheckData("add");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        <DialogContent>
          <MashkTechForm />
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const editAlert = () => (
    <Dialog
      px={5}
      open={toEditFile}
      onClose={() => {
        setToEditFile(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>
          <MashkTechFormDB />
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const ksirotColor = (totalNum) => {
    let color = "";
    if (totalNum >= 0 && totalNum <= 59) {
      color = "error";
    } else if (totalNum >= 60 && totalNum <= 79) {
      color = "warning";
    } else if (totalNum >= 80 && totalNum <= 100) {
      color = "success";
    }
    return [color];
  };
  const dashbord = () => (
    <>
      {user.admin === "0" || user.admin === "8" ? (
        <MDBox py={1.5}>
          <MDBox>
            <MDButton
              variant="gradient"
              onClick={checkData === "add" ? () => setToAddFile(true) : () => setToEditFile(true)}
              color="mekatnar"
              iconOnly
            >
              <Icon>edit</Icon>
            </MDButton>
          </MDBox>
        </MDBox>
      ) : null}

      <MDBox bgColor="light" variant="gradient" borderRadius="lg" pb={1} mb={5} mt={5}>
        <Grid container sx={{ justifyContent: "space-evenly" }} spacing={2}>
          <Grid item xs={6} md={4} lg={1.5}>
            <MDBox mb={1}>
              <SimpleInfoCard title="חט''כים" value={mashkTehDB.hatcim} />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={1.5}>
            <MDBox mb={1}>
              <SimpleInfoCard title="בק''ש" value={mashkTehDB.bkhas} />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={1.5}>
            <MDBox mb={1}>
              <SimpleInfoCard title="מלא''ר" value={mashkTehDB.malar} />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={1.5}>
            <MDBox mb={1}>
              <SimpleInfoCard
                title="ניידות מלא''ר"
                value={
                  <h5>
                    {mashkTehDB.malarCars_kshirot}/{mashkTehDB.malarCars}
                  </h5>
                }
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={1.5}>
            <MDBox mb={1}>
              <SimpleInfoCard title="מחלקות כאצ''ה" value={mashkTehDB.departments_caza} />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={1.5}>
            <MDBox mb={1}>
              <SimpleInfoCard title="מיגונים" value={mashkTehDB.migunim} />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={1.5}>
            <MDBox mb={1}>
              <SimpleInfoCard title="פרגולות" value={mashkTehDB.Pergolas} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox bgColor="#fff" borderRadius="lg" variant="gradient" opacity={3} p={4.5}>
                <MDTypography variant="h5" color="mekatnar">
                  כשירות משקים מטכליים
                </MDTypography>
                <Row>
                  <Grid item xs={12} md={6} lg={4}>
                    <h5 style={{ textAlign: "center", fontWeight: "bold", marginTop: "2rem" }}>
                      {" "}
                      חטכים
                    </h5>
                    <MDCircularProgress
                      value={hatcimCalPercent.toFixed(0)}
                      color={ksirotColor(hatcimCalPercent)[0]}
                      variant="gradient"
                      label
                    />
                    <h6 style={{ textAlign: "center", fontWeight: "bold", marginTop: "2rem" }}>
                      {mashkTehDB.hatcim} / {mashkTehDB.hatcim_kshirot}{" "}
                    </h6>
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    <h5 style={{ textAlign: "center", fontWeight: "bold", marginTop: "2rem" }}>
                      {" "}
                      בקש
                    </h5>
                    <MDCircularProgress
                      value={bkhasCalPercent.toFixed(0)}
                      color={ksirotColor(bkhasCalPercent)[0]}
                      variant="gradient"
                      label
                    />
                    <h6 style={{ textAlign: "center", fontWeight: "bold", marginTop: "2rem" }}>
                      {mashkTehDB.bkhas} / {mashkTehDB.bkhas_kshirot}{" "}
                    </h6>
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    <h5 style={{ textAlign: "center", fontWeight: "bold", marginTop: "2rem" }}>
                      {" "}
                      מלאר{" "}
                    </h5>
                    <MDCircularProgress
                      value={malarCalPercent.toFixed(0)}
                      color={ksirotColor(malarCalPercent)[0]}
                      variant="gradient"
                      label
                    />
                    <h6 style={{ textAlign: "center", fontWeight: "bold", marginTop: "2rem" }}>
                      {mashkTehDB.malar} / {mashkTehDB.malar_kshirot}{" "}
                    </h6>
                  </Grid>
                </Row>
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={2}>
                <VerticalBarChart
                  icon={{ color: "info", component: "bar_chart_sharpIcon" }}
                  title="קליטות אמל'''ח - פלטפורמות"
                  // description="Sales related to age average"
                  chart={{
                    labels: ["ברק", "רובוטיקה", "נתיב העשרה", "לה''ט", "ציין ראקלר"],
                    datasets: [
                      {
                        label: "כמות",
                        color: "blue_5",
                        data: [
                          mashkTehDB.barack,
                          mashkTehDB.robotics,
                          mashkTehDB.nativ_hasra,
                          mashkTehDB.lhat,
                          mashkTehDB.raklar,
                        ],
                      },
                    ],
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox py={3}>
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={4}>
                <MDBox bgColor="#fff" borderRadius="lg" variant="gradient" opacity={3} p={4.5}>
                  <MDTypography variant="h5" color="mekatnar">
                    כשירות מערך האיסוף
                  </MDTypography>
                  <Row>
                    <Grid item xs={12} md={6} lg={6}>
                      <h5 style={{ textAlign: "center", fontWeight: "bold", marginTop: "2rem" }}>
                        {" "}
                        פיקוד צפון
                      </h5>
                      <MDCircularProgress
                        value={pikodZafonCal.toFixed(0)}
                        color={ksirotColor(pikodZafonCal)[0]}
                        variant="gradient"
                        label
                      />
                      <h6 style={{ textAlign: "center", fontWeight: "bold", marginTop: "2rem" }}>
                        {mashkTehDB.pikodZafon_totalNum} / {mashkTehDB.pikodZafon_totalNum_kshirot}{" "}
                      </h6>
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                      <h5 style={{ textAlign: "center", fontWeight: "bold", marginTop: "2rem" }}>
                        {" "}
                        פיקוד דרום
                      </h5>
                      <MDCircularProgress
                        value={pikodDaromCal.toFixed(0)}
                        color={ksirotColor(pikodDaromCal)[0]}
                        variant="gradient"
                        label
                      />
                      <h6 style={{ textAlign: "center", fontWeight: "bold", marginTop: "2rem" }}>
                        {mashkTehDB.pikodDarom_totalNum} / {mashkTehDB.pikodDarom_totalNum_kshirot}{" "}
                      </h6>
                    </Grid>
                  </Row>
                </MDBox>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <MDBox mb={3}>
                  <HorizontalBarChart
                    icon={{ color: "info", component: "bar_chart_sharpIcon" }}
                    title="קליטות אמל''ח - אמצעים טכנולוגיים"
                    // description="Sales related to age average"
                    chart={{
                      labels: ["תומכת החיים", "קשת", " מעיל רוח ", "חנית"],
                      datasets: [
                        {
                          label: "אמצעים טכנולוגיים",
                          color: "blue_light",
                          data: [
                            mashkTehDB.life_support,
                            mashkTehDB.bow,
                            mashkTehDB.windbreaker,
                            mashkTehDB.hanit,
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
                    icon={{ color: "info", component: "bar_chart_sharpIcon" }}
                    title=" קליטות אמל''ח -רוק''ק"
                    // description="Sales related to age average"
                    chart={{
                      labels: ["במות דמה", "במות קו אחורי", "עמדות רוק''ק  ", "הגנת מוצבים"],
                      datasets: [
                        {
                          label: "אחוז שחיקה",
                          color: "blue_dark",
                          data: [
                            mashkTehDB.dummy_platforms,
                            mashkTehDB.rear_line_platforms,
                            mashkTehDB.rock_pos,
                            mashkTehDB.outpost_defenses,
                          ],
                        },
                      ],
                    }}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </MDBox>
      {timeUpdate && (
        <MDTypography variant="h6" textGradient color="dark">
          עדכון אחרון:{timeUpdate.slice(0, 10)} {timeUpdate.slice(11, 16)}
        </MDTypography>
      )}
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <DashboardHeader /> */}
      {dashbord()}
      {addFile()}
      {editAlert()}
      <Outlet />
      <Footer />
    </DashboardLayout>
  );
};

export default mashkTeh;
