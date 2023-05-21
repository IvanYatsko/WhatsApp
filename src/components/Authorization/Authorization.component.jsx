import { Button, Form, Input } from "antd";
import { useCallback } from "react";
import { authorized } from "../../api/api";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Authorization = ({ setDataInstance }) => {
  const onFinish = useCallback(
    async (values) => {
      const authorize = await authorized(values);
      authorize && setDataInstance(values);
    },
    [setDataInstance]
  );

  return (
    <Form
      name="basic"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 1000 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="IdInstance"
        name="idInstance"
        rules={[{ required: true, message: "Please input your idInstance!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="ApiTokenInstance"
        name="apiTokenInstance"
        rules={[
          { required: true, message: "Please input your apiTokenInstance!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Authorization;
