/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/self-closing-comp */
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

// eslint-disable-next-line import/no-unresolved
import Img3 from "assets/images/unitsimg/pikudmerkaz.png";
import Img2 from "assets/images/unitsimg/pikudtzafon.png";
import MDButton from "components/MDButton";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import SimpleInfoCard from "examples/Cards/InfoCards/SimpleInfoCard";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import VerticalBarChartStacked from "examples/Charts/BarCharts/VerticalBarChartStacked";
// import DashboardHeader from "../components/DashboardHeader";
import DamagedtoolsForm from "layouts/Forms/damagedtools/damagedtoolsForm";
import DamagedtoolsFormDB from "layouts/Forms/damagedtools/damagedtoolsFormDB";

const damagedtoolsDashbord = () => {
  const [toAddFile, setToAddFile] = useState(false);
  const [num, setNum] = useState("");
  const { user } = isAuthenticated();

  const [update, setUpdate] = useState();
  const [damagedtool, setDamagedtool] = useState([]);

  const [alltrained, setAlltrained] = useState(0);
  const [alltreatment, setAlltreatment] = useState(0);
  const [allshutdown, setAllshutdown] = useState(0);
  const [allrescue, setAllrescue] = useState(0);

  const [untiltank, setUntiltank] = useState(0);
  const [untilmalar, setUntilmalar] = useState(0);
  const [untilnamer, setUntilnamer] = useState(0);
  const [untildahfor, setUntildahfor] = useState(0);
  const [untilhasz, setUntilhasz] = useState(0);
  const [untiltrained, setUntiltrained] = useState(0);

  const [fromtank, setFromtank] = useState(0);
  const [frommalar, setFrommalar] = useState(0);
  const [fromnamer, setFromnamer] = useState(0);
  const [fromdahfor, setFromdahfor] = useState(0);
  const [fromhasz, setFromhasz] = useState(0);
  const [fromtrained, setFromtrained] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/damagedtools/`)
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
        .get(`http://localhost:5000/TowingLogApi/damagedtools/`)
        .then((response) => {
          console.log(response.data.length);
          setDamagedtool(response.data[0]);
          setAlltrained(
            response.data[0].c4_trained +
              response.data[0].c3_trained +
              response.data[0].malar_trained +
              response.data[0].namer_trained +
              response.data[0].zma_trained +
              response.data[0].hasz_trained +
              response.data[0].nagmash_trained
          );
          setAlltreatment(
            response.data[0].c4_treatment +
              response.data[0].c3_treatment +
              response.data[0].malar_treatment +
              response.data[0].namer_treatment +
              response.data[0].zma_treatment +
              response.data[0].hasz_treatment +
              response.data[0].nagmash_treatment
          );
          setAllshutdown(
            response.data[0].c4_shutdown +
              response.data[0].c3_shutdown +
              response.data[0].malar_shutdown +
              response.data[0].namer_shutdown +
              response.data[0].zma_shutdown +
              response.data[0].hasz_shutdown +
              response.data[0].nagmash_shutdown
          );
          setAllrescue(
            response.data[0].c4_rescue +
              response.data[0].c3_rescue +
              response.data[0].malar_rescue +
              response.data[0].namer_rescue +
              response.data[0].zma_rescue +
              response.data[0].hasz_rescue +
              response.data[0].nagmash_rescue
          );
          setUntiltank(
            response.data[0].until_timron_tank_trained + response.data[0].until_timron_tank_left
          );
          setUntilmalar(
            response.data[0].until_timron_malar_trained + response.data[0].until_timron_malar_left
          );
          setUntilnamer(
            response.data[0].until_timron_namer_trained + response.data[0].until_timron_namer_left
          );
          setUntildahfor(
            response.data[0].until_timron_dahfor_trained + response.data[0].until_timron_dahfor_left
          );
          setUntilhasz(
            response.data[0].until_timron_hasz_trained + response.data[0].until_timron_hasz_left
          );
          setUntiltrained(
            response.data[0].until_timron_tank_trained +
              response.data[0].until_timron_malar_trained +
              response.data[0].until_timron_namer_trained +
              response.data[0].until_timron_dahfor_trained +
              response.data[0].until_timron_hasz_trained
          );
          setFromtank(
            response.data[0].from_timron_tank_trained + response.data[0].from_timron_tank_left
          );
          setFrommalar(
            response.data[0].from_timron_malar_trained + response.data[0].from_timron_malar_left
          );
          setFromnamer(
            response.data[0].from_timron_namer_trained + response.data[0].from_timron_namer_left
          );
          setFromdahfor(
            response.data[0].from_timron_dahfor_trained + response.data[0].from_timron_dahfor_left
          );
          setFromhasz(
            response.data[0].from_timron_hasz_trained + response.data[0].from_timron_hasz_left
          );
          setFromtrained(
            response.data[0].from_timron_tank_trained +
              response.data[0].from_timron_malar_trained +
              response.data[0].from_timron_namer_trained +
              response.data[0].from_timron_dahfor_trained +
              response.data[0].from_timron_hasz_trained
          );
          setUpdate(response.data[0].updatedAt);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [num]);

  const ksirotColor = (trained, tank, malar, namer, dahfor, hasz) => {
    let sum = (trained * 100) / (tank + malar + namer + dahfor + hasz);
    let color = "";
    if (sum >= 0 && sum <= 59) {
      color = "#D80032";
    } else if (sum >= 60 && sum <= 79) {
      color = "#FFE382";
    } else if (sum >= 80 && sum <= 100) {
      color = "#65B741";
    }
    return color;
  };

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
        <DialogContent>{num > 0 ? <DamagedtoolsFormDB /> : <DamagedtoolsForm />}</DialogContent>
      </MDBox>
    </Dialog>
  );
  const dashbord = () => (
    <MDBox py={1.5}>
      {/* <MDBox bgColor="mekatnar" opacity={0.95} borderRadius="lg" mb={5}> */}
      <MDBox bgColor="light" borderRadius="lg" variant="gradient" pb={1} mb={5} mt={5}>
        <Grid container sx={{ justifyContent: "space-evenly" }} spacing={2}>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <SimpleInfoCard
                // icon="account_balance"
                title="סך כלים פגועים (מצטבר)"
                // description="Belong Interactive"
                value={alltrained + alltreatment + allshutdown + allrescue}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <SimpleInfoCard
                // icon="account_balance"
                title="מתוכם הוכשרו"
                // description="Belong Interactive"
                value={alltrained}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <SimpleInfoCard
                // icon="account_balance"
                title="בטיפול"
                // description="Belong Interactive"
                value={alltreatment}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <SimpleInfoCard
                // icon="account_balance"
                title="הושבתו"
                // description="Belong Interactive"
                value={allshutdown}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MDBox mb={1.5}>
              <SimpleInfoCard
                // icon="account_balance"
                title="נדרש חילוץ"
                // description="Belong Interactive"
                value={allrescue}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Grid container sx={{ justifyContent: "space-evenly" }} spacing={2}>
        <Grid item xs={12} md={4} lg={2}>
          <MDBox mb={1.5} color="white" style={{ paddingTop: "0px" }}>
            <SimpleInfoCard
              py={14.5}
              // icon="account_balance"
              title="הוכשרו מכלים שנפגעו"
              // description="Belong Interactive"
              value={
                <>
                  <Row>
                    <Col>
                      <h1
                        style={{
                          color: ksirotColor(
                            untiltrained,
                            untiltank,
                            untilmalar,
                            untilnamer,
                            untildahfor,
                            untilhasz
                          ),
                        }}
                      >
                        {(
                          (untiltrained * 100) /
                          (untiltank + untilmalar + untilnamer + untildahfor + untilhasz)
                        ).toFixed(0)}
                        %
                      </h1>
                    </Col>
                    <Col style={{ paddingTop: "10px" }}>
                      <h3>
                        {untiltrained}/
                        {untiltank + untilmalar + untilnamer + untildahfor + untilhasz}
                      </h3>
                    </Col>
                  </Row>
                </>
              }
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <MDBox mb={3}>
            <VerticalBarChartStacked
              icon={{ color: "mekatnar", component: "leaderboard" }}
              title="עד תמרון"
              chart={{
                labels: ["טנקים", 'מלא"ר/גינס', "נמר", "דחפור", 'חס"צ'],

                datasets: [
                  {
                    label: "נותרו",
                    color: "blue_dark",
                    data: [
                      damagedtool.until_timron_tank_left,
                      damagedtool.until_timron_malar_left,
                      damagedtool.until_timron_namer_left,
                      damagedtool.until_timron_dahfor_left,
                      damagedtool.until_timron_hasz_left,
                    ],
                  },
                  {
                    label: "הוכשרו",
                    color: "blue_light",
                    data: [
                      damagedtool.until_timron_tank_trained,
                      damagedtool.until_timron_malar_trained,
                      damagedtool.until_timron_namer_trained,
                      damagedtool.until_timron_dahfor_trained,
                      damagedtool.until_timron_hasz_trained,
                    ],
                    // data: [172, 282, 90, 121, 379],
                  },
                ],
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={4} lg={2}>
          <MDBox mb={1.5} style={{ paddingTop: "0px" }}>
            <SimpleInfoCard
              py={14.5}
              // icon="account_balance"
              title="הוכשרו מכלים שנפגעו"
              // description="Belong Interactive"
              value={
                <>
                  <Row>
                    <Col>
                      <h1
                        style={{
                          color: ksirotColor(
                            fromtrained,
                            fromtank,
                            frommalar,
                            fromnamer,
                            fromdahfor,
                            fromhasz
                          ),
                        }}
                      >
                        {(
                          (fromtrained * 100) /
                          (fromtank + frommalar + fromnamer + fromdahfor + fromhasz)
                        ).toFixed(0)}
                        %
                      </h1>
                    </Col>
                    <Col style={{ paddingTop: "10px" }}>
                      <h3>
                        {fromtrained}/{fromtank + frommalar + fromnamer + fromdahfor + fromhasz}
                      </h3>
                    </Col>
                  </Row>
                </>
              }
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <MDBox mb={3}>
            <VerticalBarChartStacked
              icon={{ color: "mekatnar", component: "leaderboard" }}
              title="מתחילת התמרון"
              chart={{
                labels: ["טנקים", 'מלא"ר/גינס', "נמר", "דחפור", 'חס"צ'],

                datasets: [
                  {
                    label: "נותרו",
                    color: "blue_dark",
                    data: [
                      damagedtool.from_timron_tank_left,
                      damagedtool.from_timron_malar_left,
                      damagedtool.from_timron_namer_left,
                      damagedtool.from_timron_dahfor_left,
                      damagedtool.from_timron_hasz_left,
                    ],
                  },
                  {
                    label: "הוכשרו",
                    color: "blue_light",
                    data: [
                      damagedtool.from_timron_tank_trained,
                      damagedtool.from_timron_malar_trained,
                      damagedtool.from_timron_namer_trained,
                      damagedtool.from_timron_dahfor_trained,
                      damagedtool.from_timron_hasz_trained,
                    ],
                    // data: [172, 282, 90, 121, 379],
                  },
                ],
              }}
            />
          </MDBox>
        </Grid>
        <Grid container sx={{ justifyContent: "space-evenly" }} spacing={2} mt={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <VerticalBarChartStacked
                icon={{ color: "mekatnar", component: "leaderboard" }}
                title='לפי סוג רק"ם'
                chart={{
                  labels: ["טנקים", 'מלא"ר/גינס', "נמר", "דחפור", 'חס"צ'],

                  datasets: [
                    {
                      label: "תוקן",
                      color: "blue_dark",
                      data: [
                        damagedtool.tank_fix,
                        damagedtool.malar_fix,
                        damagedtool.namer_fix,
                        damagedtool.dahfor_fix,
                        damagedtool.hasz_fix,
                      ],
                    },
                    {
                      label: "עד שבועיים",
                      color: "blue_light",
                      data: [
                        damagedtool.tank_till_weeks,
                        damagedtool.malar_till_weeks,
                        damagedtool.namer_till_weeks,
                        damagedtool.dahfor_till_weeks,
                        damagedtool.hasz_till_weeks,
                      ],
                    },
                    {
                      label: "עד חודש",
                      color: "blue_5",
                      data: [
                        damagedtool.tank_till_month,
                        damagedtool.malar_till_month,
                        damagedtool.namer_till_month,
                        damagedtool.dahfor_till_month,
                        damagedtool.hasz_till_month,
                      ],
                    },
                    {
                      label: "מעל חודש",
                      color: "blue_4",
                      data: [
                        damagedtool.tank_up_month,
                        damagedtool.malar_up_month,
                        damagedtool.namer_up_month,
                        damagedtool.dahfor_up_month,
                        damagedtool.hasz_up_month,
                      ],
                    },
                    {
                      label: "תיקון ארוך",
                      color: "blue_sky",
                      data: [
                        damagedtool.tank_long_fix,
                        damagedtool.malar_long_fix,
                        damagedtool.namer_long_fix,
                        damagedtool.dahfor_long_fix,
                        damagedtool.hasz_long_fix,
                      ],
                    },
                  ],
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <VerticalBarChartStacked
                icon={{ color: "mekatnar", component: "leaderboard" }}
                title='לפי מיקום הרק"ם'
                chart={{
                  labels: ["במרחב הפיקוד", "אגד", 'מש"א', "קסרפילר"],

                  datasets: [
                    {
                      label: "תוקן",
                      color: "blue_dark",
                      data: [
                        damagedtool.pikod_fix,
                        damagedtool.egad_fix,
                        damagedtool.masha_fix,
                        damagedtool.katrapiler_fix,
                      ],
                    },
                    {
                      label: "עד שבועיים",
                      color: "blue_light",
                      data: [
                        damagedtool.pikod_till_weeks,
                        damagedtool.egad_till_weeks,
                        damagedtool.masha_till_weeks,
                        damagedtool.katrapiler_till_weeks,
                      ],
                    },
                    {
                      label: "עד חודש",
                      color: "blue_5",
                      data: [
                        damagedtool.pikod_till_month,
                        damagedtool.egad_till_month,
                        damagedtool.masha_till_month,
                        damagedtool.katrapiler_till_month,
                      ],
                    },
                    {
                      label: "מעל חודש",
                      color: "blue_4",
                      data: [
                        damagedtool.pikod_up_month,
                        damagedtool.egad_up_month,
                        damagedtool.masha_up_month,
                        damagedtool.katrapiler_up_month,
                      ],
                    },
                    {
                      label: "תיקון ארוך",
                      color: "blue_sky",
                      data: [
                        damagedtool.pikod_long_fix,
                        damagedtool.egad_long_fix,
                        damagedtool.masha_long_fix,
                        damagedtool.katrapiler_long_fix,
                      ],
                    },
                  ],
                }}
              />
            </MDBox>
          </Grid>
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
      {(user.admin === "0" || user.admin === "4") && (
        <MDButton variant="gradient" onClick={() => setToAddFile(true)} color="mekatnar" iconOnly>
          <Icon>edit</Icon>
        </MDButton>
      )}
      {/* <DashboardHeader /> */}
      {dashbord()}
      {addFile()}
      <Outlet />
      <Footer />
    </DashboardLayout>
  );
};

export default damagedtoolsDashbord;
