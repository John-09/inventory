import { Button, Table, Space, Modal, Form, Input, Select, Upload, message, Tooltip, Tag, Switch,ConfigProvider } from 'antd';
import { EyeOutlined, EditOutlined, UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Drawer } from 'vaul';
import { Expand, FileImage, Plus, Search, X } from 'lucide-react';
import FormCoponent from '../../Components/FormComponent';


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
    const [open, setOpen] = useState(false)


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
            // setIsModalVisible(true)
            setEditing(true)
            form.setFieldsValue(record)
            setOpen(true)
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
                    // setIsModalVisible(true)
                    setEditing(false)
                    form.resetFields()
                    setOpen(true)
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

            <Drawer.Root direction="right" open={open} onOpenChange={setOpen}
                dismissible={false}
            >
                {/* <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
                    Open Drawer
                </Drawer.Trigger> */}
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content
                        className="right-2 top-2 bottom-2 fixed z-10 outline-none 
                         flex lg:w-96 md:w-80 w-72"
                        // The gap between the edge of the screen and the drawer is 8px in this case.
                        style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
                    >
                        <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col justify-between items-center rounded-[16px] overflow-y-auto">
                            <div className="w-full">
                                {/* 
                                    exit button
                                */}
                                <div className="flex justify-between">
                                    <Expand className=' w-5 cursor-pointer' />
                                    <X className=' cursor-pointer' onClick={() => {
                                        setOpen(false)
                                        setEditing(false);
                                    }} />
                                </div>
                                <Drawer.Title className="font-semibold text-xl mb-8 text-zinc-900 text-center">
                                    {isEditing ? 'Edit' : 'Add'} Customer
                                </Drawer.Title>

                                <Drawer.Description className="text-zinc-600 mb-2">
                                
                <FormCoponent
                    formName={form}
                    name='name'
                    layout='vertical'
                    data={{}}
                    fields={[
                       {
                            type: 'input',
                            label: 'Name',
                            name: 'name',
                            rules: [{ required: true, message: 'Please input the name!' }],
                        },
                        {
                            type: 'select',
                            label: 'Category',
                            name: 'category',
                            rules: [{ required: true, message: 'Please select the category!' }],
                            data: [
                                { label: 'Category 1', value: '1' },
                                { label: 'Category 2', value: '2' },
                            ],
                        },
                        ...isEditing ? [
                        {
                            type: 'switch',
                            label: 'Active',
                            name: 'active',
                            valuePropName: 'checked',
                       }] : [],
                    ]}
                />
                <div className="flex gap-2 mt-4">
                            <button
                                type="submit"
                                className="bg-primary text-white px-4 py-2 rounded-md"
                                onClick={handleOk}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="clear-filter-button"
                            >
                                Close
                            </button>
                        </div>
                                </Drawer.Description>
                            </div>
                            {/* <Drawer.Description >
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => {
                                            alert('Submit');
                                            setOpen(false);
                                            // handleSubmit()
                                        }}
                                        className="bg-primary text-white px-4 py-2 rounded-md"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="clear-filter-button"
                                    >
                                        Close
                                    </button>
                                </div>
                            </Drawer.Description> */}

                        </div>
                        {/* <Drawer.Root>
                            <Drawer.Trigger />
                            <Drawer.Portal>
                                <Drawer.Overlay />
                                <Drawer.Content>
                                    <Drawer.Handle />
                                    <Drawer.Title />
                                    <Drawer.Description />
                                    <Drawer.Close />
                                </Drawer.Content>
                            </Drawer.Portal>
                        </Drawer.Root> */}

                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div>
    )
}

export default Product