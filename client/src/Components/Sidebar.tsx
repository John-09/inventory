import React from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Dashboard from '../Pages/dashboard';
import {
    PieChartOutlined,
    UserOutlined,
    AppstoreOutlined,
    ShoppingOutlined,
    BankOutlined,
    ContactsOutlined,
    DatabaseOutlined,
    ShoppingCartOutlined,
    TeamOutlined,
    FileOutlined,
    BarChartOutlined,
  } from '@ant-design/icons';
  import { useNavigate,Outlet} from "react-router-dom";

const { Header, Content, Sider } = Layout;

// const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }


  const items2: MenuItem[] = [
    getItem('Dashboard', 'dashboard', <PieChartOutlined />), // Main dashboard overview icon
    
    getItem('Master', 'sub1', <AppstoreOutlined />, [
      getItem('Product', 'master/product', <DatabaseOutlined />), // Represents a product catalog
      getItem('Category', 'master/category', <AppstoreOutlined />), // Category list under Product management
      getItem('Suppliers', 'master/supplier', <ShoppingOutlined />), // Supplier management
      getItem('Warehouse', 'master/warehouse', <BankOutlined />), // Warehouse locations
      getItem('Customer', 'master/customer', <ContactsOutlined />), // Customer management
    ]),
    
    getItem('Inventory Management', 'sub2', <DatabaseOutlined />,[
      getItem('Inventory', 'inventory', <DatabaseOutlined />), // Inventory tracking
      getItem('Stock Levels', 'stock-levels', <DatabaseOutlined />), // Inventory tracking
    ]),
   // Inventory tracking
  
    getItem('Purchase Orders', 'purchase-order', <ShoppingCartOutlined />), // Purchase order management
  
    getItem('Sales Orders', 'sales-order', <ShoppingOutlined />), // Sales order management
    
    getItem('Reports', '9', <BarChartOutlined />), // Analytics and reporting section
  ];


const Sidebar: React.FC = () => {

  const items2: MenuItem[] = [
    getItem('Dashboard', 'dashboard', <PieChartOutlined />), // Main dashboard overview icon
    
    getItem('Master', 'sub1', <AppstoreOutlined />, [
      getItem('Product', 'master/product', <DatabaseOutlined />), // Represents a product catalog
      getItem('Category', 'master/category', <AppstoreOutlined />), // Category list under Product management
      getItem('Suppliers', 'master/supplier', <ShoppingOutlined />), // Supplier management
      getItem('Warehouse', 'master/warehouse', <BankOutlined />), // Warehouse locations
      getItem('Customer', 'master/customer', <ContactsOutlined />), // Customer management
    ]),
    
    getItem('Inventory Management', 'sub2', <DatabaseOutlined />,[
      getItem('Inventory', 'inventory-management/inventory', <DatabaseOutlined />), // Inventory tracking
      getItem('Stock Levels', 'inventory-management/stock-levels', <DatabaseOutlined />), // Inventory tracking
    ]),
    getItem('Purchase Orders', 'purchase-order', <ShoppingCartOutlined />), // Purchase order management
  
    getItem('Sales Orders', 'sales-order', <ShoppingOutlined />), // Sales order management
    
    getItem('Reports', '9', <BarChartOutlined />), // Analytics and reporting section
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();


  const handleMenuClick = (e: { key: string }) => {
    console.log('click ', e.key);
    
    navigate(`/${e.key}`);
    localStorage.setItem('currentMenuItemSelected', e.key);
    console.log('outlet',Outlet);
    
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
        //   items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[localStorage.getItem('currentMenuItemSelected') || 'dashboard']}
            // defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{ margin: '16px 0' }}
          />
         <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Sidebar;