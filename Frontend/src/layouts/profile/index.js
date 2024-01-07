/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
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
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProfilesList from "examples/Lists/ProfilesList";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import { HDate } from "@hebcal/core";
import { Dialog, DialogContent, Icon, Switch } from "@mui/material";
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import axios from "axios";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

function Overview(props) {
  const params = useParams();

  // const [reportData, setReportData] = useState({});
  const [profileData, setProfileData] = useState([]);
  const [profileHeaderData, setProfileHeaderData] = useState([
    { label: "שם פרטי", value: "" },
    { label: "שם משפחה", value: "" },
    { label: "דרגה", value: "" },
    { label: "מספר אישי", value: "" },
    { label: "מספר תז", value: "" },
  ]);

  // const [ranks, setRanks] = useState([]);
  // const [familyStatus, setFamilyStatus] = useState([]);
  // const [forces, setForces] = useState([]);
  // const [typeService, setTypeService] = useState([]);
  // const [professions, setProfession] = useState([]);
  // const [minoritys, setMinority] = useState([]);
  // const [mainFall, setMainFall] = useState([]);
  // const [cemeterys, setCemetery] = useState([]);

  // const [pikods, setPikods] = useState([]);
  // const [ogdas, setOgdas] = useState([]);
  // const [hativas, setHativas] = useState([]);
  // const [gdods, setGdods] = useState([]);

  const [data, setData] = useState({
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });

  function setProfile(d) {
    setProfileHeaderData([
      { label: "שם פרטי", value: d.name },
      { label: "שם משפחה", value: d.lastname },
      { label: "דרגה", value: d.rank },
      { label: "מספר אישי", value: d.personalnumber },
      { label: "מספר תז", value: d.idnum },
    ]);
    setProfileData([
      // { label: "שם פרטי", value: reportData.name },
      // { label: "שם משפחה", value: reportData.lastname },
      // { label: "דרגה", value: reportData.rank },
      // { label: "מספר אישי", value: reportData.personalnumber },
      // { label: "מספר תז", value: reportData.idnum },

      { label: "תאריך לידה", value: d.date_born },
      { label: "ארץ לידה", value: d.country_born },

      { label: "מצב משפחתי", value: d.family_status },
      { label: 'מספר תיק במשהב"ט הורים', value: d.number_case_perants },
      { label: 'מספר תיק במשהב"ט אלמן/ה', value: d.number_case_widower },
      { label: 'מוכר למשהב"ט', value: d.familiar },

      { label: "פיקוד", value: d.pikod },
      { label: "אוגדה", value: d.ogda },
      { label: "חטיבה", value: d.hativa },
      { label: "גדוד", value: d.gdod },

      { label: 'פיקוד לפי קש"ק', value: d.pikod_kashak },
      { label: 'אוגדה לפי קש"ק', value: d.ogda_kashak },
      { label: 'חטיבה לפי קש"ק', value: d.hativa_kashak },
      { label: 'גדוד לפי קש"ק', value: d.gdod_kashak },

      { label: "חיל משנה", value: d.force },

      { label: "סוג שירות", value: d.type_service },
      { label: "מקצוע צבאי", value: d.military_profession },

      { label: "סוג מיעוטים", value: d.type_minority },

      { label: "שכול מרובה", value: d.bereavement },

      { label: "תאריך פטירה", value: d.date_death },
      { label: "תאריך פטירה עברי", value: d.date_death },

      { label: "נסיבות נפילה ראשי", value: d.what_happend },
      { label: "תיאור הנפילה", value: d.Description_death },
      { label: "מקום הנפילה", value: d.place_death },

      { label: "בית עלמין", value: d.cemetery },
      { label: "חלקה", value: d.plot },
      { label: "שורה", value: d.row },
      { label: "קבר", value: d.grave },
    ]);
  }
  const getname = (idnum, arr) => {
    // console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id === idnum) return arr[i].name;
      // console.log(`arr[i]._id: ${arr[i]._id}  arr[i].name:${arr[i].name} idnum: ${idnum}`);
    }
    return "";
  };

  useEffect(() => {
    const classReportTemp = "";
    let ranksUseEffect = [];
    let familyStatusUseEffect = [];
    let forcesUseEffect = [];
    let typeServiceUseEffect = [];
    let professionsUseEffect = [];
    let minoritysUseEffect = [];
    let mainFallUseEffect = [];
    let cemeterysUseEffect = [];

    let pikodsUseEffect = [];
    let ogdasUseEffect = [];
    let hativasUseEffect = [];
    let gdodsUseEffect = [];

    axios
      .get(`http://localhost:5000/TowingLogApi/ranks/`)
      .then((response) => {
        // setRanks(response.data);
        ranksUseEffect = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/familystatus`)
      .then((response) => {
        // setFamilyStatus(response.data);
        familyStatusUseEffect = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/forces`)
      .then((response) => {
        // setForces(response.data);
        forcesUseEffect = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/servicetypes`)
      .then((response) => {
        // setTypeService(response.data);
        typeServiceUseEffect = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/professions`)
      .then((response) => {
        // setProfession(response.data);
        professionsUseEffect = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/minoritys`)
      .then((response) => {
        // setMinority(response.data);
        minoritysUseEffect = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/mainfalls`)
      .then((response) => {
        // setMainFall(response.data);
        mainFallUseEffect = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/cemetery`)
      .then((response) => {
        // setCemetery(response.data);
        cemeterysUseEffect = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/Pikod/pikod`)
      .then((response) => {
        // setPikods(response.data);
        pikodsUseEffect = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/Ogda/ogda`)
      .then((response) => {
        // setOgdas(response.data);
        ogdasUseEffect = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/Hativa/hativa`)
      .then((response) => {
        // setHativas(response.data);
        hativasUseEffect = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/Gdod/gdod`)
      .then((response) => {
        // setGdods(response.data);
        gdodsUseEffect = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/halals/${params.id}`)
      .then((response) => {
        // setReportData(response.data);
        setProfile(response.data);
        if (response.data.date_death_heb != "") {
          // const inputDate = new Date(response.data.date_death_heb);
          // const hebcalDate = new HDate(inputDate);
          // // console.log(hebcalDate.renderGematriya());
          // const hebrewDate = hebcalDate.renderGematriya();
          // console.log(hebrewDate);

          setProfileHeaderData([
            { label: "שם פרטי", value: response.data.name },
            { label: "שם משפחה", value: response.data.lastname },
            // { label: "דרגה", value: response.data.rank },
            { label: "דרגה", value: getname(response.data.rank, ranksUseEffect) },
            { label: "מספר אישי", value: response.data.personalnumber },
            { label: "מספר תז", value: response.data.idnum },
          ]);
          setProfileData([
            // { label: "שם פרטי", value: reportData.name },
            // { label: "שם משפחה", value: reportData.lastname },
            // { label: "דרגה", value: reportData.rank },
            // { label: "מספר אישי", value: reportData.personalnumber },
            // { label: "מספר תז", value: reportData.idnum },

            { label: "תאריך לידה", value: response.data.date_born },
            { label: "ארץ לידה", value: response.data.country_born },

            {
              label: "מצב משפחתי",
              value: getname(response.data.family_status, familyStatusUseEffect),
            },
            { label: 'מספר תיק במשהב"ט הורים', value: response.data.number_case_perants },
            { label: 'מספר תיק במשהב"ט אלמן/ה', value: response.data.number_case_widower },
            { label: 'מוכר למשהב"ט', value: response.data.familiar },

            { label: "פיקוד", value: getname(response.data.pikod, pikodsUseEffect) },
            { label: "אוגדה", value: getname(response.data.ogda, ogdasUseEffect) },
            { label: "חטיבה", value: getname(response.data.hativa, hativasUseEffect) },
            { label: "גדוד", value: getname(response.data.gdod, gdodsUseEffect) },

            {
              label: 'פיקוד לפי קש"ק',
              value: getname(response.data.pikod_kashak, pikodsUseEffect),
            },
            { label: 'אוגדה לפי קש"ק', value: getname(response.data.ogda_kashak, ogdasUseEffect) },
            {
              label: 'חטיבה לפי קש"ק',
              value: getname(response.data.hativa_kashak, hativasUseEffect),
            },
            { label: 'גדוד לפי קש"ק', value: getname(response.data.gdod_kashak, gdodsUseEffect) },

            { label: "חיל משנה", value: getname(response.data.force, forcesUseEffect) },

            {
              label: "סוג שירות",
              value: getname(response.data.type_service, typeServiceUseEffect),
            },
            {
              label: "מקצוע צבאי",
              value: getname(response.data.military_profession, professionsUseEffect),
            },

            {
              label: "סוג מיעוטים",
              value: getname(response.data.type_minority, minoritysUseEffect),
            },

            { label: "שכול מרובה", value: response.data.bereavement },

            { label: "תאריך פטירה", value: response.data.date_death },
            { label: "תאריך פטירה עברי", value: response.data.date_death },

            {
              label: "נסיבות נפילה ראשי",
              value: getname(response.data.what_happend, mainFallUseEffect),
            },
            { label: "תיאור הנפילה", value: response.data.Description_death },
            { label: "מקום הנפילה", value: response.data.place_death },

            { label: "בית עלמין", value: getname(response.data.cemetery, cemeterysUseEffect) },
            { label: "חלקה", value: response.data.plot },
            { label: "שורה", value: response.data.row },
            { label: "קבר", value: response.data.grave },
          ]);
        }
      })
      .catch((error) => {
        setData({
          ...data,
          error: true,
          loading: false,
          NavigateToReferrer: false,
        });
      });
  }, []);

  const NavigateUser = () => {
    if (data.NavigateToReferrer) {
      Navigate(-1);
      // return <Navigate to="/HomePage" />;
      // window.location.href = window.location.href;
    }
  };

  const handleCloseLoadingModal = () => {
    setData({ ...data, loading: false });
  };
  const handleCloseErrorModal = () => {
    setData({
      ...data,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };

  const showError = () => (
    <Dialog
      open={data.error}
      onClose={handleCloseErrorModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="error"
        coloredShadow="error"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          שגיאה בשליחת הבקשה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showLoading = () => (
    <Dialog
      open={data.loading}
      onClose={handleCloseLoadingModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        px={5}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          בטעינה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            שליחת הטופס תיקח מספר רגעים...
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
        <MDBox mt={0.5}>
          <Switch color="error" checked={props.isEditMode} onChange={props.handleEditModeClick} />
        </MDBox>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="body1" fontWeight="regular" color="text">
            מצב עריכה
          </MDTypography>
        </MDBox>
      </MDBox>
      <Header profileHeader={profileHeaderData}>
        {/* <MDButton
          onClick={props.handleEditModeClick}
          variant="gradient"
          color="mekatnar"
          circular="true"
          iconOnly="true"
          size="medium"
        >
          <Icon>edit</Icon>
        </MDButton> */}
        {/* <MDBox mt={5} mb={3}> */}
        <MDBox mt={1} mb={1}>
          <Grid container spacing={1}>
            {/* <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid> */}
            <Grid item xs={12} md={12} xl={12} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title={props.profileTitle}
                description={props.profileDescription}
                info={profileData}
                social={[]}
                action={{}}
                shadow={false}
              />
              {/* <Divider orientation="vertical" sx={{ mx: 0 }} /> */}
            </Grid>
            {/* <Grid item xs={12} xl={4}>
              <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
            </Grid> */}
          </Grid>
        </MDBox>
        {/* <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "mekatnar",
                  label: "view project",
                }}
                authors={[
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "mekatnar",
                  label: "view project",
                }}
                authors={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "mekatnar",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox> */}
      </Header>
      {/* <MDBox pt={1} pb={3}>
        <CasualtiesFamilyTable halalID={params.id} viewType="Halal" />
      </MDBox> */}
      {showError()}
      {showLoading()}
      {/* {NavigateUser()} */}
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
