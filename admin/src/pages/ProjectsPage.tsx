import {
  Table, Button, Drawer, Form, Input, Select, Switch,
  InputNumber, Space, Tag, Popconfirm, Typography, message, Divider,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../api/projects';
import type { Project } from '../types';
import TranslationTabs from '../components/TranslationTabs';
import ColorInput from '../components/ColorInput';
import SeoFields from '../components/SeoFields';

const CATEGORIES = [
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'fintech', label: 'FinTech' },
  { value: 'crm', label: 'CRM' },
  { value: 'analytics', label: 'Аналитика' },
  { value: 'automation', label: 'Автоматизация' },
  { value: 'erp', label: 'ERP / 1C' },
];

const TRANSLATION_FIELDS = [
  { name: 'title', label: 'Название проекта', required: true },
  { name: 'desc', label: 'Описание', type: 'textarea' as const, rows: 2 },
  { name: 'challenge', label: 'Задача / Проблема', type: 'textarea' as const, rows: 3 },
  { name: 'solution', label: 'Решение', type: 'textarea' as const, rows: 3 },
  { name: 'result', label: 'Результат', type: 'textarea' as const, rows: 3 },
];

export default function ProjectsPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form] = Form.useForm();

  const { data, isLoading } = useQuery({ queryKey: ['projects'], queryFn: getProjects });

  const create = useMutation({
    mutationFn: createProject,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['projects'] }); closeModal(); message.success('Проект создан!'); },
    onError: () => message.error('Ошибка при создании'),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => updateProject(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['projects'] }); closeModal(); message.success('Проект обновлён!'); },
    onError: () => message.error('Ошибка при обновлении'),
  });

  const remove = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['projects'] }); message.success('Проект удалён!'); },
  });

  const openCreate = () => { setEditing(null); form.resetFields(); setOpen(true); };
  const openEdit = (p: Project) => { setEditing(p); form.setFieldsValue(p); setOpen(true); };
  const closeModal = () => { setOpen(false); setEditing(null); form.resetFields(); };
  const onFinish = (values: Omit<Project, '_id' | 'createdAt'>) => {
    if (editing) update.mutate({ id: editing._id, data: values });
    else create.mutate(values);
  };

  const columns = [
    {
      title: 'Название (RU)', key: 'title',
      render: (_: unknown, r: Project) => r.translations?.ru?.title ?? <span style={{ color: '#999' }}>—</span>,
    },
    { title: 'Тег', dataIndex: 'tag', key: 'tag', width: 120 },
    {
      title: 'Категория', dataIndex: 'category', key: 'category', width: 130,
      render: (c: string) => <Tag color="blue">{CATEGORIES.find(x => x.value === c)?.label}</Tag>,
    },
    { title: 'Год', dataIndex: 'year', key: 'year', width: 70 },
    { title: 'Срок', dataIndex: 'duration', key: 'duration', width: 90 },
    {
      title: 'Избранный', dataIndex: 'featured', key: 'featured', width: 100,
      render: (v: boolean) => <Tag color={v ? 'gold' : 'default'}>{v ? 'Да' : 'Нет'}</Tag>,
    },
    {
      title: 'Действия', key: 'actions', width: 100,
      render: (_: unknown, record: Project) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => openEdit(record)} />
          <Popconfirm title="Удалить проект?" onConfirm={() => remove.mutate(record._id)}>
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>Проекты</Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>Добавить проект</Button>
      </div>

      <Table dataSource={data} columns={columns} rowKey="_id" loading={isLoading} />

      <Drawer
        title={editing ? 'Редактировать проект' : 'Новый проект'}
        open={open}
        onClose={closeModal}
        placement="right"
        styles={{ body: { paddingBottom: 80 } }}
        style={{ maxWidth: 720 }}
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
            <Form.Item name="slug" label="Slug (URL)" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="ecommerce-platform" />
            </Form.Item>
            <Form.Item name="tag" label="Тег" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="E-Commerce" />
            </Form.Item>
          </Space>
          <Space style={{ width: '100%' }} size={12}>
            <Form.Item name="category" label="Категория" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Select options={CATEGORIES} />
            </Form.Item>
            <Form.Item name="year" label="Год" rules={[{ required: true }]} style={{ flex: 1 }}>
              <InputNumber style={{ width: '100%' }} min={2020} max={2030} />
            </Form.Item>
            <Form.Item name="duration" label="Срок" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="4 мес" />
            </Form.Item>
          </Space>
          <Space style={{ width: '100%' }} size={12}>
            <Form.Item name="color" label="Цвет 1" rules={[{ required: true }]} style={{ flex: 1 }}>
              <ColorInput placeholder="#0ea5e9" />
            </Form.Item>
            <Form.Item name="color2" label="Цвет 2" rules={[{ required: true }]} style={{ flex: 1 }}>
              <ColorInput placeholder="#7c3aed" />
            </Form.Item>
          </Space>
          <Form.Item name="stack" label="Стек технологий" rules={[{ required: true }]}>
            <Select mode="tags" placeholder="Next.js, Node.js, PostgreSQL..." />
          </Form.Item>
          <Space style={{ width: '100%' }} size={12}>
            <Form.Item name="statValue" label="Показатель" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="+340%" />
            </Form.Item>
            <Form.Item name="statLabel" label="Подпись показателя" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="конверсия" />
            </Form.Item>
          </Space>
          <Form.Item name="image" label="URL изображения">
            <Input placeholder="/images/projects/ecom.jpg" />
          </Form.Item>
          <Form.Item name="featured" label="Избранный проект" valuePropName="checked" initialValue={false}>
            <Switch checkedChildren="Да" unCheckedChildren="Нет" />
          </Form.Item>

          <Divider orientation="left" style={{ fontSize: 13 }}>Тексты на 3 языках</Divider>
          <TranslationTabs fields={TRANSLATION_FIELDS} />

          <SeoFields />
        </Form>
      </Drawer>
    </div>
  );
}
