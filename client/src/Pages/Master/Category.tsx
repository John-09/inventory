import { Button, Table, Space, Modal, Form, Input, Select, Upload, message, Tooltip, Tag, Switch,ConfigProvider } from 'antd';
import { EyeOutlined, EditOutlined, UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';


interface Category{
    key: string;
    name: string;
    category: string;
    Description: string;
    active: boolean;
}

const Catergory = () => {

    const[isEditing,setEditing] = useState(false) 
    const[isModalVisible,setIsModalVisible] = useState(false)
    const[form] = Form.useForm()
    const[isModalVisibleView,setIsModalVisibleView] = useState(false)


    const dataSource = [
        {
          key: '1',
          name: 'Dress',
          description: 'Clothing',  
          active: false,
        },
        {
          key: '2',
          name: 'Shoes',
            description: 'Footwear',
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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Active',
          //   dataIndex: 'active',
            key: 'active',
            render: (record: Category) => (
                <Tag color={record.active ? 'green' : 'red'}>
                    {record.active ? 'Active' : 'Inactive'}
                </Tag>
            )
          },
          {
              title: 'Action',
              key: 'action',
              render: (record: Category) => (
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

    const handleView = (record: Category) => {
        console.log(record)
        form.setFieldsValue(record)
        setIsModalVisibleView(true)
    }
    const handleEdit = (record: Category) => {
        console.log(record)
        setIsModalVisible(true)
        setEditing(true)
        form.setFieldsValue(record)
    }

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                console.log(values)
                form.resetFields()
                setIsModalVisible(false)
            })
            .catch((info) => {
                console.log('Validate Failed:', info)
            })
    }

    const handleCancel = () => {
        form.resetFields()
        setIsModalVisible(false)
    }
    const handleCancelView = () => {
        form.resetFields()
        setIsModalVisibleView(false)
    }


    return (
        <div>
             <label className="label" style={{ fontSize: '20px' }}>Category Master</label>
             <div style={{ padding: '10px 0' }}>

            <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                setIsModalVisible(true)
                setEditing(false)
                form.resetFields()
            }}>Create Category</Button>
            </div>

            <Table dataSource={dataSource} columns={columns} />
            
            <Modal
                title={isEditing ? 'Edit Category' : 'Create Category'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={isEditing ? 'Save' : 'Create'}
                cancelText="Close"
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="category"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
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
            title="View Category"
            visible={isModalVisibleView}
            onCancel={handleCancelView}
            
       
            >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Name"
                >
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
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

export default Catergory