/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import { FormControl, FormGroup, Icon } from "@mui/material";
import { isAuthenticated } from "auth";
import axios from "axios";
import MDTypography from "components/MDTypography";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import VerticalBarChartStacked from "examples/Charts/BarCharts/VerticalBarChartStacked";
import PieChart from "examples/Charts/PieChart";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Projects from "layouts/dashboard/components/Projects";
// import HoliyotRequestsTableHomePage from "layouts/tables/holiyotRequestsTableHomePage";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Input } from "reactstrap";

const { user } = isAuthenticated();

function Dashboard() {
  // const [dashboardData, setDashboardData] = useState([]);
  const [dashboardDataDateRangeCounter, setDashboardDataDateRangeCounter] = useState([]);
  const [holiRequestDateRange, setHoliRequestDateRange] = useState([{}]);
  const [pikodsDB, setPikodsDB] = useState([]);
  const [classReportsDB, setClassReportsDB] = useState([]);

  const [dashboardEvgHour, setDashboardEvgHour] = useState([]);
  // const [dashboardEvgHourDate, setDashboardEvgHourDate] = useState([]);
  const [dashboardSourceHoliGrapData, setDashboardSourceHoliGrapData] = useState({
    dateArray: [],
    reports: [],
  });

  const [top7ClassReport, setTop7ClassReport] = useState([]);

  const holis = [
    {
      _id: "1",
      name: 'אגד טנ"א ארצי',
    },
    {
      _id: "2",
      name: 'חט"ל',
    },
    {
      _id: "3",
      name: 'רפ"ט',
    },
    {
      _id: "4",
      name: 'מש"א',
    },
    {
      _id: "5",
      name: "תעשייה",
    },
    {
      _id: "6",
      name: 'מקטנא"ר',
    },
    {
      _id: "7",
      name: 'בה"ד 20',
    },
  ];

  const [dateRange, setDataRange] = useState({
    startDate: new Date("2023-10-07T00:00:00.000Z").toISOString(),
    endDate: new Date().toISOString(),
  });

  const dataholi = (arrdate, arr, sourceholi) => {
    const arrdata = [];
    arrdate.forEach((date) => {
      let sum = 0;
      arr.forEach((report) => {
        if (report.createdAt.split("T")[0] === date) {
          if (report.source_holi === sourceholi) {
            sum += 1;
          }
        }
      });
      arrdata.push(sum);
    });
    return arrdata;
  };

  const dataCompare = (date1String, date2String) => {
    const date1 = new Date(date1String);
    const date2 = new Date(date2String);

    // (YYYY-MM-DD)
    if (date1.getTime() < date2.getTime()) {
      // date1 is lesser than date2
      return 1;
    }
    if (date1.getTime() > date2.getTime()) {
      // date1 is greater than date2
      return 2;
    }
    return 0;
    // both are equal
  };

  useMemo(async () => {
    console.log(user.personalnumber);
    const axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/range/all`;
    const axiosStrDashboardEvgHourDate = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByhour/Date/range/all`;
    const axiosStrDashboardSourceHoliGrap = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/Date/range/getAllReportsDateRangeApproved`;
    const axiosStrDashboardTop7ClassReport = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByClassReport/Date/range/pie`;

    axios
      .post(axiosStrDashboardDateRangeData, {
        fromDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then(async (response) => {
        console.log("--------------------- dashboardDataDateRangeCounter ---------------------");
        console.log(response.data);
        await setDashboardDataDateRangeCounter(response.data);
        console.log("--------------------------------------------------------------");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(axiosStrDashboardEvgHourDate, {
        fromDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then((response) => {
        console.log(response.data);
        console.log("--------------------- DashboardData ---------------------");
        setDashboardEvgHour(response.data);
        console.log("--------------------------------------------------------------");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(axiosStrDashboardSourceHoliGrap, {
        fromDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then((response) => {
        console.log(response.data);
        console.log("--------------------- DashboardData ---------------------");
        setDashboardSourceHoliGrapData(response.data);
        console.log("--------------------------------------------------------------");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(axiosStrDashboardTop7ClassReport, {
        fromDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then((response) => {
        console.log(response.data);
        console.log("--------------------- DashboardData ---------------------");
        setTop7ClassReport(response.data.topReport);
        console.log("--------------------------------------------------------------");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/Pikod/`)
      .then((response) => {
        setPikodsDB(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/Pikod/`)
      .then((response) => {
        setPikodsDB(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/SourceHoliClassType/`)
      .then((response) => {
        setClassReportsDB(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useMemo(async () => {
    console.log(user.personalnumber);
    const axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/range/all`;
    const axiosStrDashboardEvgHourDate = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByhour/Date/range/all`;
    const axiosStrDashboardSourceHoliGrap = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/Date/range/getAllReportsDateRangeApproved`;
    const axiosStrDashboardTop7ClassReport = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByClassReport/Date/range/pie`;

    axios
      .post(axiosStrDashboardDateRangeData, {
        fromDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then(async (response) => {
        console.log("--------------------- dashboardDataDateRangeCounter ---------------------");
        console.log(response.data);
        await setDashboardDataDateRangeCounter(response.data);
        console.log("--------------------------------------------------------------");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(axiosStrDashboardEvgHourDate, {
        fromDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then((response) => {
        console.log(response.data);
        console.log("--------------------- DashboardData ---------------------");
        setDashboardEvgHour(response.data);
        console.log("--------------------------------------------------------------");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(axiosStrDashboardSourceHoliGrap, {
        fromDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then((response) => {
        console.log(response.data);
        console.log("--------------------- DashboardData ---------------------");
        setDashboardSourceHoliGrapData(response.data);
        console.log("--------------------------------------------------------------");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(axiosStrDashboardTop7ClassReport, {
        fromDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then((response) => {
        console.log(response.data);
        console.log("--------------------- DashboardData ---------------------");
        setTop7ClassReport(response.data.topReport);
        console.log("--------------------------------------------------------------");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/Pikod/`)
      .then((response) => {
        setPikodsDB(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dateRange.startDate, dateRange.endDate]);

  const getname = (idnum, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id === idnum) return arr[i].name;
    }
    return "";
  };

  const getHomePageTitle = () => {
    let title = "";

    if (user.admin === "0") {
      title = 'עבור טנ"א מטכלי';
    } else if (user.admin === "1") {
      title = `עבור יחידה ${getname(user.pikod, pikodsDB)}`;
    } else if (user.admin === "2") {
      title = `עבור מסגרות טנא`;
    } else if (user.admin === "3") {
      title = `עבור יחידה ${getname(user.source_holi, holis)}`;
    }
    return title;
  };
  async function handleChangeDate(evt) {
    const { value } = evt.target;
    await setDataRange({ ...dateRange, [evt.target.name]: value });
    console.log(dateRange);
  }

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <DashboardNavbar />
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={4}>
              <MDTypography variant="h3" fontWeight="medium" textGradient color="mekatnar" mt={1}>
                {getHomePageTitle()}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="left" alignItems="left" spacing={3}>
          <Grid
            sx={{
              justifyContent: "left",
              alignContent: "left",
              textAlign: "left",
            }}
            item
            xs={12}
            md={12}
            lg={12}
            xl={12}
          >
            <MDBox
              variant="gradient"
              bgColor="mekatnar"
              borderRadius="lg"
              coloredShadow="mekatnar"
              mx={2}
              mt={-3}
              p={3}
              px={7}
              mb={3}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mb={2}>
                בחר טווח תאריכים
              </MDTypography>
              <FormControl sx={{ m: 0.5 }} variant="standard">
                <FormGroup row>
                  <FormGroup col sx={{ mx: 0.5 }} xs={0.5} md={0.5} lg={0.5}>
                    <Input
                      // placeholder={textPlaceHolderInputs[5]}
                      name="endDate"
                      type="date"
                      value={dateRange.endDate?.split("T")[0]}
                      onChange={handleChangeDate}
                    />
                  </FormGroup>
                  <Icon sx={{ color: "#FFFFFF" }} fontSize="large">
                    arrow_forward
                  </Icon>
                  <FormGroup col xs={2} md={2} lg={2}>
                    <Input
                      // placeholder={textPlaceHolderInputs[5]}
                      name="startDate"
                      type="date"
                      placeholder="dd-mm-yyyy"
                      value={dateRange.startDate?.split("T")[0]}
                      onChange={handleChangeDate}
                    />
                  </FormGroup>
                </FormGroup>
              </FormControl>
              {/* <FormGroup row>
                <MDButton
                  color="mekatnar"
                  size="large"
                  // onClick={clickSubmit}
                  className="btn-new-blue"
                  type="submit"
                  style={{ width: 150 }}
                >
                  הצג גרף
                  <Icon fontSize="small">upload</Icon>&nbsp;
                </MDButton>
              </FormGroup> */}
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="thumb_up_off_alt"
                title="בקשות חוליות אשר אושרו"
                count={dashboardDataDateRangeCounter.aprrovedMatcalTne}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="done"
                color="success"
                title="בקשות חוליות שטיפולן הסתיים"
                count={dashboardDataDateRangeCounter.isFinished}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="clear"
                title="בקשות חוליות בתהליך"
                count={dashboardDataDateRangeCounter.inProsses}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="mekatnar"
                icon="watch_later"
                title="זמן ממוצע לאישור בקשה(שעות)"
                count={dashboardEvgHour.evghoursmatcal}
              />
            </MDBox>
          </Grid>
        </Grid>

        <MDBox mt={4.5}>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={3}>
                  <VerticalBarChart
                    icon={{ color: "info", component: "local_shipping" }}
                    title="יחידות משלחות"
                    // description="Sales related to age average"
                    chart={{
                      labels: [
                        'מש"א',
                        'רפ"ט',
                        'חט"ל',
                        'אגד טנ"א ארצי',
                        "תעשייה",
                        'מקטנא"ר',
                        'בה"ד 20',
                      ],
                      datasets: [
                        {
                          label: "כמות",
                          color: "info",
                          data:
                            dashboardDataDateRangeCounter.sourceHoliData === undefined
                              ? [0, 0, 0, 0, 0]
                              : [
                                  dashboardDataDateRangeCounter.sourceHoliData.masha,
                                  dashboardDataDateRangeCounter.sourceHoliData.rapat,
                                  dashboardDataDateRangeCounter.sourceHoliData.hatal,
                                  dashboardDataDateRangeCounter.sourceHoliData.agad,
                                  dashboardDataDateRangeCounter.sourceHoliData.industry,
                                  dashboardDataDateRangeCounter.sourceHoliData.mekatnar,
                                  dashboardDataDateRangeCounter.sourceHoliData.bhd20,
                                ],
                        },
                      ],
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={3}>
                  <PieChart
                    icon={{ color: "warning", component: "school" }}
                    title="סוגי כיתות"
                    description="מוצגים רק 7 סוגי הכיתות, בעלות הביקוש הגדול ביותר בטווח תאריכים זה."
                    chart={{
                      labels:
                        top7ClassReport.length !== 0
                          ? top7ClassReport.map((r) => getname(r.id, classReportsDB))
                          : [],
                      datasets: {
                        label: "סוגי כיתות",
                        backgroundColors: [
                          "mekatnar",
                          "error",
                          "success",
                          "warning",
                          "info",
                          "secondary",
                          "dark",
                        ],
                        data:
                          top7ClassReport.length !== 0 ? top7ClassReport.map((r) => r.count) : [],
                      },
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <MDBox mb={3}>
                  <VerticalBarChartStacked
                    icon={{ color: "success", component: "leaderboard" }}
                    title="בקשות מאושרות לפי גופים משלחים"
                    chart={{
                      labels: dashboardSourceHoliGrapData.dateArray,

                      datasets: [
                        {
                          label: 'אגד טנ"א ארצי',
                          color: "success",
                          data: dataholi(
                            dashboardSourceHoliGrapData.dateArray,
                            dashboardSourceHoliGrapData.reports,
                            "1"
                          ),
                        },
                        {
                          label: 'חט"ל',
                          color: "warning",
                          data: dataholi(
                            dashboardSourceHoliGrapData.dateArray,
                            dashboardSourceHoliGrapData.reports,
                            "2"
                          ),
                        },
                        {
                          label: 'רפ"ט',
                          color: "secondary",
                          data: dataholi(
                            dashboardSourceHoliGrapData.dateArray,
                            dashboardSourceHoliGrapData.reports,
                            "3"
                          ),
                        },
                        {
                          label: 'מש"א',
                          color: "error",
                          data: dataholi(
                            dashboardSourceHoliGrapData.dateArray,
                            dashboardSourceHoliGrapData.reports,
                            "4"
                          ),
                        },
                        {
                          label: "תעשייה",
                          color: "info",
                          data: dataholi(
                            dashboardSourceHoliGrapData.dateArray,
                            dashboardSourceHoliGrapData.reports,
                            "5"
                          ),
                        },
                        {
                          label: 'מקטנא"ר',
                          color: "dark",
                          data: dataholi(
                            dashboardSourceHoliGrapData.dateArray,
                            dashboardSourceHoliGrapData.reports,
                            "6"
                          ),
                        },
                        {
                          label: 'בה"ד 20',
                          color: "primary",
                          data: dataholi(
                            dashboardSourceHoliGrapData.dateArray,
                            dashboardSourceHoliGrapData.reports,
                            "7"
                          ),
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
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
