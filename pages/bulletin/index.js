import React, { useState } from "react";
import { Table, Button, Card, message, Spin, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetBulletinsQuery, useDeleteBulletinMutation } from "../../store/slices/api/bulletinApi";
import AddBulletinDrawer from "../../components/bulletin/AddBulletinDrawer";
import EditBulletinDrawer from "../../components/bulletin/EditBulletinDrawer";
import styles from "../../styles/dashboard.module.css";
import { showError } from "../../utils/Utils";

const BulletinPage = () => {
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [selectedBulletin, setSelectedBulletin] = useState(null);
  
  const {
    data: bulletins = [],
    isLoading,
    isSuccess,
  } = useGetBulletinsQuery();
  
  const [deleteBulletin, { isLoading: isDeleting }] = useDeleteBulletinMutation();

  const handleDelete = async (id) => {
    try {
      const result = await deleteBulletin(id).unwrap();
      if (result.status) {
        message.success("Bulletin deleted successfully");
      } else {
        showError(result.message);
      }
    } catch (err) {
      showError(err?.data?.message || "Failed to delete bulletin");
    }
  };

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  const columns = [
    {
      title: "HEADING",
      dataIndex: "heading",
      key: "heading",
      width: "30%",
    },
    {
      title: "CONTENT",
      dataIndex: "content",
      key: "content",
      width: "50%",
      render: (text) => (
        <div
          className="bulletin-content-preview"
          dangerouslySetInnerHTML={createMarkup(text)}
          style={{ maxHeight: "100px", overflow: "hidden" }}
        />
      ),
    },
    {
      title: "ACTIONS",
      key: "actions",
      width: "20%",
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            className="btn mr-2"
            onClick={() => {
              setSelectedBulletin(record);
              setOpenEditDrawer(true);
            }}
          />
          <Popconfirm
            title="Are you sure you want to delete this bulletin?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} className="btn" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className="flex-between mb-3">
        <h2>Bulletins</h2>
        <Button
          icon={<PlusOutlined />}
          onClick={() => setOpenAddDrawer(true)}
          className="btn"
          type="primary"
        >
          Add Bulletin
        </Button>
      </div>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={bulletins}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      )}

      {openAddDrawer && (
        <AddBulletinDrawer
          open={openAddDrawer}
          setOpen={setOpenAddDrawer}
        />
      )}

      {openEditDrawer && selectedBulletin && (
        <EditBulletinDrawer
          open={openEditDrawer}
          setOpen={setOpenEditDrawer}
          data={selectedBulletin}
        />
      )}
    </div>
  );
};

export default BulletinPage;