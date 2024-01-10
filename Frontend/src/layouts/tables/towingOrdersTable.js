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
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import TowingOrderForm from "layouts/Forms/towingOrder/towingOrderForm";

// Data
import { Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import towingOrdersData from "layouts/tables/data/towingOrdersData";
import { useEffect, useState } from "react";

import { authenticate, isAuthenticated, signin } from "auth/index";
import axios from "axios";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CardBody, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

const towingOrdersTable = (props) => {
  const { pathname } = useLocation();
  const { typeTable } = props;
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState("בחר");
  const [area, setArea] = useState("בחר");
  const [dbError, setDbError] = useState(false);
  const [toAddFile, setToAddFile] = useState(false);
  const [data, setData] = useState({
    fromDate: "",
    toDate: "",
    erorrInfo: [],
    errInfoOther: "",
    //
    turnNumber: "",
    //
    demandDate: new Date().toISOString().split("T")[0],
    area: "",
    status: "",
    commanderNotes: "",
  });
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
  const errorResArr = [
    "לא מניע",
    "מערכות בטיחות (הגה, בלמים)",
    "נורת התראה אדומה",
    "פנצ'ר",
    "מפתח",
    "תאונה",
    "תקלת מנוע",
    "חוסר נוזלים",
    "תקלת חשמל/קצר",
    "תיבת הילוכים",
    "רכב נעול (פריצה)",
    "קודן",
    "אחר",
  ];
  const currentDate = new Date();
  let tableTittle = "";
  let urlType = "";
  if (typeTable === "landing") {
    tableTittle = `גרירות מוזמנות להיום - ${
      currentDate.toLocaleDateString(undefined, options).split(", ")[0]
    }`;
    urlType = "landing";
  } else if (typeTable === "towingorders") {
    tableTittle = "הזמנות גרירה";
    urlType = "towingorders";
  }
  //   const { columns, rows } = authorsTableData();
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isAuthenticated()) {
      return <Navigate to="/towingorders" />;
    }
  }, []);

  const {
    columns: pColumns,
    rows: pRows,
    dbError: dbe,
    setDBerror: setDbe,
  } = towingOrdersData(typeTable, urlType, currentDate, status, area, data.fromDate, data.toDate);
  const handleErrorClose = () => {
    setDbError(true);
    setDbe(false);
  };

  const toggleError = (evt) => {
    const errorInfo = [...data.erorrInfo];
    if (evt.target.checked) {
      errorInfo.push(evt.target.value);
      setData((prev) => ({ ...prev, [evt.target.name]: errorInfo }));
    } else {
      const index = errorInfo.indexOf(evt.target.value);
      errorInfo.splice(index, 1);
      // console.log(filtered);
      setData((prev) => ({ ...prev, [evt.target.name]: errorInfo }));
    }
  };

  const errorInput = (val) => (
    <div style={{ display: "flex", paddingLeft: "0.5%" }}>
      <Input
        style={{ marginLeft: "5px" }}
        type="checkbox"
        name="erorrInfo"
        value={val}
        onClick={toggleError}
      />
      <p>{val}</p>
    </div>
  );

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    if (name === "status") {
      setStatus(value);
    } else if (name === "area") {
      setArea(value);
    } else if (name === "fromDate" || name === "toDate") {
      setData({ ...data, [name]: value });
    }
  };
  const addFile = () => (
    <Dialog
      px={5}
      open={toAddFile}
      onClose={() => setToAddFile(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>
          <TowingOrderForm />
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showError = () => (
    <Dialog
      open={dbe}
      onClose={handleErrorClose}
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
          שגיאה בקבלת הבקשות
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  // const handlechangeRoleWClose = () => {
  //   setChangeRoleW(false);
  // };
  // const showChangeRoleW = () => (
  //   <Dialog
  //     open={changeRoleW}
  //     onClose={handleErrorClose}
  //     aria-labelledby="alert-dialog-title"
  //     aria-describedby="alert-dialog-description"
  //   >
  //     <MDBox
  //       variant="gradient"
  //       bgColor="mekatnar"
  //       coloredShadow="mekatnar"
  //       borderRadius="l"
  //       // mx={2}
  //       // mt={2}
  //       p={3}
  //       // mb={2}
  //       textAlign="center"
  //     >
  //       <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
  //         בחר את התפקיד החדש
  //       </MDTypography>

  //       <DialogContent>
  //         <MDBox mb={2}>
  //           <FormControl>
  //             <InputLabel id="demo-simple-select-autowidth-label">בחר סוג משתמש</InputLabel>
  //             <Select
  //               labelId="demo-simple-select-autowidth-label"
  //               name="userType"
  //               id="demo-simple-select-autowidth"
  //               value={() => {
  //                 axios
  //                   .post(`http://localhost:5000/TowingLogApi/user/getuserbyid`, {
  //                     userid: pressedID,
  //                   })
  //                   .then(
  //                     (response) =>
  //                       `${response.datadata.user.admin}${response.datadata.user.adminType}`
  //                   )
  //                   .catch((error) => {
  //                     console.log(error);
  //                     return "00";
  //                   });
  //               }}
  //               onChange={() => {
  //                 axios
  //                   .put(`http://localhost:5000/TowingLogApi/user/update/${pressedID}`, {
  //                     admin: "00",
  //                     adminType: "00",
  //                   })
  //                   .then((response) => {
  //                     setChangeRoleW(false);
  //                     window.location.reload(false);
  //                   })
  //                   .catch((error) => {
  //                     console.log(error);
  //                   });
  //               }}
  //               autoWidth
  //               label="בחר סוג משתמש"
  //               sx={{ height: 50, minWidth: 150 }}
  //             >
  //               <MenuItem value="0">מפקד מוקד</MenuItem>
  //               <MenuItem value="1">מוקדנית</MenuItem>
  //               <MenuItem value="2">אחמש</MenuItem>
  //             </Select>
  //           </FormControl>
  //         </MDBox>
  //       </DialogContent>
  //     </MDBox>
  //   </Dialog>
  // );
  const table = () => (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="mekatnar"
              borderRadius="lg"
              coloredShadow="mekatnar"
            >
              <MDTypography variant="h3" color="white">
                {tableTittle}
              </MDTypography>

              <Grid container justifyContent="flex-end">
                <MDButton
                  variant="gradient"
                  onClick={() => setToAddFile(true)}
                  // onClick={() => {
                  //   // setIsInfoPressed(true);
                  //   // setpressedID(hozla._id);
                  // }}
                  circular="true"
                  iconOnly="true"
                  size="medium"
                >
                  <Icon>add</Icon>
                </MDButton>
              </Grid>
              <Grid style={{ position: "absolute", top: "7%" }}>
                <MDButton
                  variant="gradient"
                  onClick={() => setFilterOpen(!filterOpen)}
                  // onClick={() => {
                  //   // setIsInfoPressed(true);
                  //   // setpressedID(hozla._id);
                  // }}
                  // circular="true"
                  size="small"
                >
                  סינון
                  <Icon>filter_alt</Icon>
                </MDButton>
              </Grid>
            </MDBox>

            {filterOpen === true ? (
              <MDBox mx={2} mt={1} px={2}>
                <Row>
                  <Col
                    style={{
                      justifyContent: "right",
                      alignContent: "right",
                      textAlign: "right",
                    }}
                  >
                    <h6 style={{}}>סטטוס</h6>
                    <Input
                      placeholder="סטטוס"
                      type="select"
                      name="status"
                      value={status}
                      onChange={handleChange}
                    >
                      <option value="בחר">בחר</option>
                      <option value="פתוח">פתוח</option>
                      <option value="סגור">סגור</option>
                      <option value="מבוטל">מבוטל</option>
                      <option value="מוקפא">מוקפא</option>
                      <option value="ממתין לאישור">ממתין לאישור</option>
                    </Input>
                  </Col>
                  <Col
                    style={{
                      justifyContent: "right",
                      alignContent: "right",
                      textAlign: "right",
                    }}
                  >
                    <h6 style={{}}>מרחב</h6>
                    <Input
                      placeholder="מרחב"
                      type="select"
                      name="area"
                      value={area}
                      onChange={handleChange}
                    >
                      <option value="בחר">בחר</option>
                      <option value="צפון">צפון</option>
                      <option value="דרום">דרום</option>
                      <option value="מרכז">מרכז</option>
                      <option value="הערבה">הערבה</option>
                      <option value="איו''ש">איוש</option>
                    </Input>
                  </Col>
                </Row>
                {urlType === "towingorders" ? (
                  <Row>
                    <Col>
                      <FormGroup>
                        <h6 style={{}}>מתאריך</h6>
                        <Input
                          placeholder="מתאריך"
                          type="date"
                          name="fromDate"
                          value={data.fromDate}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <h6 style={{}}>עד תאריך</h6>
                        <Input
                          placeholder="עד תאריך"
                          type="date"
                          name="toDate"
                          value={data.toDate}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                ) : null}

                <Row>
                  <Col>
                    <h6>מהות התקלה</h6>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {errorResArr.map((res) => errorInput(res))}
                      {data.erorrInfo.includes("אחר") && (
                        <>
                          <p>הערות: </p>
                          <Row>
                            <Col>
                              <Input
                                // style={{display:'inline', width:'320px'}}
                                placeholder="הערות"
                                name="errInfoOther"
                                value={data.errInfoOther}
                                onChange={handleChange}
                                type="text"
                              />
                            </Col>
                          </Row>
                        </>
                      )}
                    </div>
                  </Col>
                </Row>
              </MDBox>
            ) : null}

            <MDBox pt={3}>
              {pRows.length !== 0 ? (
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={true}
                  canSearch={true}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder={false}
                />
              ) : dbError || dbe ? (
                <MDTypography mx={30} variant="h3" color="error" textGradient={true}>
                  תקלת שרת{" "}
                </MDTypography>
              ) : (
                <MDTypography mx={30} variant="h3" color="mekatnar" textGradient={true}>
                  לא קיימות הזמנות גרירה
                </MDTypography>
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {showError()}
      {addFile()}
      {table()}
      <Outlet />
      <Footer />
    </DashboardLayout>
  );
};

export default towingOrdersTable;
