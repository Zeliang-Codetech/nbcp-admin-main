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
} from "antd";
import {
  DeleteFilled,
  DeleteOutlined,
  EditOutlined,
  EnterOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {
  useGetClientsQuery,
  useDeleteClientMutation,
} from "./../../store/slices/api/clientApi";
import { Router, useRouter } from "next/router";
import AddClientDrawer from "./../../components/client/AddClientDrawer";
import EditClientDrawer from "./../../components/client/EditClientDrawer";
import { showError } from "../../utils/Utils";
const ClientsPage = () => {
  const router = useRouter();
  const [openAddClientDrawer, setOpenAddClientDrawer] = useState(false);
  const [openEditClientDrawer, setOpenEditClientDrawer] = useState(false);
  const [client, setClient] = useState({});
  const [isLoading, setLoading] = useState(false);
  const {
    data: clients = [],
    isFetching: isFetchingGetClients,
    isLoading: isLoadingGetClients,
    isSuccess: isSuccessGetClients,
  } = useGetClientsQuery();

  const [deleteClient] = useDeleteClientMutation();

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  const handleRowClick = (brand, index, event) => {};

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "PHONE (PRIMARY)",
      dataIndex: "primary_phone",
      key: "phone",
      width: "20%",
    },
    {
      title: "EMAIL",
      dataIndex: "primary_email",
      key: "email",
      width: "20%",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: "20%",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      align: "center",
      width: "15%",
      render: (data) => (
        <div>
          <Button
            icon={<EditOutlined />}
            className="btn"
            onClick={() => {
              setClient(data);
              setOpenEditClientDrawer(true);
            }}
          />
          <Popconfirm
            placement="topLeft"
            title="Are you sure you want delete this client?"
            description="Confirm"
            onConfirm={(e) => {
              e.stopPropagation();
              handleDelete(data._id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteFilled />} className="btn ml-2" />
          </Popconfirm>
        </div>
      ),
      width: "",
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
      {openAddClientDrawer && (
        <AddClientDrawer
          open={openAddClientDrawer}
          setOpen={setOpenAddClientDrawer}
        />
      )}
      {openEditClientDrawer && (
        <EditClientDrawer
          open={openEditClientDrawer}
          setOpen={setOpenEditClientDrawer}
          data={client}
        />
      )}
      <div className="flex-between mb-3">
        <div></div>
        <div>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenAddClientDrawer(true);
            }}
            className="btn"
          >
            Add Client
          </Button>
        </div>
      </div>
      <div className="">
        <Table
          loading={isLoadingGetClients}
          columns={columns}
          dataSource={clients}
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
export default ClientsPage;
