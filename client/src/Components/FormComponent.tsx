import { Button, Form, Input, Select, Upload, Switch, Tag, Tooltip,InputNumber,Checkbox,Col,Row } from 'antd';

interface FromComponentProps {
    formName: any;
    name: string;
    layout: any;
    data: any;
    fields: any;
}

const FromComponent = ({ formName, fields, layout, data }: FromComponentProps) => {
    return (
        <div>
            <Form form={formName} layout={layout}>
            <Row gutter={16}>
                {fields.map((field: any) => {
                    return (
                        <Col span={field.colSpan || 24} key={field.name}>
                        <Form.Item
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            rules={field.rules}
                        >
                            {
                                // Apply readOnly and disabled properties here
                                field.type === 'input' ? (
                                    <Input
                                        {...field.inputProps}
                                        readOnly={field.readOnly}
                                        disabled={field.disabled}
                                    />
                                ) : field.type === 'select' ? (
                                    <Select
                                        {...field.inputProps}
                                        disabled={field.disabled}
                                    >
                                        {field.data.map((item: any) => (
                                            <Select.Option key={item.value} value={item.value}>
                                                {item.label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                ) : field.type === 'upload' ? (
                                    <Upload {...field.inputProps} disabled={field.disabled}>
                                        <Button disabled={field.disabled}>Upload</Button>
                                    </Upload>
                                ) : field.type === 'switch' ? (
                                    <Switch {...field.inputProps} disabled={field.disabled}  checkedChildren="Active"
                                    unCheckedChildren="Inactive"/>
                                ) : field.type === 'tag' ? (
                                    <Tag {...field.inputProps} />
                                ) : field.type === 'tooltip' ? (
                                    <Tooltip {...field.inputProps} />
                                ): field.type === 'inputNumber' ? (
                                    <InputNumber {...field.inputProps} />
                                ): field.type === 'textArea' ? (
                                    <Input.TextArea {...field.inputProps} />
                                ): field.type === 'checkbox' ? (
                                    <Checkbox {...field.inputProps} />
                                ) 
                                
                                : null
                            }
                        </Form.Item>
                        </Col>
                    );
                })}
                </Row>
            </Form>
        </div>
    );
};

export default FromComponent;
