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
  useGetUsersQuery,
  useDeleteUserMutation,
} from "./../../store/slices/api/userApi";
import { useRouter } from "next/router";
import AddUserDrawer from "./../../components/user/AddUserDrawer";
import EditUserDrawer from "./../../components/user/EditUserDrawer";
import { getUserRole, showError } from "../../utils/Utils";
import { use } from "react";
const UsersPage = () => {
  const router = useRouter();
  const [openAddUserDrawer, setOpenAddUserDrawer] = useState(false);
  const [openEditUserDrawer, setOpenEditUserDrawer] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);
  const {
    data: users = [],
    isFetching: isFetchingGetUsers,
    isLoading: isLoadingGetUsers,
    isSuccess: isSuccessGetUsers,
  } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

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
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      width: "15%",
      align: "center",
      render: (role) => getUserRole(role),
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
              setUser(data);
              setOpenEditUserDrawer(true);
            }}
          />
          <Popconfirm
            placement="topLeft"
            title="Are you sure you want delete this user?"
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
      const result = await deleteUser(id).unwrap();
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
      {openAddUserDrawer && (
        <AddUserDrawer
          open={openAddUserDrawer}
          setOpen={setOpenAddUserDrawer}
        />
      )}
      {openEditUserDrawer && (
        <EditUserDrawer
          open={openEditUserDrawer}
          setOpen={setOpenEditUserDrawer}
          data={user}
        />
      )}
      <div className="flex-between mb-3">
        <div></div>
        <div>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenAddUserDrawer(true);
            }}
            className="btn"
          >
            Add User
          </Button>
        </div>
      </div>
      <div className="">
        <Table
          loading={isLoadingGetUsers}
          columns={columns}
          dataSource={users}
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
export default UsersPage;
