import { Button, Table, Space, Modal, Form, Input, Select, Upload, message, Tooltip, Tag, Switch,ConfigProvider } from 'antd';
import { EyeOutlined, EditOutlined, UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';


interface Product {
    key: string;
    name: string;
    category: number;
    active: string;
}
const Product = () => {

    const[isEditing,setEditing] = useState(false)
    const[isModalVisible,setIsModalVisible] = useState(false)
    const[form] = Form.useForm()
    const[isModalVisibleView,setIsModalVisibleView] = useState(false)


    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          category: 32,
          active: false,
        },
        {
          key: '2',
          name: 'John',
          category: 42,
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
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
        },
        {
          title: 'Active',
        //   dataIndex: 'active',
          key: 'active',
          render: (record: Product) => (
              <Tag color={record.active ? 'green' : 'red'}>
                  {record.active ? 'Active' : 'Inactive'}
              </Tag>
          )
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: Product) => (
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
      ];

      const handleView = (record: Product) => {
            console.log(record)
            setIsModalVisibleView(true)
        }

        const handleEdit = (record: Product) => {
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

        const handleCancelView = () => {
            setIsModalVisibleView(false)
        }

    return (
        <div>
            <label className="label" style={{ fontSize: '20px' }}>Product Master</label>

            <div style={{ padding: '10px 0' }}>

                <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                    setIsModalVisible(true)
                    setEditing(false)
                    form.resetFields()
                }}>Create Product</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} />;

            <Modal
                title={isEditing ? 'Edit Product' : 'Create Product'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={isEditing ? 'Save' : 'Create'}
                cancelText="Close"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please select the category!' }]}
                    >
                        <Select>
                            <Select.Option value="1">Category 1</Select.Option>
                            <Select.Option value="2">Category 2</Select.Option>
                        </Select>
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
            title="View Product"
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
                    name="category"
                    label="Category"
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

export default Product