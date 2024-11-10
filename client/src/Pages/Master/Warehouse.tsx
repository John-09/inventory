import { Button, Table, Space, Modal, Form, Input, Select, Upload, message, Tooltip, Tag, Switch,ConfigProvider } from 'antd';
import { EyeOutlined, EditOutlined, UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Drawer } from 'vaul';
import { Expand, FileImage, Plus, Search, X } from 'lucide-react';
import FormCoponent from '../../Components/FormComponent';



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
    const [open, setOpen] = useState(false)



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
        // setIsModalVisible(true)
        setOpen(true)
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
                    // setIsModalVisible(true)
                    setOpen(true)
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
                                    {isEditing ? 'Edit' : 'Add'} Warehouse
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
                            rules: [{ required: true, message: 'Please input the name of the warehouse!' }]
                        },
                        {
                            type: 'input',
                            label: 'Location',
                            name: 'location',
                            rules: [{ required: true, message: 'Please input the location of the warehouse!' }]
                        },
                        ...isEditing ? [
                        {
                            type: 'switch',
                            label: 'Active',
                            name: 'active',
                            valuePropName: 'checked'
                       }] : []
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

export default Warehouse