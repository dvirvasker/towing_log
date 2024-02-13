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
// import Switch from "@mui/material/Switch";
// import { authenticate, isAuthenticated, signin, signout, updateRefreshCount } from "auth/index";
import axios from "axios";
import MDButton from "components/MDButton";
import MDProgress from "components/MDProgress";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
// import TowingOrderFormDB from "layouts/Forms/towingOrder/towingOrderFormDB";
// import { element } from "prop-types";

export default function data(
  typeTable,
  urlType,
  currentDate,
  statuses,
  area,
  fromDate,
  toDate,
  erorrInfo,
  fromOrderDate,
  toOrderDate,
  carsList,
  isCarFiltered,
  garage,
  executiveBody,
  activateEditFile
) {
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
  const [carTypesData, setCarTypesData] = useState([]);
  const [carDatas, setCarDatas] = useState([]);
  const [garagesData, setGaragesData] = useState([]);
  const [isInfoPressed, setIsInfoPressed] = useState(false);
  // const [pressedID, setpressedID] = useState("");
  // const [changeRoleW, setChangeRoleW] = useState(false);
  const [toEditFile, setToEditFile] = useState(false);

  // const [user, setUser] = useState(isAuthenticated());
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

  const doShare = (arr1, arr2) => {
    let res = false;
    arr1.forEach((el1) => {
      if (arr2.includes(el1)) {
        res = true;
      }
    });
    return res;
  };
  const filteruse = () => {
    const beforfilter = originaldata;
    // console.log(beforfilter);
    let filter1 = [];

    if (statuses.length === 0) {
      filter1 = beforfilter;
    } else if (statuses) {
      filter1 = beforfilter.filter((el) => statuses.includes(el.status));
    }

    let filter2 = [];

    if (area === "בחר" || area === undefined) {
      filter2 = filter1;
    } else if (area) {
      filter2 = filter1.filter((el) => el.area === area);
    }

    let filter3 = [];
    if (fromDate && toDate) {
      filter3 = filter2.filter(
        (el) =>
          new Date(el.demandDate).setHours(0, 0, 0, 0) >= new Date(fromDate).setHours(0, 0, 0, 0) &&
          new Date(el.demandDate).setHours(0, 0, 0, 0) <= new Date(toDate).setHours(0, 0, 0, 0)
      );
    } else {
      filter3 = filter2;
    }

    const filter4 =
      erorrInfo.length === 0
        ? filter3
        : filter3.filter((order) => doShare(order.erorrInfo, erorrInfo));
    const carsNumberList = carsList.map((carInfo) => carInfo.carnumber);
    const filter5 = !isCarFiltered
      ? filter4
      : filter4.filter((order) => carsNumberList.includes(order.carnumber));

    let filter6 = [];

    if (garage === "בחר" || garage === undefined) {
      filter6 = filter5;
    } else if (garage) {
      filter6 = filter5.filter((el) => el.garage === garage);
    }

    let filter7 = [];

    if (executiveBody === "בחר" || executiveBody === undefined) {
      filter7 = filter6;
    } else if (executiveBody) {
      filter7 = filter6.filter((el) => el.executiveBody === executiveBody);
    }
    // console.log(orderDate);
    let filter8 = [];
    if (fromOrderDate || toOrderDate) {
      filter8 = filter7.filter(
        (el) =>
          new Date(el.orderDate).setHours(0, 0, 0, 0) >=
            new Date(fromOrderDate).setHours(0, 0, 0, 0) &&
          new Date(el.orderDate).setHours(0, 0, 0, 0) <= new Date(toOrderDate).setHours(0, 0, 0, 0)
      );
    } else {
      filter8 = filter7;
    }
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

    setRequestDB(filter8);
  };

  useEffect(async () => {
    filteruse();
  }, [
    statuses,
    area,
    fromDate,
    toDate,
    toOrderDate,
    erorrInfo,
    carsList,
    isCarFiltered,
    garage,
    executiveBody,
  ]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/TowingOrder`)
      .then((response) => {
        // console.log(response.data);
        if (urlType === "landing") {
          setRequestDB(
            response.data.filter(
              (elOrder) =>
                elOrder.demandDate.split("T")[0] === currentDate.toISOString().split("T")[0] &&
                (elOrder.status === "פתוח" || elOrder.status === "ממתין לאישור")
            )
          );
          setOriginaldata(
            response.data.filter(
              (elOrder) =>
                elOrder.demandDate.split("T")[0] === currentDate.toISOString().split("T")[0] &&
                (elOrder.status === "פתוח" || elOrder.status === "ממתין לאישור")
            )
          );
        } else if (urlType === "towingorders") {
          setRequestDB(response.data);
          setOriginaldata(response.data);
          // console.log(response.data);
        }
        // if (response.data !== null) {

        // }
        // else {
        //   setRequestDB(response.data.filter((u) => u.admin !== "0"));
        // }
      })
      .catch((error) => {
        // console.log(error);
        setIsError(true);
      });
  }, [typeTable]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/Garages`)
      .then((response) => {
        setGaragesData(response.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/CarTypes`)
      .then((response) => {
        setCarTypesData(response.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/CarDatas`)
      .then((response) => {
        setCarDatas(response.data);
      })
      .catch((error) => {});
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

  const setTypeStatus = (orderStatus) => {
    let color = "mekatnar";
    if (orderStatus === "פתוח") {
      color = "success";
    } else if (orderStatus === "סגור") {
      color = "secondary";
    } else if (orderStatus === "מבוטל") {
      color = "error";
    } else if (orderStatus === "מוקפא") {
      color = "warning";
    } else if (orderStatus === "ממתין לאישור") {
      color = "light";
    }
    return color;
  };

  const setCarType = (carType) => {
    let nameCarType = "";
    carDatas.forEach((carEl) => {
      if (carEl.carnumber === carType) {
        carTypesData.forEach((typeEl) => {
          if (typeEl._id === carEl.carTypeId) {
            nameCarType = typeEl;
          }
        });
      }
    });
    return nameCarType;
  };

  const setGarage = (garageId) => {
    let nameOfGarage = "";
    const garageData = garagesData.forEach((garageEl) => {
      if (garageEl._id.toString() === garageId) {
        nameOfGarage = garageEl;
      }
    });
    if (garageData === "") {
      nameOfGarage = garageId;
    }
    return nameOfGarage;
  };

  const openOrderTime = (statusOrder, time) => {
    let nameOfGarage = "";
    let color = "mekatnar";
    if (time && statusOrder === "פתוח") {
      const milliseconds = new Date(currentDate).valueOf() - new Date(time).valueOf();
      if (milliseconds < 10800000) {
        nameOfGarage = "עד 3 שעות";
        color = "success";
      } else if (milliseconds > 10800000) {
        nameOfGarage = "מעל 3 שעות";
        color = "error";
      }
    } else {
      nameOfGarage = "";
      color = "dark";
    }

    return [nameOfGarage, color];
  };

  const waitOrderTime = (statusOrder, time) => {
    let nameOfGarage = "";
    let color = "mekatnar";
    if (time && statusOrder === "ממתין לאישור") {
      const milliseconds = new Date(currentDate).valueOf() - new Date(time).valueOf();
      if (milliseconds < 3600000) {
        nameOfGarage = "עד שעה";
        color = "success";
      } else if (milliseconds > 3600000) {
        nameOfGarage = "מעל שעה";
        color = "error";
      }
    } else {
      nameOfGarage = "";
      color = "dark";
    }

    return [nameOfGarage, color];
  };

  // const editFile = (towingOrder) => (
  //   <Dialog
  //     px={5}
  //     open={toEditFile}
  //     onClose={() => setToEditFile(false)}
  //     aria-labelledby="alert-dialog-title"
  //     aria-describedby="alert-dialog-description"
  //     maxWidth="xl"
  //   >
  //     <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
  //       <DialogContent>
  //         <TowingOrderFormDB />
  //       </DialogContent>
  //     </MDBox>
  //   </Dialog>
  // );
  const dbRows = requestDB.map((towingOrder, index) => ({
    // fileID: towingOrder._id,
    reference: towingOrder.reference,
    orderDate: new Date(towingOrder.orderDate)
      .toLocaleDateString(undefined, options)
      .split(", ")[0],
    carnumber: towingOrder.carnumber,
    carType: setCarType(towingOrder.carnumber).carType,
    location: towingOrder.location ? towingOrder.location : "-",
    garage:
      setGarage(towingOrder.garage).garageName && setGarage(towingOrder.garage).garageArea
        ? `${setGarage(towingOrder.garage).garageName} ב${setGarage(towingOrder.garage).garageArea}`
        : setGarage(towingOrder.garage).garageName
        ? setGarage(towingOrder.garage).garageName
        : towingOrder.garage,
    executiveBody: towingOrder.executiveBody,
    demandDate: new Date(towingOrder.demandDate)
      .toLocaleDateString(undefined, options)
      .split(", ")[0],
    area: towingOrder.area,
    openOrder: (
      <MDTypography
        variant="caption"
        fontWeight="bold"
        color={openOrderTime(towingOrder.status, towingOrder.openOrderTime)[1]}
      >
        {openOrderTime(towingOrder.status, towingOrder.openOrderTime)[0]}
      </MDTypography>
    ),
    waitOrder: (
      <MDTypography
        variant="caption"
        fontWeight="bold"
        color={waitOrderTime(towingOrder.status, towingOrder.waitForApproveTime)[1]}
      >
        {waitOrderTime(towingOrder.status, towingOrder.waitForApproveTime)[0]}
      </MDTypography>
    ),
    status: (
      <MDBadge
        badgeContent={towingOrder.status}
        color={setTypeStatus(towingOrder.status)}
        container
      />
    ),
    editPower: (
      // <Link to={`/${urlType}/${towingOrder._id}`} key={towingOrder._id}>
      <Tooltip title="עדכן טופס" arrow>
        <MDButton
          variant="gradient"
          color="mekatnar"
          circular="true"
          iconOnly="true"
          size="medium"
          onClick={() => {
            activateEditFile(towingOrder._id);
          }}
        >
          {/* {editFile(towingOrder._id)} */}
          <Icon>edit</Icon>
        </MDButton>
      </Tooltip>
      // </Link>
    ),
  }));

  // console.log(`isError ${isError}`);
  return {
    //* the tables headers
    columns: [
      { Header: "אסמכתא", accessor: "reference", align: "center" },
      { Header: "תאריך", accessor: "orderDate", align: "center" },
      { Header: "צ'", accessor: "carnumber", align: "center" },
      { Header: "סוג רכב נגרר", accessor: "carType", align: "center" },
      { Header: "מיקום", accessor: "location", align: "center" },
      { Header: "מוסך", accessor: "garage", align: "center" },
      { Header: "גוף מבצע", accessor: "executiveBody", align: "center" },
      { Header: "תאריך ביצוע מבוקש", accessor: "demandDate", align: "center" },
      { Header: "מרחב", accessor: "area", align: "center" },
      { Header: "זמן מפתיחת הזמנה", accessor: "openOrder", align: "center" },
      { Header: "זמן המתנה לאישור", accessor: "waitOrder", align: "center" },
      { Header: "סטטוס", accessor: "status", align: "center" },
      { Header: "עדכון", accessor: "editPower", align: "center" },
    ],

    rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,
    dataRow: requestDB,
  };
}
