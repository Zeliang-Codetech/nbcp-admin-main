import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useEffect } from "react";
import { useAddBookingMutation } from "./../../store/slices/api/bookingApi";
import { useGetDriversQuery } from "./../../store/slices/api/master/driverApi";
import { useGetVehiclesQuery } from "./../../store/slices/api/master/vehicleApi";
import { useGetAgentsQuery } from "./../../store/slices/api/master/agentApi";
import { useGetClientsQuery } from "./../../store/slices/api/clientApi";
import { showError } from "../../utils/Utils";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../../utils/Constants";
import {
  BookingSource,
  BookingStatus,
  PaymentStatus,
} from "../../utils/Status";
const { Option } = Select;

const AddBookingPage = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [initialValue, setInitialValue] = useState({
    booking_status: BookingStatus.PENDING,
    payment_status: PaymentStatus.UNPAID,
  });
  const [isLoading, setLoading] = useState(false);
  const {
    data: drivers = [],
    isLoading: isLoadingGetDrivers,
    isSuccess: isSuccessGetDrivers,
    isError: isErrorGetDrivers,
  } = useGetDriversQuery();
  const {
    data: vehicles = [],
    isLoading: isLoadingGetVehicles,
    isSuccess: isSuccessGetVehicles,
    isError: isErrorGetVehicles,
  } = useGetVehiclesQuery();
  const {
    data: agents = [],
    isLoading: isLoadingGetAgents,
    isSuccess: isSuccessGetAgents,
    isError: isErrorGetAgents,
  } = useGetAgentsQuery();
  const {
    data: clients = [],
    isLoading: isLoadingGetClients,
    isSuccess: isSuccessGetClients,
    isError: isErrorGetClients,
  } = useGetClientsQuery();

  const [addBooking] = useAddBookingMutation();
  const onFinish = async (payload) => {
    setLoading(true);
    try {
      const result = await addBooking(payload).unwrap();
      if (result.status) {
        message.success("Saving Successful");
        form.resetFields();
        setOpen(false);
      } else {
        showError(result.message);
      }
    } catch (err) {
      showError(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValue}
        onFinish={onFinish}
        onFinishFailed={(error) => {}}
        autoComplete="off"
      >
        <div className="row">
          <div className="col mr-2">
            <Form.Item
              label="Client Phone"
              name="client_phone  "
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <InputNumber className="w-100" />
            </Form.Item>
          </div>
          <div className="col ml-2">
            <Form.Item label="Client Name" name="client_name">
              <Input />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          label="Pickup Location"
          name="pickup_location"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Destination Location"
          name="destination_location"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <div className="row">
          <div className="col mr-2">
            <Form.Item label="Pickup Time" name="pickup_time">
              <DatePicker
                showTime
                format={DATE_TIME_FORMAT}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
          <div className="col ml-2">
            <Form.Item label="Pickup Time" name="destination_time">
              <DatePicker
                showTime
                format={DATE_TIME_FORMAT}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Form.Item
              label="Assign To (Driver)"
              name="driver_id"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select showSearch optionFilterProp="children">
                {drivers.map((data) => {
                  return (
                    <Option key={data._id} value={data._id}>
                      <div>
                        {data.name}
                        <div>({data.primary_phone})</div>
                      </div>
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          {/* <div className="col ml-2">
              <Form.Item
                label="Select Vehicle"
                name="vehicle_id"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Select showSearch optionFilterProp="children">
                  {vehicles.map((data) => {
                    return (
                      <Option key={data._id} value={data._id}>
                        {data.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div> */}
        </div>

        <div className="row">
          <div className="col mr-2">
            <Form.Item
              label="Booking Source"
              name="booking_source"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select showSearch optionFilterProp="children">
                <Option value={BookingSource.WEB}>Website</Option>
                <Option value={BookingSource.PHONE}>Phone</Option>
                <Option value={BookingSource.AGENT}>Travel Agent</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col ml-2">
            {/* <Form.Item
                label="Payable Amount"
                name="payable_amount"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <InputNumber className="w-100" />
              </Form.Item> */}
            <Form.Item label="Select Agent" name="agent_id">
              <Select showSearch optionFilterProp="children">
                {agents.map((data) => {
                  return (
                    <Option key={data._id} value={data._id}>
                      {data.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col mr-2">
            <Form.Item
              label="Booking Status"
              name="booking_status"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select showSearch optionFilterProp="children">
                <Option value={BookingStatus.PENDING}>Pending</Option>
                <Option value={BookingStatus.IN_PROGRESS}>In Progress</Option>
                <Option value={BookingStatus.CONFIRMED}>Confirmed</Option>
                <Option value={BookingStatus.COMPLETED}>Completed</Option>
                <Option value={BookingStatus.CANCELLED_}>Cancelled</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col ml-2">
            <Form.Item
              label="Payment Status"
              name="payment_status"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select showSearch optionFilterProp="children">
                <Option value={PaymentStatus.UNPAID}>Unpaid</Option>
                <Option value={PaymentStatus.PAID}>Paid</Option>
                <Option value={PaymentStatus.REFUNDED}>Refunded</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <Form.Item label="Remarks" name="remarks">
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            block
            htmlType="submit"
            loading={isLoading}
            className="btn"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBookingPage;
