import { Button, Table, Space, Modal, Form, Input, Select, Upload, message, Tooltip, Tag, Switch,ConfigProvider } from 'antd';
import { EyeOutlined, EditOutlined, UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';


interface Customer{
    key: string;
    name: string;
    ContactDetails: string;
    Address: string;
    active: boolean;
}

const Customer = () => {

    const[isEditing,setEditing] = useState(false) 
    const[isModalVisible,setIsModalVisible] = useState(false)
    const[form] = Form.useForm()
    const[isModalVisibleView,setIsModalVisibleView] = useState(false)


    const dataSource = [
        {
          key: '1',
          name: 'Customer 1',
            contactDetails: '1234567890',
          address: 'Address',  
          active: false,
        },
        {
          key: '2',
          name: 'Customer 2',
            contactDetails: '1234567890',
            address: 'Address',
          active: true,
        },
      ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Contact Details',
            dataIndex: 'contactDetails',
            key: 'contactDetails',
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          },
          {
            title: 'Active',
          //   dataIndex: 'active',
            key: 'active',
            render: (record: Customer) => (
                <Tag color={record.active ? 'green' : 'red'}>
                    {record.active ? 'Active' : 'Inactive'}
                </Tag>
            )
          },
          {
              title: 'Action',
              key: 'action',
              render: (record: Customer) => (
                  <Space size="middle">
                      <Button icon={<EyeOutlined />} onClick={() => {
  
                          handleView(record)
                      }} />
                      <Button icon={<EditOutlined />} onClick={() => handleEdit(
                          record as any
                      )} />
                  </Space>
              ),
          },
  
    ]


    const handleView = (record: Customer) => {
        console.log(record)
        form.setFieldsValue(record)
        setIsModalVisibleView(true)
    }

    const handleEdit = (record: Customer) => {
        console.log(record)
        setIsModalVisible(true)
        setEditing(true)
        form.setFieldsValue(record)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }




    return (
        <div>
           <label className="label" style={{ fontSize: '20px' }}>Customer Master</label>
           <div style={{ padding: '10px 0' }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                    setIsModalVisible(true)
                    setEditing(false)
                    form.resetFields()
                }}>Create Customer</Button>
           </div>

              <Table dataSource={dataSource} columns={columns} />

              <Modal
                title={isEditing ? 'Edit Customer' : 'Create Customer'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={isEditing ? 'Save' : 'Create'}
                cancelText="Cancel"
            > 
                <Form
                    form={form}
                    layout="vertical"
                    name="basic"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Contact Details"
                        name="contactDetails"
                        rules={[{ required: true, message: 'Please input the contact details!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input the address!' }]}
                    >
                        <Input />
                    </Form.Item>
                    {isEditing && (
                        <Form.Item
                            name='active'
                            label='Active'
                            valuePropName='checked'
                        >
                            <Switch
                                checkedChildren="Active"
                                unCheckedChildren="Inactive"
                            />
                        </Form.Item>
                    )}
                </Form>
            </Modal>

            <Modal
                title='View Customer'
                visible={isModalVisibleView}
                onCancel={() => setIsModalVisibleView(false)}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="basic"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="contactDetails"
                        label="Contact Details"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="active"
                        label="Active"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Customer