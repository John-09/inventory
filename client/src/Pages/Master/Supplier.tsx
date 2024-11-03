import { Button, Table, Space, Modal, Form, Input, Select, Upload, message, Tooltip, Tag, Switch,ConfigProvider } from 'antd';
import { EyeOutlined, EditOutlined, UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';


interface Supplier{
    key: string;
    name: string;
    ContactDetails: string;
    Address: string;
    Country: string;
    City: string;
    active: boolean;
}

const Supplier = () => {

    const[isEditing,setEditing] = useState(false) 
    const[isModalVisible,setIsModalVisible] = useState(false)
    const[form] = Form.useForm()
    const[isModalVisibleView,setIsModalVisibleView] = useState(false)


    const dataSource = [
        {
          key: '1',
          name: 'Supplier 1',
          contactDetails: '1234567890',
          address: 'Address', 
            country: 'Country 1',
            city: 'City 1',
          active: false,
        },
        {
          key: '2',
          name: 'Supplier 2',
            contactDetails: '1234567890',
            address: 'Address',
            country: 'Country 2',
            city: 'City 2',
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
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
          },
          {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
          },
          {
            title: 'Active',
          //   dataIndex: 'active',
            key: 'active',
            render: (record: Supplier) => (
                <Tag color={record.active ? 'green' : 'red'}>
                    {record.active ? 'Active' : 'Inactive'}
                </Tag>
            )
          },
          {
              title: 'Action',
              key: 'action',
              render: (record: Supplier) => (
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

    const handleView = (record: Supplier) => {
        console.log(record)
        form.setFieldsValue(record)
        setIsModalVisibleView(true)
    }

    const handleEdit = (record: Supplier) => {
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
           <label className="label" style={{ fontSize: '20px' }}>Supplier Master</label>
           <div style={{ padding: '10px 0' }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                    setIsModalVisible(true)
                    setEditing(false)
                    form.resetFields()
                }}>Create Supplier</Button>
           </div>

              <Table dataSource={dataSource} columns={columns} />

              <Modal
                title={isEditing ? 'Edit Supplier' : 'Create Supplier'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={isEditing ? 'Save' : 'Create'}
                cancelText="Cancel"
            >   
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name of the supplier!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Contact Details"
                        name="contactDetails"
                        rules={[{ required: true, message: 'Please input the contact details of the supplier!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input the address of the supplier!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Country"
                        name="country"
                        rules={[{ required: true, message: 'Please input the country of the supplier!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please input the city of the supplier!' }]}
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
                title="View Supplier"
                visible={isModalVisibleView}
                onCancel={() => setIsModalVisibleView(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Name"
                    >
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item
                        name="contactDetails"
                        label="Contact Details"
                    >
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                    >
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item
                        name="country"
                        label="Country"
                    >
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item
                        name="city"
                        label="City"
                    >
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item
                        name="active"
                        label="Active"
                    >
                        <Input readOnly />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Supplier