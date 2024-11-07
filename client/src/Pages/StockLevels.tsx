import {Table, Space, Modal, Upload, message, Tooltip, Tag, Switch,ConfigProvider } from 'antd';
import { EyeOutlined, EditOutlined, UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Select, Checkbox, InputNumber, Row, Col, DatePicker, Button } from 'antd';
import { useState } from 'react';
import moment from 'moment';

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
        setIsModalVisible(true);
        form.setFieldsValue(record)
        form.setFieldsValue({lastUpdated: moment(record.lastUpdated)});

        

      };
    
      const handleOk = () => {
        // Save the changes to data
        setIsModalVisible(false);
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
        </>
      );
    };  

export default StockLevels