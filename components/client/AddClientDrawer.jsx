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
import { useAddClientMutation } from "./../../store/slices/api/clientApi";
import { showError } from "../../utils/Utils";
import { UserRole } from "../../utils/Status";
const { Option } = Select;
const AddClientDrawer = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [initialValue, setInitialValue] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [addClient] = useAddClientMutation();
  const onFinish = async (payload) => {
    setLoading(true);
    try {
      const result = await addClient(payload).unwrap();
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
    <Drawer
      title="Add New Client"
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
        <div className="row">
          <div className="col mr-2">
            <Form.Item
              label="Phone (Primary)"
              name="primary_phone"
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
            <Form.Item label="Phone (Alternate)" name="secondary_phone">
              <InputNumber className="w-100" />
            </Form.Item>
          </div>
        </div>

        <Form.Item label="Email (Primary)" name="primary_email">
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

export default AddClientDrawer;
