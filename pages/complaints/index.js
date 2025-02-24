import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Dropdown,
  Menu,
  Form,
  message,
  Popconfirm,
  Select,
  DatePicker,
} from "antd";
import {
  CarOutlined,
  CheckOutlined,
  EyeOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useGetComplaintsQuery } from "./../../store/slices/api/complaintApi";
import { useRouter } from "next/router";
import { FaPlaneDeparture } from "react-icons/fa";

import { getComplaintStatus, showError, showToast } from "../../utils/Utils";
const { Option } = Select;
const BookingsPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [booking, setBooking] = useState(false);
  const [openAddComplaintDrawer, setOpenAddComplaintDrawer] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {
    data: complaints = [],
    isFetching: isFetchingGetComplaints,
    isLoading: isLoadingGetComplaints,
    isSuccess: isSuccessGetComplaints,
    refetch: refreshGetComplaints,
  } = useGetComplaintsQuery();

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  const handleRowClick = (brand, index, event) => {};

  const columns = [
    {
      title: "DATE",
      dataIndex: "created_at",
      key: "booking_date",
      width: "10%",
      align: "center"
    },
    {
      title: "USER",
      dataIndex: "client_details",
      key: "client_name",
      width: "10%",
      align: "center",
      render: (client_details) => client_details?.phone || 'N/A',
    },
    {
      title: "CATEGORY",
      dataIndex: "category_name",
      key: "category_name",
      width: "15%",
      align: "center"
    },
    {
      title: "CITY",
      dataIndex: "city_name",
      key: "city_name",
      width: "10%",
      align: "center"
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: "10%",
      align: "center",
      render: (value) => getComplaintStatus(value),
    },
    {
      title: "ACTIONS",
      key: "actions",
      width: "10%",
      align: "center",
      render: (record) => (
        <Link href={`/complaints/view/${record._id}`}>
          <a>
            <EyeOutlined /> View
          </a>
        </Link>
      ),
    },
  ];
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const result = await deleteClient(id).unwrap();
      if (result.status) {
        message.success("Deleted successfully");
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
    <div className="page_wrapper">
      {/* <Form
        layout="vertical"
        form={form}
        disabled={false}
        onFinish={() => {}}
        autoComplete="off"
      >
        <Form.Item label="Select Date">
          <DatePicker.RangePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            onChange={(date, dateString) => {
              if (date) {
                const [from, to] = date;
                setDateRange({
                  from: moment(from).format("YYYY-MM-DD"),
                  to: moment(to).format("YYYY-MM-DD"),
                });
              } else {
                setDateRange({
                  from: undefined,
                  to: undefined,
                });
              }
            }}
            allowClear={true}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            icon={<SearchOutlined />}
            className="btn"
          >
            Search
          </Button> 
        </Form.Item>
      </Form>  */}
      <div className="flex-between mb-3">
        <div></div>
        <div>
          {/* <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenAddBookingDrawer(true);
            }}
            className="btn"
          >
            Add Booking
          </Button> */}
          <Button
            icon={<SyncOutlined />}
            className="btn ml-2"
            onClick={() => {
              refreshGetComplaints();
            }}
          >
            Refresh
          </Button>
        </div>
      </div>
      <div className="">
        <Table
          loading={isLoadingGetComplaints}
          columns={columns}
          dataSource={complaints}
          size="small"
          onChange={onChange}
          onRow={(record, index, event) => ({
            onClick: () => handleRowClick(record, index, event),
          })}
          bordered
          rowKey={(data) => data._id}
        />
      </div>
    </div>
  );
};
export default BookingsPage;
