import { Button, Table, Space, Modal, Form, Input, Select, Upload, message, Tooltip, Tag, Switch,ConfigProvider } from 'antd';
import { EyeOutlined, EditOutlined, UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';


interface Warehouse{
    key: string;
    name: string;
    Location: string;
    active: boolean;
}


const Warehouse = () => {

    const[isEditing,setEditing] = useState(false) 
    const[isModalVisible,setIsModalVisible] = useState(false)
    const[form] = Form.useForm()
    const[isModalVisibleView,setIsModalVisibleView] = useState(false)



    const dataSource = [
        {
          key: '1',
          name: 'warehouse 1',
          location: 'Location 1',  
          active: false,
        },
        {
          key: '2',
          name: 'warehouse 2',
        location: 'Location 2',
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
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
          },
          {
            title: 'Active',
          //   dataIndex: 'active',
            key: 'active',
            render: (record: Warehouse) => (
                <Tag color={record.active ? 'green' : 'red'}>
                    {record.active ? 'Active' : 'Inactive'}
                </Tag>
            )
          },
          {
              title: 'Action',
              key: 'action',
              render: (record: Warehouse) => (
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


    const handleView = (record: Warehouse) => {
        console.log(record)
        setIsModalVisibleView(true)
        form.setFieldsValue(record)
    }

    const handleEdit = (record: Warehouse) => {
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
            <label className="label" style={{ fontSize: '20px' }}>Warehouse Master</label>
           <div style={{ padding: '10px 0' }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                    setIsModalVisible(true)
                    setEditing(false)
                    form.resetFields()
                }}>Create Warehouse</Button>
           </div>
              <Table dataSource={dataSource} columns={columns} />

              <Modal
                title={isEditing ? 'Edit Warehouse' : 'Create Warehouse'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={isEditing ? 'Save' : 'Create'}
                cancelText="Cancel"
            >   
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the name of the warehouse!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="location"
                        label="Location"
                        rules={[{ required: true, message: 'Please input the location of the warehouse!' }]}
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
                title='View Warehouse'
                visible={isModalVisibleView}
                onCancel={() => setIsModalVisibleView(false)}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the name of the warehouse!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="location"
                        label="Location"
                        rules={[{ required: true, message: 'Please input the location of the warehouse!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name='active'
                        label='Active'
                        valuePropName='checked'
                    >
                        <Switch
                            checkedChildren="Active"
                            unCheckedChildren="Inactive"
                            disabled
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Warehouse