import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { BsRepeat } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";

import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";

// import useValidation from "../common/useValidation";
import {
    vehicle_fare_list, updateFare
} from "../api/api";
import Sidebar from "../common/sidebar";
import Loader from "../common/loader";
import moment from "moment";
const SetVehicleFare = () => {
    let [isLoading, setIsLoading] = useState(true);
    let [showAlert, setShowAlert] = useState(false);
    let [alertMsg, setAlertMsg] = useState({
        title: "",
        message: ""
    });
    let [dataOfVehicleFareList, setDataOfVehicleFareList] = useState([]);
    const columns = [
        {
            name: "Vehicle Type",
            selector: (row) => row.vehicle_type || <b>unavailable</b>,
            width: "150px",
            center: true,
            style: {
                paddingRight: "32px",
                paddingLeft: "0px",
            },
        },
        {
            name: "Fare/KM",
            selector: (row, i) => <div>
                <Form.Group className="my-1 mx-3">

                    {/* <Form.Control
                        type="number"
                        className={"form-control"}
                        value={row.fare_per_km}
                        name="fare_per_km"
                        onChange={(e) => { setFarePerKm(e.target.value) }}
                        id={"fare_per_km" + row.id + ""}
                        placeholder={row.fare_per_km}
                    /> */}
                    <Form.Control
                        type="number"
                        className="form-control"
                        value={row.fare_per_km || ""}
                        onChange={(e) =>
                            handleFarePerKmChange(i, e.target.value)
                        }
                        id={"fare_per_km" + row.id + ""}
                    />
                </Form.Group>
            </div> || <b>unavailable</b>,
            width: "150px",
            center: true,
            style: {
                paddingRight: "32px",
                paddingLeft: "0px",
            },
        },
        {
            name: "Minimum Fare",
            selector: (row, i) => <div className=""><Form.Group className="my-1 mx-3">

                <Form.Control
                    type="number"

                    className={"form-control"}
                    value={row.min_fare || ""}
                    name="min_fare"
                    onChange={(e) => { handleMinFareChange(i, e.target.value) }}
                    id={"min_fare" + row.id + ""}
                />
            </Form.Group></div> || <b>unavailable</b>,
            width: "150px",
            center: true,
            style: {
                paddingRight: "32px",
                paddingLeft: "0px",
            },
        },
        {
            name: "Active & Deactive",
            selector: (row) => row.is_active === 1 ? <b>active</b> : <b>Deactive</b>,
            width: "150px",
            center: true,
            style: {
                paddingRight: "32px",
                paddingLeft: "0px",
            },
        },

        // {
        //     name: "Edit",
        //     width: "110px",
        //     style: {
        //         paddingRight: "12px",
        //         paddingLeft: "0px",
        //     },
        //     center: true,
        //     selector: (row) => (
        //         <div className={"actioncolimn"}>
        //             <BiEdit
        //                 className=" p-0  mr-1  editiconn text-secondary"
        //                 onClick={(e) => { handleEditShow(e, row.vehicle_id) }}
        //             />
        //             {/* {row.is_active === 1 ?
        //           <BsTrash
        //             className=" p-0 m-0 editiconn text-danger"
        //             onClick={() => handleAlert(row.vehicle_id, "deleted")}
        //           /> :
        //           <BsRepeat
        //             className=" p-0 m-0 editiconn text-success"
        //             onClick={() => handleAlert(row.vehicle_id, "active")}
        //           />} */}
        //         </div>
        //     ),
        // },

        {
            name: "Action",
            width: "100px",
            style: {
                paddingRight: "12px",
                paddingLeft: "0px",
            },
            center: true,
            selector: (row) => (
                <div className={"actioncolimn"}>
                    <Button
                        className=" btn-sm btn-success mx-2"
                        onClick={() => fareSave(row)}
                    >
                        {" "}
                        Save
                    </Button>
                </div>
            ),
        },
    ];
    /*Function to save the data */
    const fareSave = async (data) => {
        try {
            console.log("Actual data", data)
            const res_data = await updateFare(data)
            const message = res_data.message
            if (res_data.status) {
                setAlertMsg({ ...alertMsg, title: "Success", message: message }) 
        } else {
     setAlertMsg({ ...alertMsg, title: "Failed", message: message })
     }
            setShowAlert(true)
            // alertMsg["name"]="mayur"
        } catch (err) {
            console.log(err)
        }


    }
    useEffect(() => {
        vehicle_fare_list_call()
    }, [])

    const vehicle_fare_list_call = async () => {
        setIsLoading(true)
        let data_of_vehicle_fare_list = await vehicle_fare_list()
        console.log(data_of_vehicle_fare_list)
        setDataOfVehicleFareList(data_of_vehicle_fare_list["response"])
        setIsLoading(false)
    }

    const handleFarePerKmChange = (i, Value) => {
        // Create a copy of the data and update the fare_per_km value for the specific row
        const updtaedData = [...dataOfVehicleFareList];
        updtaedData[i].fare_per_km = Value;
        setDataOfVehicleFareList(updtaedData);
        console.log("new data", updtaedData[i].fare_per_km)
    };
    const handleMinFareChange = (i, Value) => {
        // Create a copy of the data and update the fare_per_km value for the specific row
        const updtaedData1 = [...dataOfVehicleFareList];
        updtaedData1[i].min_fare = Value;
        setDataOfVehicleFareList(updtaedData1);
        console.log("new data1", updtaedData1[i].min_fare)
    };
    const closeVehicleAlert = () => {
        setShowAlert(false)
      };
    return (
        <div>
            {isLoading === true ? <Loader /> : null}

            <div className="row admin_row">
                <div className="col-lg-2 col-md-6 col-sm-7 col-10">
                    <Sidebar style={{ message: "setVehicleFare" }} />
                </div>
                <div className="col-lg-10  admin_content_bar mt-5">
                    <div className="main_content_div">
                        <div
                            className="dashboard-main-container mt-df25 mt-lg-31"
                            id="dashboard-body"
                        >
                            <div className="">
                                <div className="page_main_contant">
                                    <h4>Order List with driver</h4>
                                    <div className=" mt-3 p-3">
                                        <DataTable
                                            columns={columns}
                                            data={dataOfVehicleFareList}
                                            pagination
                                            highlightOnHover
                                            pointerOnHover
                                            className={"table_body product_table"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SweetAlert
                show={showAlert}
                title={alertMsg.title}
                text={alertMsg.message}
            onConfirm={closeVehicleAlert}
            // showCancelButton={}
            // onCancel={}
            />
        </div>
    )
}
export default SetVehicleFare;