import React, { useState } from "react";
import { Button, Drawer, Form, Input, message } from "antd";
import dynamic from "next/dynamic";
import { useAddBulletinMutation } from "../../store/slices/api/bulletinApi";
import { showError } from "../../utils/Utils";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const AddBulletinDrawer = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [addBulletin] = useAddBulletinMutation();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
      [{ table: {} }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "color",
    "background",
    "align",
    "table",
  ];

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const payload = {
        heading: values.heading,
        content: content,
      };

      const result = await addBulletin(payload).unwrap();
      if (result.status) {
        message.success("Bulletin added successfully");
        form.resetFields();
        setContent("");
        setOpen(false);
      } else {
        showError(result.message);
      }
    } catch (err) {
      if (err.errorFields) {
        // Form validation error
      } else {
        showError(err?.data?.message || "Failed to add bulletin");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Add Bulletin"
      width={800}
      placement="right"
      onClose={() => setOpen(false)}
      visible={open}
      getContainer={false}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="heading"
          label="Heading"
          rules={[{ required: true, message: "Please enter a heading" }]}
        >
          <Input placeholder="Enter bulletin heading" />
        </Form.Item>
      </Form>

      <div style={{ height: "calc(100vh - 200px)" }}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          style={{ height: "calc(100% - 50px)" }}
          placeholder="Enter bulletin content"
        />
      </div>

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
    </Drawer>
  );
};

export default AddBulletinDrawer;
