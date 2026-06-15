import {
  Table, Button, Drawer, Form, Input, Select, Switch,
  Space, Tag, Popconfirm, Typography, message, Divider,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../api/blog';
import type { BlogPost } from '../types';
import TranslationTabs from '../components/TranslationTabs';
import ColorInput from '../components/ColorInput';
import SeoFields from '../components/SeoFields';

const CATEGORIES = [
  { value: 'tech', label: 'Технологии' },
  { value: 'business', label: 'Бизнес' },
  { value: 'ai', label: 'AI / ML' },
  { value: 'design', label: 'Дизайн' },
  { value: 'news', label: 'Новости' },
];

const CATEGORY_COLORS: Record<string, string> = {
  tech: 'blue', business: 'gold', ai: 'purple', design: 'magenta', news: 'green',
};

const TRANSLATION_FIELDS = [
  { name: 'title', label: 'Заголовок', required: true },
  { name: 'excerpt', label: 'Краткое описание', type: 'textarea' as const, rows: 2 },
  { name: 'content', label: 'Полный текст статьи', type: 'textarea' as const, rows: 8 },
];

export default function BlogPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form] = Form.useForm();

  const { data, isLoading } = useQuery({ queryKey: ['blog'], queryFn: getBlogPosts });

  const create = useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['blog'] }); closeModal(); message.success('Статья создана!'); },
    onError: () => message.error('Ошибка при создании'),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BlogPost> }) => updateBlogPost(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['blog'] }); closeModal(); message.success('Статья обновлена!'); },
    onError: () => message.error('Ошибка при обновлении'),
  });

  const remove = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['blog'] }); message.success('Статья удалена!'); },
  });

  const openCreate = () => { setEditing(null); form.resetFields(); setOpen(true); };
  const openEdit = (post: BlogPost) => {
    setEditing(post);
    form.setFieldsValue(post);
    setOpen(true);
  };
  const closeModal = () => { setOpen(false); setEditing(null); form.resetFields(); };
  const onFinish = (values: Omit<BlogPost, '_id' | 'createdAt'>) => {
    if (editing) update.mutate({ id: editing._id, data: values });
    else create.mutate(values);
  };

  const columns = [
    {
      title: 'Заголовок (RU)', key: 'title',
      render: (_: unknown, r: BlogPost) => r.translations?.ru?.title ?? <span style={{ color: '#999' }}>—</span>,
    },
    { title: 'Slug', dataIndex: 'slug', key: 'slug', width: 200 },
    {
      title: 'Категория', dataIndex: 'category', key: 'category', width: 130,
      render: (cat: string) => <Tag color={CATEGORY_COLORS[cat]}>{CATEGORIES.find(c => c.value === cat)?.label}</Tag>,
    },
    { title: 'Дата', dataIndex: 'date', key: 'date', width: 110 },
    { title: 'Время чтения', dataIndex: 'readTime', key: 'readTime', width: 120 },
    {
      title: 'Опубликован', dataIndex: 'published', key: 'published', width: 120,
      render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? 'Да' : 'Нет'}</Tag>,
    },
    {
      title: 'Действия', key: 'actions', width: 100,
      render: (_: unknown, record: BlogPost) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => openEdit(record)} />
          <Popconfirm title="Удалить статью?" onConfirm={() => remove.mutate(record._id)}>
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>Блог</Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>Добавить статью</Button>
      </div>

      <Table dataSource={data} columns={columns} rowKey="_id" loading={isLoading} />

      <Drawer
        title={editing ? 'Редактировать статью' : 'Новая статья'}
        open={open}
        onClose={closeModal}
        placement="right"
        styles={{ body: { paddingBottom: 80 } }}
        style={{ maxWidth: 680 }}
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
              <Input placeholder="ai-agents-for-business" />
            </Form.Item>
            <Form.Item name="category" label="Категория" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Select options={CATEGORIES} />
            </Form.Item>
          </Space>
          <Space style={{ width: '100%' }} size={12}>
            <Form.Item name="date" label="Дата публикации" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="2024-12-15" />
            </Form.Item>
            <Form.Item name="readTime" label="Время чтения" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="7 мин" />
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
          <Form.Item name="image" label="URL изображения">
            <Input placeholder="/images/blog/post.jpg" />
          </Form.Item>
          <Form.Item name="published" label="Опубликован" valuePropName="checked" initialValue={true}>
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
