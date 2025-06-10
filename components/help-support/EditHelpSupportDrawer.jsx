import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input, message, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useUpdateHelpSupportMutation } from "../../store/slices/api/helpSupportApi";
import { showError } from "../../utils/Utils";

const EditHelpSupportDrawer = ({ open, setOpen, data }) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const [updateHelpSupport] = useUpdateHelpSupportMutation();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        phone: data.phone || [],
        designation: data.designation,
        email: data.email,
        address: data.address,
      });
    }
  }, [data, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      const payload = {
        name: values.name,
        phone: values.phone,
        designation: values.designation,
        email: values.email,
        address: values.address,
      };
      
      const result = await updateHelpSupport(payload).unwrap();
      if (result.status) {
        message.success("Contact information updated successfully");
        setOpen(false);
      } else {
        showError(result.message);
      }
    } catch (err) {
      if (err.errorFields) {
        // Form validation error
        return;
      }
      showError(err?.data?.message || "Failed to update contact information");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Edit Contact Information"
      width={600}
      placement="right"
      onClose={() => setOpen(false)}
      visible={open}
      getContainer={false}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: "",
          phone: [""],
          designation: "",
          email: "",
          address: "",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.List name="phone">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  required={false}
                  key={field.key}
                  label={index === 0 ? "Phone Numbers" : ""}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[{ required: true, message: "Please enter phone number" }]}
                    noStyle
                  >
                    <Input placeholder="Enter phone number" style={{ width: "85%" }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                      style={{ margin: "0 8px" }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: "60%" }}
                >
                  Add Phone Number
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name="designation"
          label="Designation"
          rules={[{ required: true, message: "Please enter the designation" }]}
        >
          <Input placeholder="Enter designation" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter the email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter the address" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter address" />
        </Form.Item>

        <div style={{ marginTop: "20px" }}>
          <Button
            type="primary"
            block
            onClick={handleSave}
            loading={isLoading}
            className="btn"
          >
            Save
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default EditHelpSupportDrawer;