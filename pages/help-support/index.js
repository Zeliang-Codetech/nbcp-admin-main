import React, { useState } from "react";
import { Button, Card, message, Spin, Descriptions } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGetHelpSupportQuery } from "../../store/slices/api/helpSupportApi";
import EditHelpSupportDrawer from "../../components/help-support/EditHelpSupportDrawer";
import styles from "../../styles/dashboard.module.css";

const HelpSupportPage = () => {
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const {
    data: helpSupportData = {
      name: "",
      phone: [],
      designation: "",
      email: "",
      address: "",
    },
    isLoading,
    isSuccess,
  } = useGetHelpSupportQuery();

  return (
    <div className={styles.container}>
      <div className="flex-between mb-3">
        <h2>Contact Information</h2>
        <Button
          icon={<EditOutlined />}
          onClick={() => setOpenEditDrawer(true)}
          className="btn"
        >
          Edit Information
        </Button>
      </div>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Card>
          <Descriptions bordered column={1} size="large">
            <Descriptions.Item label="Name">{helpSupportData.name}</Descriptions.Item>
            <Descriptions.Item label="Phone Numbers">
              {helpSupportData.phone && helpSupportData.phone.length > 0 ? (
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {helpSupportData.phone.map((phone, index) => (
                    <li key={index}>{phone}</li>
                  ))}
                </ul>
              ) : (
                "No phone numbers available"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Designation">
              {helpSupportData.designation}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{helpSupportData.email}</Descriptions.Item>
            <Descriptions.Item label="Address">{helpSupportData.address}</Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      {openEditDrawer && (
        <EditHelpSupportDrawer
          open={openEditDrawer}
          setOpen={setOpenEditDrawer}
          data={helpSupportData}
        />
      )}
    </div>
  );
};

export default HelpSupportPage;