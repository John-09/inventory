import { Button, Table, Space, Modal, Form, Input, Select, Upload, message, Tooltip, Tag, Switch,ConfigProvider } from 'antd';
import { EyeOutlined, EditOutlined, UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Drawer } from 'vaul';
import { Expand, FileImage, Plus, Search, X } from 'lucide-react';
import FormCoponent from '../../Components/FormComponent';

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
    const [open, setOpen] = useState(false)



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
        // setIsModalVisible(true)
        setOpen(true)
        setEditing(true)
        form.setFieldsValue(record)
    }

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                console.log(values)
                form.resetFields()
                setOpen(false)
                // setIsModalVisible(false)
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
                // setIsModalVisible(true)
                setEditing(false)
                form.resetFields()
                setOpen(true)
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
                    label={<span>Name</span>}
                >
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    name="description"
                    label={<span>Description</span>}
                >
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    name="active"
                    label={<span>Active</span>}
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
                                    {isEditing ? 'Edit' : 'Add'} Category
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
                            readOnly:false,
                            disabled:false,
                            rules: [{ required: true, message: 'Please input the name!' }],
                            inputProps: {}
                        },
                        {
                            type: 'input',
                            label: 'Description',
                            name: 'description',
                            readonly:false,
                            disabled:false,
                            rules: [{ required: true, message: 'Please input the description!' }],
                            inputProps: {
                    
                            }
                        },
                        ...(isEditing?
                        [{
                            type: 'switch',
                            label: 'Active',
                            name: 'active',
                            rules: [],
                            inputProps: {
                                
                            }
                        }]
                        : []
                        )
                    
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

export default Catergory