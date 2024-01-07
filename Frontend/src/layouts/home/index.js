/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
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
import { isAuthenticated } from "auth";
import axios from "axios";
import MDTypography from "components/MDTypography";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Projects from "layouts/dashboard/components/Projects";
// import HoliyotRequestsTable from "layouts/tables/holiyotRequestsTable";
// import HoliyotRequestsTableHomePage from "layouts/tables/holiyotRequestsTableHomePage";
import { useEffect, useState } from "react";

const { user } = isAuthenticated();

function HomePage(props) {
  const [dashboardData, setDashboardData] = useState([]);
  const [dashboardDataToday, setDashboardDataToday] = useState([]);
  const [pikodsDB, setPikodsDB] = useState([]);
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

  useEffect(async () => {
    console.log(user.personalnumber);
    let axiosStrDashboardData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/all`;
    // const axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/all`;
    let axiosStrDashboardTodayData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/Today/all`;

    if (user.admin === "0") {
      // על פי nfkuk ybt

      axiosStrDashboardData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/all`;
      //  axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/all`;
      axiosStrDashboardTodayData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/Today/all`;
    } else if (user.admin === "1") {
      // for here in army the last else if insted
      // על פי פיקוד
      axiosStrDashboardData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/pikod/${user.pikod}`;
      //  axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/all`;
      axiosStrDashboardTodayData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/Today/pikod/${user.pikod}`;
    } else if (user.admin === "2") {
      // על פי מסגרות טנא
      axiosStrDashboardData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/all`;
      //  axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/all`;
      axiosStrDashboardTodayData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/Today/all`;
    } else if (user.admin === "3" && props.userView === "sourceHoli_Home") {
      // על פי גוף משלח
      axiosStrDashboardData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/gofMeshaleh/${user.source_holi}`;
      //  axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/all`;
      axiosStrDashboardTodayData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/Today/gofMeshaleh/${user.source_holi}`;
    } else if (user.admin === "3" && props.userView === "sourceHoli_all") {
      // thats in the army because of user state
      // על פי פיקוד
      axiosStrDashboardData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/pikod/${user.source_holi}`;
      //  axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/all`;
      axiosStrDashboardTodayData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/Today/pikod/${user.source_holi}`;
    }

    axios
      .get(axiosStrDashboardData)
      .then((response) => {
        console.log(response.data);
        console.log("--------------------- DashboardData ---------------------");
        setDashboardData(response.data);
        console.log("--------------------------------------------------------------");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(axiosStrDashboardTodayData, { dateData: new Date().toISOString().split("T")[0] })
      .then((response) => {
        console.log("--------------------- DashboardDataToday ---------------------");
        console.log(response.data);
        setDashboardDataToday(response.data);
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
  }, []);

  useEffect(async () => {
    console.log(user.personalnumber);
    let axiosStrDashboardData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/all`;
    // const axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/all`;
    let axiosStrDashboardTodayData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/Today/all`;

    if (user.admin === "0") {
      // על פי nfkuk ybt

      axiosStrDashboardData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/all`;
      //  axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/all`;
      axiosStrDashboardTodayData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/Today/all`;
    } else if (user.admin === "1") {
      // for here in army the last else if insted
      // על פי פיקוד
      axiosStrDashboardData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/pikod/${user.pikod}`;
      //  axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/all`;
      axiosStrDashboardTodayData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/Today/pikod/${user.pikod}`;
    } else if (user.admin === "2") {
      // על פי מסגרות טנא
      axiosStrDashboardData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/all`;
      //  axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/all`;
      axiosStrDashboardTodayData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/Today/all`;
    } else if (user.admin === "3" && props.userView === "sourceHoli_Home") {
      // על פי גוף משלח
      axiosStrDashboardData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/gofMeshaleh/${user.source_holi}`;
      //  axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/all`;
      axiosStrDashboardTodayData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/Today/gofMeshaleh/${user.source_holi}`;
    } else if (user.admin === "3" && props.userView === "sourceHoli_all") {
      // thats in the army because of user state
      // על פי פיקוד
      axiosStrDashboardData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/pikod/${user.source_holi}`;
      //  axiosStrDashboardDateRangeData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/all`;
      axiosStrDashboardTodayData = `http://localhost:5000/TowingLogApi/HolyaReports/report/dashboardData/CountByStatus/Date/Today/pikod/${user.source_holi}`;
    }

    axios
      .get(axiosStrDashboardData)
      .then((response) => {
        console.log(response.data);
        console.log("--------------------- DashboardData ---------------------");
        setDashboardData(response.data);
        console.log("--------------------------------------------------------------");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(axiosStrDashboardTodayData, { dateData: new Date().toISOString().split("T")[0] })
      .then((response) => {
        console.log("--------------------- DashboardDataToday ---------------------");
        console.log(response.data);
        setDashboardDataToday(response.data);
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
  }, [props.userView]);

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

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <DashboardNavbar />
        <MDBox mb={4}>
          <MDTypography variant="h3" fontWeight="medium" textGradient color="mekatnar" mt={1}>
            {getHomePageTitle()}
          </MDTypography>
        </MDBox>

        {user.admin === "0" ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="info"
                  icon="watch_later"
                  title="בקשות שממתינות לאישור"
                  count={dashboardData.newRequest + dashboardData.aprrovedKshirotTne}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="done"
                  color="success"
                  title="בקשות שאושרו ביממה האחרונה"
                  count={dashboardDataToday.aprrovedMatcalTneToday}
                  percentage={{
                    color: "success",
                    label: `${new Date().toISOString().split("T")[0]}`,
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="error"
                  icon="clear"
                  title="בקשות שנדחו ביממה האחרונה"
                  count={dashboardDataToday.regectedToday}
                  percentage={{
                    color: "success",
                    label: `${new Date().toISOString().split("T")[0]}`,
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        ) : user.admin === "1" || (user.admin === "3" && props.userView === "sourceHoli_all") ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="menu_book"
                  title="בקשות פתוחות"
                  count={
                    dashboardData.newRequest +
                    dashboardData.aprrovedKshirotTne +
                    dashboardData.aprrovedMatcalTne +
                    dashboardData.inProsses +
                    dashboardData.needToBeFixed
                  }
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="pending_actions"
                  title="ממתין לאישור"
                  color="mekatnar"
                  count={dashboardData.newRequest + dashboardData.aprrovedKshirotTne}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="info"
                  icon="watch_later"
                  title="ממתין להשלמת נתונים"
                  count={dashboardData.needToBeFixed}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="error"
                  icon="clear"
                  title="נדחה"
                  count={dashboardData.regected}
                />
              </MDBox>
            </Grid>
          </Grid>
        ) : user.admin === "2" ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="info"
                  icon="watch_later"
                  title="בקשות שממתינות לאישור"
                  count={dashboardData.newRequest + dashboardData.aprrovedKshirotTne}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="done"
                  color="success"
                  title="בקשות שאושרו ביממה האחרונה"
                  count={dashboardDataToday.aprrovedKshirotTneToday}
                  percentage={{
                    color: "success",
                    label: `${new Date().toISOString().split("T")[0]}`,
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="error"
                  icon="clear"
                  title="בקשות שנדחו ביממה האחרונה"
                  count={dashboardDataToday.regectedToday}
                  percentage={{
                    color: "success",
                    label: `${new Date().toISOString().split("T")[0]}`,
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        ) : user.admin === "3" && props.userView === "sourceHoli_Home" ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="mekatnar"
                  icon="done"
                  title="בקשות אשר אושרו וטרם הסתיימו"
                  count={dashboardData.aprrovedMatcalTne + dashboardData.inProsses}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="watch_later"
                  color="warning"
                  title="בקשות בתהליך"
                  count={dashboardData.inProsses}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="sentiment_satisfied_alt"
                  title="בקשות שטיפולם הסתיים"
                  count={dashboardData.isFinished}
                />
              </MDBox>
            </Grid>
          </Grid>
        ) : null}
        {/* <MDBox mt={4.5}>
          {user.admin !== "3" || (user.admin === "3" && props.userView === "sourceHoli_all") ? (
            <HoliyotRequestsTableHomePage />
          ) : (
            <HoliyotRequestsTable />
          )}
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default HomePage;
