import React, { useEffect, useState } from "react";
import { useGetBookingQuery } from "../../store/slices/api/bookingApi";
import { useRouter } from "next/router";
import { Button, Spin } from "antd";
import { CheckOutlined, EditFilled } from "@ant-design/icons";
import EditBookingDrawer from "../../components/booking/EditBookingDrawer";
import {
  getBookingSource,
  getBookingStatus,
  getPaymentStatus,
} from "../../utils/Utils";
import AssignDriverDrawer from "../../components/booking/AssignDriverDrawer";
const BookingDetailDrawer = () => {
  const router = useRouter();
  const { id: booking_id } = router.query;
  const [openEditBookingDrawer, setOpenEditBookingDrawer] = useState(false);
  const [openAssignDriverDrawer, setOpenAssignDriverDrawer] = useState(false);

  const {
    data: booking,
    isLoading: isLoadingGetBooking,
    isSuccess: isSuccessGetBooking,
    isError: isErrorGetBooking,
  } = useGetBookingQuery(booking_id, { skip: !booking_id });
  useEffect(() => {
    if (isErrorGetBooking) {
      router.back();
    }
  }, [booking, isLoadingGetBooking, isSuccessGetBooking, isLoadingGetBooking]);
  return (
    <div>
      <div>{isLoadingGetBooking ? <Spin /> : isSuccessGetBooking && <></>}</div>
      {openEditBookingDrawer && (
        <EditBookingDrawer
          open={openEditBookingDrawer}
          setOpen={setOpenEditBookingDrawer}
          data={booking}
        />
      )}
      {openAssignDriverDrawer && (
        <AssignDriverDrawer
          open={openAssignDriverDrawer}
          setOpen={setOpenAssignDriverDrawer}
          data={booking}
        />
      )}
      <div className="flex-between mb-3">
        <div className=""></div>
        <div className="">
          <Button
            icon={<CheckOutlined />}
            onClick={() => setOpenAssignDriverDrawer(true)}
            className="btn mr-2"
          >
            Assign Driver
          </Button>
          <Button
            icon={<EditFilled />}
            onClick={() => setOpenEditBookingDrawer(true)}
            className="btn"
          >
            Edit Item
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>Client Name</label>
          <h5>{booking?.client_id?.name}</h5>
        </div>
        <div className="col">
          <label>Client Phone</label>
          <h5>{booking?.client_id?.primary_phone}</h5>
        </div>
        <div className="col">
          <label>Location</label>
          <h5>{booking?.location}</h5>
        </div>
        <div className="col">
          <label>Booking Date</label>
          <h5>{booking?.booking_date}</h5>
        </div>
        {/* <div className="col">
          <label>Pickup Location</label>
          <h5>{booking?.pickup_location}</h5>
        </div>
        <div className="col">
          <label>Destination Location</label>
          <h5>{booking?.destination_location || "---"}</h5>
        </div> */}
        {/* <div className="col">
          <label>Pickup Time</label>
          <h5>{booking?.pickup_time || "---"}</h5>
        </div>
        <div className="col">
          <label>Destination Time</label>
          <h5>{booking?.destination_time || "---"}</h5>
        </div> */}
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <label>Assigned To (Driver)</label>
          <h5>{booking?.driver_id?.name}</h5>
        </div>

        <div className="col">
          <label>Booking Status</label>
          <h5>{getBookingStatus(booking?.booking_status)}</h5>
        </div>

        <div className="col">
          <label>Booking Status</label>
          <h5>{getPaymentStatus(booking?.payment_status)}</h5>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <label>Booking Source</label>
          <h5>{getBookingSource(booking?.booking_source)}</h5>
        </div>
        <div className="col">
          <label>Agent</label>
          <h5>{booking?.agent_id?.name || "---"}</h5>
        </div>
        <div className="col">
          <label>Total Amount</label>
          <h5>{booking?.total_amount || "---"}</h5>
        </div>
        <div className="col">
          <label>Remarks</label>
          <h5>{booking?.remarks || "---"}</h5>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailDrawer;
