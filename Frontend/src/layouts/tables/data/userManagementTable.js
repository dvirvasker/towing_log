/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
import Switch from "@mui/material/Switch";
import { authenticate, isAuthenticated, signin, signout, updateRefreshCount } from "auth/index";
import axios from "axios";
import MDButton from "components/MDButton";
import MDProgress from "components/MDProgress";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  // const Project = ({ image, name }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" variant="rounded" />
  //     <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
  //       {name}
  //     </MDTypography>
  //   </MDBox>
  // );
  const params = useParams();
  const [isError, setIsError] = useState(false);
  const [requestDB, setRequestDB] = useState([]);
  const [isInfoPressed, setIsInfoPressed] = useState(false);
  const [pressedID, setpressedID] = useState("");
  const [changeRoleW, setChangeRoleW] = useState(false);

  const [user, setUser] = useState(isAuthenticated());
  const MINUTE_MS = 100000;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/usersLevel`)
      .then((response) => {
        // console.log(response.data);
        if (user.user.admin === "0") {
          setRequestDB(response.data);
        } else {
          setRequestDB(response.data.filter((u) => u.admin !== "0"));
        }
      })
      .catch((error) => {
        // console.log(error);
        setIsError(true);
      });
  }, []);

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const getWorkStuts = (value) => {
    let stutus = "נשלח";
    let color = "error";
    if (value === 25) {
      stutus = "בקשה נשלחה";
      color = "error";
    } else if (value === 50) {
      stutus = "התקבל במערכת";
      color = "mekatnar";
    } else if (value === 75) {
      stutus = "בהדפסה";
      color = "mekatnar";
    } else if (value === 100) {
      stutus = "מוכן לאיסוף";
      color = "success";
    } else if (value === 125) {
      stutus = "נאסף";
      color = "success";
    } else if (value === 150) {
      stutus = "העבודה נדחתה";
      color = "error";
    }
    return [stutus, color];
  };

  const handleChange = () => {
    // axios.post(`http://localhost:5000/TowingLogApi/updateApproved`, ).then((res) => {
    //   // toast.success(`הטופס נשלח בהצלחה`);
    //   // history.push(`/signin`);
    //   console.log(res.data);
    //   // setToraHeilitVolume(response.data.toraHeilitVolumes);
    // });
  };

  const setTypeUser = (admin) => {
    let typeName = "";
    let color = "mekatnar";
    if (admin === "0") {
      typeName = "מנהל מערכת";
      color = "mekatnar";
    } else if (admin === "1") {
      typeName = "משתמש רגיל";
      color = "info";
    } else if (admin === "2") {
      typeName = "משתמש כוח אדם";
      color = "primary";
    } else if (admin === "3") {
      typeName = "משתמש תא חיזוי";
      color = "primary";
    } else if (admin === "4") {
      typeName = "משתמש תא כשירות המסגרת";
      color = "primary";
    } else if (admin === "5") {
      typeName = "משתמש תא אחזקות בתעשייה";
      color = "primary";
    } else if (admin === "6") {
      typeName = "משתמש חלפים";
      color = "primary";
    } else if (admin === "7") {
      typeName = 'משתמש תא אמל"ח וטכנולגיות';
      color = "primary";
    } else if (admin === "8") {
      typeName = 'משתמש תא משקים מטכל"ים';
      color = "primary";
    }
    return [typeName, color];
  };
  const setTypeSourceHoli = (sourceHoli) => {
    let typeName = "";
    if (sourceHoli === "1") {
      typeName = 'אגד טנ"א ארצי';
    } else if (sourceHoli === "2") {
      typeName = 'חט"ל';
    } else if (sourceHoli === "3") {
      typeName = 'רפ"ט';
    } else if (sourceHoli === "4") {
      typeName = 'מש"א';
    } else if (sourceHoli === "5") {
      typeName = "תעשייה";
    }
    return typeName;
  };
  // const convertNum = (num) => {
  //   parseInt()
  // }

  const dbRows = requestDB.map((mangmentUser, index) => ({
    // fileID: mangmentUser._id,
    personalNumber: mangmentUser.personalnumber,
    firstName: mangmentUser.firstName,
    lastName: mangmentUser.lastName,
    userAprroved: (
      <MDBadge
        badgeContent={mangmentUser.approved ? "מאושר" : "לא מאושר"}
        variant="contained"
        container
        value={mangmentUser.approved}
        color={mangmentUser.approved ? "success" : "error"}
      />
    ),
    userType: (
      <MDBadge
        badgeContent={setTypeUser(mangmentUser.admin)[0]}
        color={setTypeUser(mangmentUser.admin)[1]}
        size="sm"
        container
      />
    ),
    editPower: (
      <Link to={`/authentication/admin/edituser/${mangmentUser._id}`} key={mangmentUser._id}>
        <MDButton variant="gradient" color="mekatnar" circular="true" iconOnly="true" size="medium">
          <Icon>edit</Icon>
        </MDButton>
      </Link>
    ),
  }));

  console.log(`isError ${isError}`);
  return {
    //* the tables headers
    columns: [
      { Header: "מספר אישי", accessor: "personalNumber", align: "center" },
      { Header: "שם פרטי", accessor: "firstName", align: "center" },
      { Header: "שם משפחה", accessor: "lastName", align: "center" },
      { Header: "סוג משתמש", accessor: "userType", align: "center" },
      { Header: "מאושר", accessor: "userAprroved", align: "center" },
      { Header: "", accessor: "editPower", align: "center" },
    ],

    rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,
    changeRoleW,
    setChangeRoleW,
    pressedID,
  };
}
