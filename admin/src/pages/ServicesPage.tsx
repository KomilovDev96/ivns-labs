import {
  Table, Button, Drawer, Form, Input, Switch,
  Space, Tag, Popconfirm, Typography, message, Divider, Select,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getServices, createService, updateService, deleteService } from '../api/services';
import type { Service } from '../types';
import TranslationTabs from '../components/TranslationTabs';
import ColorInput from '../components/ColorInput';
import SeoFields from '../components/SeoFields';

const TRANSLATION_FIELDS = [
  { name: 'title', label: 'Название услуги', required: true },
  { name: 'subtitle', label: 'Подзаголовок', type: 'textarea' as const, rows: 2 },
  { name: 'features', label: 'Возможности (через запятую)', type: 'textarea' as const, rows: 3 },
];

export default function ServicesPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form] = Form.useForm();

  const { data, isLoading } = useQuery({ queryKey: ['services'], queryFn: getServices });

  const create = useMutation({
    mutationFn: createService,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['services'] }); closeModal(); message.success('Услуга создана!'); },
    onError: () => message.error('Ошибка при создании'),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Service> }) => updateService(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['services'] }); closeModal(); message.success('Услуга обновлена!'); },
    onError: () => message.error('Ошибка при обновлении'),
  });

  const remove = useMutation({
    mutationFn: deleteService,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['services'] }); message.success('Услуга удалена!'); },
  });

  const openCreate = () => { setEditing(null); form.resetFields(); setOpen(true); };
  const openEdit = (s: Service) => { setEditing(s); form.setFieldsValue(s); setOpen(true); };
  const closeModal = () => { setOpen(false); setEditing(null); form.resetFields(); };
  const onFinish = (values: Omit<Service, '_id'>) => {
    if (editing) update.mutate({ id: editing._id, data: values });
    else create.mutate(values);
  };

  const columns = [
    {
      title: 'Название (RU)', key: 'title',
      render: (_: unknown, r: Service) => r.translations?.ru?.title ?? <span style={{ color: '#999' }}>—</span>,
    },
    { title: 'ID', dataIndex: 'serviceId', key: 'serviceId', width: 130 },
    { title: 'Тег', dataIndex: 'tag', key: 'tag', width: 120 },
    {
      title: 'Цвета', key: 'colors',
      render: (_: unknown, r: Service) => (
        <Space>
          <Tag color={r.color1}>{r.color1}</Tag>
          <Tag color={r.color2}>{r.color2}</Tag>
        </Space>
      ),
    },
    {
      title: 'Статус', dataIndex: 'active', key: 'active', width: 100,
      render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? 'Активна' : 'Скрыта'}</Tag>,
    },
    {
      title: 'Действия', key: 'actions', width: 100,
      render: (_: unknown, record: Service) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => openEdit(record)} />
          <Popconfirm title="Удалить услугу?" onConfirm={() => remove.mutate(record._id)}>
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>Услуги</Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>Добавить услугу</Button>
      </div>

      <Table dataSource={data} columns={columns} rowKey="_id" loading={isLoading} />

      <Drawer
        title={editing ? 'Редактировать услугу' : 'Новая услуга'}
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
            <Form.Item name="serviceId" label="ID услуги" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="integration" />
            </Form.Item>
            <Form.Item name="tag" label="Тег (краткий)" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="1C / ERP" />
            </Form.Item>
          </Space>
          <Space style={{ width: '100%' }} size={12}>
            <Form.Item name="color1" label="Цвет 1" rules={[{ required: true }]} style={{ flex: 1 }}>
              <ColorInput placeholder="#0ea5e9" />
            </Form.Item>
            <Form.Item name="color2" label="Цвет 2" rules={[{ required: true }]} style={{ flex: 1 }}>
              <ColorInput placeholder="#0284c7" />
            </Form.Item>
          </Space>
          <Form.Item name="active" label="Активна на сайте" valuePropName="checked" initialValue={true}>
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
