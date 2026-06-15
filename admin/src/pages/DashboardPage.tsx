import { Row, Col, Card, Statistic, Typography } from 'antd';
import { FileTextOutlined, ProjectOutlined, AppstoreOutlined, TeamOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getBlogPosts } from '../api/blog';
import { getProjects } from '../api/projects';
import { getServices } from '../api/services';
import { getTeam } from '../api/team';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: blog } = useQuery({ queryKey: ['blog'], queryFn: getBlogPosts });
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: getProjects });
  const { data: services } = useQuery({ queryKey: ['services'], queryFn: getServices });
  const { data: team } = useQuery({ queryKey: ['team'], queryFn: getTeam });

  const stats = [
    { title: 'Статей в блоге',     value: blog?.length ?? 0,     icon: <FileTextOutlined  style={{ color: '#1677ff' }} />, color: '#e6f4ff', href: '/blog' },
    { title: 'Проектов',           value: projects?.length ?? 0,  icon: <ProjectOutlined   style={{ color: '#52c41a' }} />, color: '#f6ffed', href: '/projects' },
    { title: 'Услуг',              value: services?.length ?? 0,  icon: <AppstoreOutlined  style={{ color: '#faad14' }} />, color: '#fffbe6', href: '/services' },
    { title: 'Участников команды', value: team?.length ?? 0,      icon: <TeamOutlined      style={{ color: '#eb2f96' }} />, color: '#fff0f6', href: '/team' },
  ];

  return (
    <div>
      <Typography.Title level={4} style={{ marginBottom: 24 }}>Дашборд</Typography.Title>

      <Row gutter={[16, 16]}>
        {stats.map((stat) => (
          <Col xs={24} sm={12} lg={6} key={stat.title}>
            <Card
              style={{ borderRadius: 12, background: stat.color, border: 'none', cursor: 'pointer' }}
              onClick={() => navigate(stat.href)}
            >
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ fontSize: 32, fontWeight: 700 }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
