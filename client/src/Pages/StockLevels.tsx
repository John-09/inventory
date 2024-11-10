import {Table, Space, Modal, Upload, message, Tooltip, Tag, Switch,ConfigProvider } from 'antd';
import { EyeOutlined, EditOutlined, UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Select, Checkbox, InputNumber, Row, Col, DatePicker, Button } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { Drawer } from 'vaul';
import { Expand, FileImage, Plus, Search, X } from 'lucide-react';
import FormCoponent from '../Components/FormComponent';

interface StockLevel {
    key: string;
    productName: string;
    productCode: string;
    category: string;
    warehouse: string;
    currentStockLevel: number;
    minStockLevel: number;
    maxStockLevel: number;
    reorderQuantity: number;
    stockAlertLevel: number;
    lastUpdated: string;
    remarks: string;
}


const   StockLevels = () => {

    const [form] = Form.useForm();
  const dataSource=[
        {
          key: '1',
          productName: 'HP Elitebook',
          productCode: '8952202236',
          category: 'Laptops',
          warehouse: 'Warehouse A',
          currentStockLevel: 20,
          minStockLevel: 5,
          maxStockLevel: 50,
          reorderQuantity: 10,
          stockAlertLevel: 10,
          lastUpdated: '2024-11-07',
          remarks: 'High demand item',
        },
        // Add more data entries as needed
        {
            key: '2',
            productName: 'Dell Inspiron',
            productCode: '8952202237',
            category: 'Laptops',
            warehouse: 'Warehouse B',
            currentStockLevel: 30,
            minStockLevel: 10,
            maxStockLevel: 60,
            reorderQuantity: 15,
            stockAlertLevel: 15,
            lastUpdated: '2024-11-07',
            remarks: 'High demand item',
            },
            {
            key: '3',
            productName: 'Lenovo Thinkpad',
            productCode: '8952202238',
            category: 'Laptops',
            warehouse: 'Warehouse C',
            currentStockLevel: 40,
            minStockLevel: 15,
            maxStockLevel: 70,
            reorderQuantity: 20,
            stockAlertLevel: 20,
            lastUpdated: '2024-11-07',
            remarks: 'High demand item',
        }
      ];
    
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
      const [selectedRecord, setSelectedRecord] = useState(null);
      const[isModalVisibleView,setIsModalVisibleView] = useState(false)
        const [open, setOpen] = useState(false)
    
      const columns = [
        { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
        { title: 'Product Code', dataIndex: 'productCode', key: 'productCode' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        { title: 'Warehouse', dataIndex: 'warehouse', key: 'warehouse' },
        { title: 'Remarks', dataIndex: 'remarks', key: 'remarks' },
        {
          title: 'Action',
          key: 'action',
          render: (record:StockLevel) => (
            <Space size="middle">
              <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
              <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
            </Space>
          ),
        },
      ];
    
      const handleView = (record:StockLevel) => {
        setIsEditing(false);
        setIsModalVisibleView(true);
        form.setFieldsValue(record)
        form.setFieldsValue({lastUpdated: moment(record.lastUpdated)});
      };
    
      const handleEdit = (record:StockLevel) => {
        setIsEditing(true);
        // setIsModalVisible(true);
        setOpen(true)
        form.setFieldsValue(record)
        form.setFieldsValue({lastUpdated: moment(record.lastUpdated)});

        

      };
    
      const handleOk = () => {
        // Save the changes to data
        // setIsModalVisible(false);
        console.log(form.getFieldsValue());
        setOpen(false)
        
      };

        const handleCancel = () => {
            setIsModalVisible(false);
        };

        const handleCancelView = () => {
            setIsModalVisibleView(false);
        };
    
      return (
        <>
        <label className="label" style={{ fontSize: '20px',marginBottom:'30px' }}>Stock Level</label>

        {/* <div style={{ padding: '10px 0' }}>

        <Button type="primary" icon={<PlusOutlined />} onClick={() => {
            // setIsModalVisible(true)
            setIsEditing(false)
            form.resetFields()
            setOpen(true)
        }}>Create Category</Button>
        </div> */}
          <Table dataSource={dataSource} columns={columns} />
    
        <Modal
        title='Edit Stock Level'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Save'
        cancelText="Close"
        width={800}
        >
             <Form layout="vertical" form={form}>
            <Form.Item label="Product Name" name="productName">
                <Input readOnly/>
            </Form.Item>
            <Form.Item label="Product Code" name="productCode">
                <Input readOnly/>
            </Form.Item>
            <Form.Item label="Category" name="category">
                <Input readOnly/>
            </Form.Item>
            <Form.Item label="Warehouse" name="warehouse">
                <Input readOnly/>
            </Form.Item>
            <Row gutter={16}>
            <Col span={8}>
            <Form.Item label="Current Stock Level" name="currentStockLevel">
                <InputNumber />
            </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item label="Minimum Stock Level" name="minStockLevel">
                <InputNumber />
            </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item label="Maximum Stock Level" name="maxStockLevel">
                <InputNumber />
            </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item label="Reorder Quantity" name="reorderQuantity">
                <InputNumber />
            </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item label="Stock Alert Level" name="stockAlertLevel">
                <InputNumber />
            </Form.Item>
            </Col>
            </Row>
            <Form.Item label="Remarks" name="remarks">
                <Input />
            </Form.Item>
            <Form.Item label="Last Updated" name="lastUpdated">
                <DatePicker disabled/>
            </Form.Item>
             </Form>
        </Modal>

        <Modal
        title='View Stock Level'
        visible={isModalVisibleView}
        onCancel={handleCancelView}
        width={800}
        >
                <Form layout="vertical" form={form}>
                <Form.Item label="Product Name" name="productName">
                    <Input readOnly/>
                </Form.Item>
                <Form.Item label="Product Code" name="productCode">
                    <Input readOnly/>
                </Form.Item>
                <Form.Item label="Category" name="category">
                    <Input readOnly/>
                </Form.Item>
                <Form.Item label="Warehouse" name="warehouse">
                    <Input readOnly/>
                </Form.Item>
                <Row gutter={16}>
                <Col span={8}>
                <Form.Item label="Current Stock Level" name="currentStockLevel">
                    <InputNumber readOnly/>
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label="Minimum Stock Level" name="minStockLevel">
                    <InputNumber readOnly/>
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label="Maximum Stock Level" name="maxStockLevel">
                    <InputNumber readOnly/>
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label="Reorder Quantity" name="reorderQuantity">
                    <InputNumber readOnly/>
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label="Stock Alert Level" name="stockAlertLevel">
                    <InputNumber readOnly/>
                </Form.Item>
                </Col>
                </Row>
                <Form.Item label="Remarks" name="remarks">
                    <Input readOnly/>
                </Form.Item>
                <Form.Item label="Last Updated" name="lastUpdated">
                    <DatePicker disabled/>
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
                                        setIsEditing(false);
                                    }} />
                                </div>
                                <Drawer.Title className="font-semibold text-xl mb-8 text-zinc-900 text-center">
                                    {isEditing ? 'Edit' : 'Add'} Stock Level
                                </Drawer.Title>

                                <Drawer.Description className="text-zinc-600 mb-2">
                                
                <FormCoponent
                    formName={form}
                    name='name'
                    layout='vertical'
                    data={{}}
                    fields={[
                        {
                            name: 'productName',
                            label: 'Product Name',
                            type: 'input',
                            rules: [{ required: true, message: 'Please input the product name!' }],
                            readOnly:true,
                            disabled:false,
                            inputprops: {}
                        },
                        {
                            name: 'productCode',
                            label: 'Product Code',
                            type: 'input',
                            rules: [{ required: true, message: 'Please input the product code!' }],
                            readOnly:true,
                            disabled:false,
                            inputprops: {}
                        },
                        {
                            name: 'category',
                            label: 'Category',
                            type: 'input',
                            rules: [{ required: true, message: 'Please input the category!' }],
                            readOnly:true,
                            disabled:false,
                            inputprops: {}
                        },
                        {
                            name: 'warehouse',
                            label: 'Warehouse',
                            type: 'input',
                            rules: [{ required: true, message: 'Please input the warehouse!' }],
                            readOnly:true,
                            disabled:false,
                            inputprops: {}
                        },
                        {
                            name: 'currentStockLevel',
                            label: 'Current Stock Level',
                            type: 'inputNumber',
                            rules: [{ required: true, message: 'Please input the current stock level!' }],
                            readOnly:false,
                            disabled:false,
                            inputprops: {},
                            colSpan: 8
                        },
                        {
                            name: 'minStockLevel',
                            label: 'Minimum Stock Level',
                            type: 'inputNumber',
                            rules: [{ required: true, message: 'Please input the minimum stock level!' }],
                            readOnly:false,
                            disabled:false,
                            inputprops: {},
                            colSpan: 8
                        },
                        {
                            name: 'maxStockLevel',
                            label: 'Maximum Stock Level',
                            type: 'inputNumber',
                            rules: [{ required: true, message: 'Please input the maximum stock level!' }],
                            readOnly:false,
                            disabled:false,
                            inputprops: {},
                            colSpan: 8
                        },
                        {
                            name: 'reorderQuantity',
                            label: 'Reorder Quantity',
                            type: 'inputNumber',
                            rules: [{ required: true, message: 'Please input the reorder quantity!' }],
                            readOnly:false,
                            disabled:false,
                            inputprops: {},
                            colSpan: 8
                        },
                        {
                            name: 'stockAlertLevel',
                            label: 'Stock Alert Level',
                            type: 'inputNumber',
                            rules: [{ required: true, message: 'Please input the stock alert level!' }],
                            readOnly:false,
                            disabled:false,
                            inputprops: {},
                            colSpan: 8
                        },
                        {
                            name: 'remarks',
                            label: 'Remarks',
                            type: 'input',
                            rules: [{ required: true, message: 'Please input the remarks!' }],
                            readOnly:false,
                            disabled:false,
                            inputprops: {}
                        },
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
        </>
      );
    };  

export default StockLevels