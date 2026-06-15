import { Layout, Menu, Avatar, Dropdown, Button, Typography } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  ProjectOutlined,
  AppstoreOutlined,
  TeamOutlined,
  LogoutOutlined,
  UserOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/authSlice';

const { Sider, Content, Header } = Layout;

const menuItems = [
  { key: '/', icon: <DashboardOutlined />, label: 'Дашборд' },
  { key: '/content', icon: <EditOutlined />, label: 'Контент сайта' },
  { key: '/blog', icon: <FileTextOutlined />, label: 'Блог' },
  { key: '/projects', icon: <ProjectOutlined />, label: 'Проекты' },
  { key: '/services', icon: <AppstoreOutlined />, label: 'Услуги' },
  { key: '/team', icon: <TeamOutlined />, label: 'Команда' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const email = useAppSelector((s) => s.auth.email);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} theme="dark">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #1f1f1f' }}>
          <Typography.Text strong style={{ color: '#fff', fontSize: 18 }}>
            IVN Labs
          </Typography.Text>
          <Typography.Text style={{ color: '#888', display: 'block', fontSize: 12 }}>
            Admin Panel
          </Typography.Text>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
          style={{ marginTop: 8 }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: 'Выйти',
                  onClick: handleLogout,
                  danger: true,
                },
              ],
            }}
            placement="bottomRight"
          >
            <Button type="text" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar size="small" icon={<UserOutlined />} style={{ background: '#1677ff' }} />
              <span style={{ fontSize: 13 }}>{email}</span>
            </Button>
          </Dropdown>
        </Header>

        <Content style={{ padding: 24, background: '#f5f5f5' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
