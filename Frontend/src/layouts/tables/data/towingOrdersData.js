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

export default function data(status, area) {
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
  const [originaldata, setOriginaldata] = useState([]);
  const [isInfoPressed, setIsInfoPressed] = useState(false);
  const [pressedID, setpressedID] = useState("");
  const [changeRoleW, setChangeRoleW] = useState(false);

  const [user, setUser] = useState(isAuthenticated());
  const MINUTE_MS = 100000;

  const options = {
    // weekday: 'long', // or 'short', 'narrow'
    year: "numeric",
    month: "numeric", // or 'short', 'narrow'
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: 'numeric',
    // timeZoneName: 'short', // or 'long'
  };

  const filteruse = () => {
    const beforfilter = originaldata;
    // console.log(beforfilter);
    let filter1 = [];

    if (status === "בחר" || status === undefined) {
      filter1 = beforfilter;
    } else if (status) {
      filter1 = beforfilter.filter((el) => el.status === status);
    }

    let filter2 = [];

    if (area === "בחר" || area === undefined) {
      filter2 = filter1;
    } else if (area) {
      filter2 = filter1.filter((el) => el.area === area);
    }

    // let filter3 = [];

    // if (visitWanted === "בחר" || visitWanted === undefined) {
    //   filter3 = filter2;
    // } else if (visitWanted === "true") {
    //   filter3 = filter2.filter((el) => el.visitWanted === true);
    // } else if (visitWanted === "false") {
    //   filter3 = filter2.filter((el) => el.visitWanted === false);
    // }

    // let filter4 = [];

    // if (dead === "בחר" || dead === undefined) {
    //   filter4 = filter3;
    // } else if (dead === "true") {
    //   filter4 = filter3.filter((el) => el.dead === true);
    // } else if (dead === "false") {
    //   filter4 = filter3.filter((el) => el.dead === false);
    // }

    // let filter5 = [];

    // if (statusre.status === "בחר" || statusre.status === undefined) {
    //   filter5 = filter4;
    // } else if (statusre.status === "5") {
    //   filter5 = filter4.filter((el) => el.status === 5);
    // } else if (statusre.status === "15") {
    //   filter5 = filter4.filter((el) => el.status === 15);
    // } else if (statusre.status === "25") {
    //   filter5 = filter4.filter((el) => el.status === 25);
    // } else if (statusre.status === "50") {
    //   filter5 = filter4.filter((el) => el.status === 50);
    // } else if (statusre.status === "75") {
    //   filter5 = filter4.filter((el) => el.status === 75);
    // } else if (statusre.status === "100") {
    //   filter5 = filter4.filter((el) => el.status === 100);
    // } else if (statusre.status === "888") {
    //   filter5 = filter4.filter((el) => el.status === 888);
    // } else if (statusre.status === "999") {
    //   filter5 = filter4.filter((el) => el.status === 999);
    // }

    // let filter6 = [];

    // if (typeclass.classReport === "בחר" || typeclass.classReport === undefined) {
    //   filter6 = filter5;
    // } else {
    //   filter6 = filter5.filter((el) => el.classReport === typeclass.classReport.id);
    // }

    setRequestDB(filter2);
  };

  useEffect(async () => {
    filteruse();
  }, [status, area]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/TowingOrder`)
      .then((response) => {
        console.log(response.data);
        // if (response.data !== null) {
        setRequestDB(response.data);
        setOriginaldata(response.data);
        // }
        // else {
        //   setRequestDB(response.data.filter((u) => u.admin !== "0"));
        // }
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

  const dbRows = requestDB.map((towingOrder, index) => ({
    // fileID: towingOrder._id,
    reference: towingOrder.reference,
    orderDate: new Date(towingOrder.orderDate)
      .toLocaleDateString(undefined, options)
      .split(", ")[0],
    carnumber: towingOrder.carnumber,
    location: towingOrder.location,
    garage: towingOrder.garage,
    executiveBody: towingOrder.executiveBody,
    demandDate: new Date(towingOrder.demandDate)
      .toLocaleDateString(undefined, options)
      .split(", ")[0],
    area: towingOrder.area,
    status: towingOrder.status,
    editPower: (
      <Link to={`/towingorders/${towingOrder._id}`} key={towingOrder._id}>
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
      { Header: "אסמכתא", accessor: "reference", align: "center" },
      { Header: "תאריך", accessor: "orderDate", align: "center" },
      { Header: "צ'", accessor: "carnumber", align: "center" },
      { Header: "סוג רכב נגרר", accessor: "editsPower", align: "center" },
      { Header: "מיקום", accessor: "location", align: "center" },
      { Header: "מוסך", accessor: "garage", align: "center" },
      { Header: "גוף מבצע", accessor: "executiveBody", align: "center" },
      { Header: "תאריך ביצוע מבוקש", accessor: "demandDate", align: "center" },
      { Header: "מרחב", accessor: "area", align: "center" },
      { Header: "סטטוס", accessor: "status", align: "center" },
      { Header: "עדכון", accessor: "editPower", align: "center" },
    ],

    rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,
    changeRoleW,
    setChangeRoleW,
    pressedID,
  };
}
