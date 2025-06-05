import React, { useState } from "react";
import { Button, Card, message, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGetAboutUsQuery } from "../../store/slices/api/aboutUsApi";
import EditAboutUsDrawer from "../../components/about-us/EditAboutUsDrawer";
import styles from "../../styles/dashboard.module.css";

const AboutUsPage = () => {
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const {
    data: aboutUsData = { content: "" },
    isLoading,
    isSuccess,
  } = useGetAboutUsQuery();

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div className={styles.container}>
      <div className="flex-between mb-3">
        <h2>About Us Content</h2>
        <Button
          icon={<EditOutlined />}
          onClick={() => setOpenEditDrawer(true)}
          className="btn"
        >
          Edit Content
        </Button>
      </div>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Card>
          <div
            className="about-us-content"
            dangerouslySetInnerHTML={createMarkup(aboutUsData.content)}
          />
        </Card>
      )}

      {openEditDrawer && (
        <EditAboutUsDrawer
          open={openEditDrawer}
          setOpen={setOpenEditDrawer}
          data={aboutUsData}
        />
      )}
    </div>
  );
};

export default AboutUsPage;