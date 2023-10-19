import React, { useState } from "react";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message,
} from "antd";
import axios from "axios";
import { BASE_URL, configHeaders } from "../../api/config";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

const FormRegister = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    axios
      .post(`${BASE_URL}/QuanLyNguoiDung/DangKy`, values, {
        headers: configHeaders(),
      })
      .then((res) => {
        message.success("Đăng ký thành công");
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        message.error(err.response.data.content);
        console.log(err);
      });
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="83">+83</Option>
        <Option value="84">+84</Option>
        <Option value="85">+85</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      labelAlign="left"
      labelWrap
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: "+84",
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <h1 className=" mb-6 text-6xl text-cyan-800 text-center font-semibold">
        Đăng ký
      </h1>
      <Form.Item
        label="Tài khoản"
        name="taiKhoan"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên tài khoản",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="matKhau"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Xác nhận mật khẩu"
        dependencies={["matKhau"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Vui lòng xác nhận mật khẩu",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("matKhau") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Xác nhận mật khẩu không khớp"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Họ tên"
        name="hoTen"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập họ và tên",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "Email không hợp lệ",
          },
          {
            required: true,
            message: "Vui lòng nhập email",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        name="nickname"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item> */}

      {/* <Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          {
            type: "array",
            required: true,
            message: "Please select your habitual residence!",
          },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item> */}

      <Form.Item
        name="soDt"
        label="Số điện thoại"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số điện thoại",
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      {/* <Form.Item
        name="donation"
        label="Donation"
        rules={[
          {
            required: true,
            message: "Please input donation amount!",
          },
        ]}
      >
        <InputNumber
          addonAfter={suffixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item> */}

      {/* <Form.Item
        name="website"
        label="Website"
        rules={[
          {
            required: true,
            message: "Please input website!",
          },
        ]}
      >
        <AutoComplete
          options={websiteOptions}
          onChange={onWebsiteChange}
          placeholder="website"
        >
          <Input />
        </AutoComplete>
      </Form.Item> */}

      {/* <Form.Item
        name="intro"
        label="Intro"
        rules={[
          {
            required: true,
            message: "Please input Intro",
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item> */}

      {/* <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item> */}

      {/* <Form.Item
        label="Captcha"
        extra="We must make sure that your are a human."
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input the captcha you got!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item> */}

      {/* <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item> */}
      <Form.Item {...tailFormItemLayout} className="flex justify-center">
        <Button type="primary" className="bg-orange-600" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>

      <a href="/login">
        <h3 className="text-lg">
          Bạn đã có tài khoản? <span className="text-blue-800">Đăng nhập</span>
        </h3>
      </a>
    </Form>
  );
};
export default FormRegister;
