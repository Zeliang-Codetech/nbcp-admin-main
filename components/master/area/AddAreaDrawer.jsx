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
import {
  useAddAreaMutation,
  useGetCitiesQuery,
} from "../../../store/slices/api/cityApi";
import { showError } from "../../../utils/Utils";
const { Option } = Select;
const AddAreaDrawer = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [initialValue, setInitialValue] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { data: cities = [], isLoading: isLoadingCities } = useGetCitiesQuery();
  const [addArea] = useAddAreaMutation();

  const onFinish = async (payload) => {
    try {
      setLoading(true);
      const result = await addArea(payload).unwrap();
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
      title="Add Area"
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
          label="Select City"
          name="city_id"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <Select showSearch optionFilterProp="children">
            {cities.map((data) => {
              return (
                <Option key={data._id} value={data._id}>
                  {data.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
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

        <Form.Item
          label="AQI"
          name="aqi"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <InputNumber className="w-100" />
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

export default AddAreaDrawer;
