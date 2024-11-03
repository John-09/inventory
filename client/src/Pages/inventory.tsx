import {Table, Space, Modal, Upload, message, Tooltip, Tag, Switch,ConfigProvider } from 'antd';
import { EyeOutlined, EditOutlined, UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Select, Checkbox, InputNumber, Row, Col, DatePicker, Button } from 'antd';
import { useState } from 'react';


interface Inventory{

}

const Inventory = () => {

    const[isEditing,setEditing] = useState(false)
    const[isModalVisible,setIsModalVisible] = useState(false)
    const[form] = Form.useForm()

    const dataSource = [
        {
          key: '1',
          tranactionID: 'T-01',
          date: '2021-10-10',
          productName: 'Product 1',
          transactionType: 'Sales',
          quantity: 10,
          warehouse: 'Warehouse 1',
          remarks: 'Remarks 1',
          productCode: 'WGT123',
          unitPrice: 10,
            totalPrice: 100,
            status: 'Completed',
            flagForReview: true,
            requiresApproval: true,
        },
        {
          key: '2',
          tranactionID: 'T-02',
          date: '2021-10-11',
          productName: 'Product 2',
          transactionType: 'Purchase',
          quantity: 20,
          warehouse: 'Warehouse 2',
          remarks: 'Remarks 2',
            productCode: 'WGT124',
            unitPrice: 20,
            totalPrice: 400,
            status: 'Pending',
            flagForReview: false,
            requiresApproval: false,
        },
        {
            key: '3',
            tranactionID: 'T-03',
            date: '2021-10-12',
            productName: 'Product 3',
            transactionType: 'Adjustment',
            quantity: 30,
            warehouse: 'Warehouse 3',
            remarks: 'Remarks 3',
            productCode: 'WGT125',
            unitPrice: 30,
            totalPrice: 900,
            status: 'Completed',
            flagForReview: true,
            requiresApproval: true,
        }
      ];

    const columns = [
        {
            title: 'Tranasction ID',
            dataIndex: 'tranactionID',
            key: 'tranactionID',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
          },
          {
            title: 'Transaction Type',
            dataIndex: 'transactionType',
            key: 'transactionType',
          },
          {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
          },
          {
            title: 'Warehouse',
            dataIndex: 'warehouse',
            key: 'warehouse',
          },
          {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks',
          },
          {
              title: 'Action',
              key: 'action',
              render: (record: Inventory) => (
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

    const handleView = (record: Inventory) => {
        console.log(record)
        form.setFieldsValue(record)
        setIsModalVisible(true)
       
    }

    const handleEdit = (record: Inventory) => {
        console.log(record)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)   
    }


    const { Option } = Select;


    return (
        
        <div>
            <label className="label" style={{ fontSize: '20px',marginBottom:'70px' }}>Inventory View</label>

            <Table style={{paddingTop:'20px'}} dataSource={dataSource} columns={columns} />


            <Modal
                title='View Details'
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='ok'
                cancelText="Close"
                width={1200}
            >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            {/* Transaction Details */}

            <Col span={8}>
              <Form.Item label="Transaction ID" name='tranactionID'>
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Date" name='date1'>
                <DatePicker disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Transaction Type" name='transactionType'>
                <Input readOnly />
              </Form.Item>
            </Col>

            {/* Product Information */}
            <Col span={8}>
              <Form.Item label="Product Name" name="productName">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Product Code" name="productCode">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Product Unit" name="productUnit">
                <Input readOnly />
              </Form.Item>
            </Col>

            {/* Quantity and Pricing */}
            <Col span={8}>
              <Form.Item label="Quantity" name='quantity'>
                <InputNumber style={{ width: '100%' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Unit Price" name='unitPrice'>
                <InputNumber style={{ width: '100%' }} prefix="$" readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Total Price" name='totalPrice'>
                <Input readOnly />
              </Form.Item>
            </Col>

            {/* Additional Details */}
            <Col span={8}>
              <Form.Item label="Warehouse" name='warehouse'>
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Remarks" name='remarks'>
                <Input.TextArea rows={2} readOnly />
              </Form.Item>
            </Col>

            {/* Status and Options */}
            <Col span={8}>
              <Form.Item label="Status" name='status'>
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Checkbox  disabled>Flag for Review</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox disabled>Requires Approval</Checkbox>
            </Col>
          </Row>
        </Form>
      </Modal>
        </div>
    )
}

export default Inventory