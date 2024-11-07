import {Table, Space, Modal, Upload, message, Tooltip, Tag, Switch,ConfigProvider } from 'antd';
import { EyeOutlined, EditOutlined, UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Select, Checkbox, InputNumber, Row, Col, DatePicker, Button } from 'antd';
import { useState } from 'react';
import moment from 'moment';

interface PurchaseOrder {
    key: string;
    orderId: string;
    orderDate: string;
    supplierName: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    status: string;
    expectedDeliveryDate: string;
    remarks: string;
}

const PurchaseOrders = () => {
    const dataSource = [
        {
          key: '1',
          orderId: 'PO12345',
          orderDate: '2024-10-10',
          supplierName: 'ABC Supplies Ltd.',
          productName: 'Printer Ink Cartridges',
          quantity: 50,
          unitPrice: 15.00,
          totalPrice: 750.00,
          status: 'Pending',
          expectedDeliveryDate: '2024-10-20',
          remarks: 'Urgent delivery required',
        },
        {
          key: '2',
          orderId: 'PO12346',
          orderDate: '2024-10-12',
          supplierName: 'XYZ Electronics',
          productName: 'Wireless Mouse',
          quantity: 100,
          unitPrice: 12.00,
          totalPrice: 1200.00,
          status: 'Approved',
          expectedDeliveryDate: '2024-10-22',
          remarks: '',
        },
        {
          key: '3',
          orderId: 'PO12347',
          orderDate: '2024-10-15',
          supplierName: 'Global Tech Parts',
          productName: 'Laptop Chargers',
          quantity: 30,
          unitPrice: 25.00,
          totalPrice: 750.00,
          status: 'Received',
          expectedDeliveryDate: '2024-10-25',
          remarks: 'Check product quality upon receipt',
        },
        {
          key: '4',
          orderId: 'PO12348',
          orderDate: '2024-10-18',
          supplierName: 'Stationery Hub',
          productName: 'Office Chairs',
          quantity: 10,
          unitPrice: 150.00,
          totalPrice: 1500.00,
          status: 'Pending',
          expectedDeliveryDate: '2024-10-30',
          remarks: 'Delivery to warehouse 3',
        },
        {
          key: '5',
          orderId: 'PO12349',
          orderDate: '2024-10-20',
          supplierName: 'Furnishings World',
          productName: 'Wooden Desks',
          quantity: 5,
          unitPrice: 200.00,
          totalPrice: 1000.00,
          status: 'Approved',
          expectedDeliveryDate: '2024-11-05',
          remarks: '',
        }
      ];

      const [form] = Form.useForm();
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
      const [selectedRecord, setSelectedRecord] = useState(null);
      const[isModalVisibleView,setIsModalVisibleView] = useState(false)
      

      const columns=[
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
            },
            {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            },
            {
            title: 'Supplier Name',
            dataIndex: 'supplierName',
            key: 'supplierName',
            },
            {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            },
            {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            },
            {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            },
            {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status: string) => {
                  let color = '';
                  switch (status) {
                    case 'Pending':
                      color = 'orange';
                      break;
                    case 'Approved':
                      color = 'green';
                      break;
                    case 'Received':
                      color = 'blue';
                      break;
                    case 'Cancelled':
                      color = 'red';
                      break;
                    default:
                      color = 'gray';
                  }
                  return <Tag color={color}>{status}</Tag>;
                },
              },
              
            {
            title: 'Expected Delivery Date',
            dataIndex: 'expectedDeliveryDate',
            key: 'expectedDeliveryDate',
            },
            {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks',
            },
            {
            title: 'Action',
            key: 'action',
            render: (record: PurchaseOrder) => (
                <Space size="middle">
                <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
                </Space>
            ),
        }
      ]

        const handleView = (record: PurchaseOrder) => {
            setIsEditing(false);
            setIsModalVisibleView(true);
            form.setFieldsValue(record)
            form.setFieldsValue({orderDate: moment(record.orderDate)});
            form.setFieldsValue({expectedDeliveryDate: moment(record.expectedDeliveryDate)});
        };

        const handleEdit = (record: PurchaseOrder) => {
            setIsEditing(true);
            setIsModalVisible(true);
            form.setFieldsValue(record)
            form.setFieldsValue({orderDate: moment(record.orderDate)});
            form.setFieldsValue({expectedDeliveryDate: moment(record.expectedDeliveryDate)});
        };

        const handleDelete = (record: PurchaseOrder) => {
            console.log(record);
        };

        const handleOk = () => {
            // Save the changes to data
            setIsModalVisible(false);
        };

        const handleCancelView = () => {
            setIsModalVisibleView(false);
        };



      
    return (
        <div>
            <div style={{marginBottom:'10px'}}>
            <label className="label" style={{ fontSize: '20px',marginBottom:'30px' }}>Purchase Orders</label>
            </div>
            <div style={{ padding: '10px 0' }}>

            <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                setIsModalVisible(true)
                setIsEditing(false)
                form.resetFields()
            }}>Create Order</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} />

            <Modal
            title={isEditing ? 'Edit Purchase Order' : 'Create Purchase Order'}
            visible={isModalVisible}
            onOk={handleOk}
            okText={isEditing ? 'Save' : 'Create'}
            cancelText="Close"
            >
            <Form
                form={form}
                layout='vertical'
                name='purchaseOrderForm'
            >
                        <Form.Item
                            label='Order ID'
                            name='orderId'
                        >
                            <Input readOnly/>
                        </Form.Item>
                        <Form.Item
                            label='Order Date'
                            name='orderDate'
                        >
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item
                            label='Supplier Name'
                            name='supplierName'
                        >
                            <Input/>
                        </Form.Item>
                
                        <Form.Item
                            label='Product Name'
                            name='productName'
                        >
                            <Input/>
                        </Form.Item>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            label='Quantity'
                            name='quantity'
                        >
                            <InputNumber/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label='Unit Price'
                            name='unitPrice'
                        >
                            <InputNumber/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label='Total Price'
                            name='totalPrice'
                        >
                            <InputNumber/>
                        </Form.Item>
                    </Col>
                    </Row>
                        <Form.Item
                            label='Status'
                            name='status'
                        >
                            <Select>
                                <Select.Option value='Pending'>Pending</Select.Option>
                                <Select.Option value='Approved'>Approved</Select.Option>
                                <Select.Option value='Received'>Received</Select.Option>
                                <Select.Option value='Cancelled'>Cancelled</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Expected Delivery Date'
                            name='expectedDeliveryDate'
                        >
                            <DatePicker/>
                        </Form.Item>

                        <Form.Item
                            label='Remarks'
                            name='remarks'
                        >
                            <Input.TextArea/>
                        </Form.Item>
            </Form>
            </Modal>

            <Modal
            title='View Purchase order'
            visible={isModalVisibleView}
            onCancel={handleCancelView}
            >
            <Form layout="vertical" form={form}>
                <Form.Item
                    name="orderId"
                    label="Order ID"
                >
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    name="orderDate"
                    label="Order Date"
                >
                    <DatePicker disabled />
                </Form.Item>
                <Form.Item
                    name="supplierName"
                    label="Supplier Name"
                >
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    name="productName"
                    label="Product Name"
                >
                    <Input readOnly />
                </Form.Item>
                <Row gutter={16}>
                <Col span={8}>
                <Form.Item
                    name="quantity"
                    label="Quantity"
                >
                    <InputNumber readOnly />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                    name="unitPrice"
                    label="Unit Price"
                >
                    <InputNumber readOnly />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                    name="totalPrice"
                    label="Total Price"
                >
                    <InputNumber readOnly />
                </Form.Item>
                </Col>
                </Row>
                <Form.Item
                    name="status"
                    label="Status"
                >
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    name="expectedDeliveryDate"
                    label="Expected Delivery Date"
                >
                    <DatePicker disabled />
                </Form.Item>
                <Form.Item
                    name="remarks"
                    label="Remarks"
                >
                    <Input readOnly />
                </Form.Item>
            </Form>


            </Modal>
          
        </div>
    )
}

export default PurchaseOrders