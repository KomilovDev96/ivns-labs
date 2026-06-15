import {
  Table, Button, Drawer, Form, Input, Switch,
  Space, Avatar, Tag, Popconfirm, Typography, message, Divider,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getTeam, createTeamMember, updateTeamMember, deleteTeamMember } from '../api/team';
import type { TeamMember } from '../types';
import TranslationTabs from '../components/TranslationTabs';
import ColorInput from '../components/ColorInput';

const TRANSLATION_FIELDS = [
  { name: 'name', label: 'Имя и фамилия', required: true },
  { name: 'position', label: 'Должность' },
  { name: 'bio', label: 'Краткое описание', type: 'textarea' as const, rows: 2 },
  { name: 'skills', label: 'Навыки (через запятую)' },
];

export default function TeamPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form] = Form.useForm();

  const { data, isLoading } = useQuery({ queryKey: ['team'], queryFn: getTeam });

  const create = useMutation({
    mutationFn: createTeamMember,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['team'] }); closeModal(); message.success('Участник добавлен!'); },
    onError: () => message.error('Ошибка при добавлении'),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TeamMember> }) => updateTeamMember(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['team'] }); closeModal(); message.success('Данные обновлены!'); },
    onError: () => message.error('Ошибка при обновлении'),
  });

  const remove = useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['team'] }); message.success('Участник удалён!'); },
  });

  const openCreate = () => { setEditing(null); form.resetFields(); setOpen(true); };
  const openEdit = (m: TeamMember) => {
    setEditing(m);
    form.setFieldsValue({
      ...m,
      linkedin: m.socials?.linkedin,
      github: m.socials?.github,
      telegram: m.socials?.telegram,
    });
    setOpen(true);
  };
  const closeModal = () => { setOpen(false); setEditing(null); form.resetFields(); };
  const onFinish = (values: TeamMember & { linkedin?: string; github?: string; telegram?: string }) => {
    const { linkedin, github, telegram, ...rest } = values;
    const payload = { ...rest, socials: { linkedin, github, telegram } };
    if (editing) update.mutate({ id: editing._id, data: payload });
    else create.mutate(payload);
  };

  const columns = [
    {
      title: 'Участник', key: 'member',
      render: (_: unknown, m: TeamMember) => (
        <Space>
          <Avatar style={{ background: m.color1 }}>{m.initials}</Avatar>
          <span>{m.translations?.ru?.name ?? m.memberId}</span>
        </Space>
      ),
    },
    { title: 'ID', dataIndex: 'memberId', key: 'memberId', width: 110 },
    {
      title: 'Должность (RU)', key: 'position',
      render: (_: unknown, m: TeamMember) => m.translations?.ru?.position ?? <span style={{ color: '#999' }}>—</span>,
    },
    {
      title: 'Статус', dataIndex: 'active', key: 'active', width: 100,
      render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? 'Активен' : 'Скрыт'}</Tag>,
    },
    {
      title: 'Действия', key: 'actions', width: 100,
      render: (_: unknown, record: TeamMember) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => openEdit(record)} />
          <Popconfirm title="Удалить участника?" onConfirm={() => remove.mutate(record._id)}>
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>Команда</Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>Добавить участника</Button>
      </div>

      <Table dataSource={data} columns={columns} rowKey="_id" loading={isLoading} />

      <Drawer
        title={editing ? 'Редактировать участника' : 'Новый участник'}
        open={open}
        onClose={closeModal}
        placement="right"
        styles={{ body: { paddingBottom: 80 } }}
        size="large"
        destroyOnClose
        footer={
          <Space style={{ justifyContent: 'flex-end', width: '100%', display: 'flex' }}>
            <Button onClick={closeModal}>Отмена</Button>
            <Button type="primary" onClick={form.submit} loading={create.isPending || update.isPending}>
              {editing ? 'Сохранить' : 'Создать'}
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Divider orientation="left" style={{ fontSize: 13 }}>Основные поля</Divider>
          <Space style={{ width: '100%' }} size={12}>
            <Form.Item name="memberId" label="ID участника" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="azizbek" />
            </Form.Item>
            <Form.Item name="initials" label="Инициалы" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="AI" maxLength={2} />
            </Form.Item>
          </Space>
          <Space style={{ width: '100%' }} size={12}>
            <Form.Item name="color1" label="Цвет 1" rules={[{ required: true }]} style={{ flex: 1 }}>
              <ColorInput placeholder="#0ea5e9" />
            </Form.Item>
            <Form.Item name="color2" label="Цвет 2" rules={[{ required: true }]} style={{ flex: 1 }}>
              <ColorInput placeholder="#7c3aed" />
            </Form.Item>
          </Space>
          <Form.Item name="avatar" label="URL аватара">
            <Input placeholder="/images/team/azizbek.jpg" />
          </Form.Item>

          <Divider orientation="left" style={{ fontSize: 13 }}>Социальные сети</Divider>
          <Space style={{ width: '100%' }} size={12}>
            <Form.Item name="telegram" label="Telegram" style={{ flex: 1 }}>
              <Input placeholder="https://t.me/..." />
            </Form.Item>
            <Form.Item name="github" label="GitHub" style={{ flex: 1 }}>
              <Input placeholder="https://github.com/..." />
            </Form.Item>
            <Form.Item name="linkedin" label="LinkedIn" style={{ flex: 1 }}>
              <Input placeholder="https://linkedin.com/in/..." />
            </Form.Item>
          </Space>
          <Form.Item name="active" label="Активен на сайте" valuePropName="checked" initialValue={true}>
            <Switch checkedChildren="Да" unCheckedChildren="Нет" />
          </Form.Item>

          <Divider orientation="left" style={{ fontSize: 13 }}>Тексты на 3 языках</Divider>
          <TranslationTabs fields={TRANSLATION_FIELDS} />
        </Form>
      </Drawer>
    </div>
  );
}
