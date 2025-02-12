import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useEffect } from "react";
import { useAddCategoryMutation } from "./../../../store/slices/api/categoryApi";
import { showError } from "../../../utils/Utils";
const { Option } = Select;
const AddCategoryDrawer = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [initialValue, setInitialValue] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [addCategory] = useAddCategoryMutation();
  const onFinish = async (payload) => {
    setLoading(true);
    try {
      const result = await addCategory(payload).unwrap();
      if (result.status) {
        message.success("Saving Successful");
        form.resetFields();
        setOpen(false);
      } else {
        showError(result.message);
      }
    } catch (err) {
      showError(err?.data?.message);
      console.log("error ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Add Category"
      width={450}
      placement="right"
      onClose={() => {
        setOpen(false);
      }}
      visible={open}
      getContainer={false}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValue}
        onFinish={onFinish}
        onFinishFailed={(error) => {}}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <Input />
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
    </Drawer>
  );
};

export default AddCategoryDrawer;
