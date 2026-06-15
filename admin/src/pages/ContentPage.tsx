import { Tabs, Form, Input, Button, Typography, message, Collapse, Spin, Space, Tooltip } from 'antd';
import {
  SaveOutlined, DownloadOutlined, ReloadOutlined,
  RocketOutlined, BankOutlined, AppstoreOutlined, SyncOutlined,
  PhoneOutlined, MessageOutlined, TeamOutlined, PushpinOutlined, CompassOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getContentBySection, upsertContent, seedDefaults, seedForce } from '../api/content';

const { TextArea } = Input;
const { Panel } = Collapse;

const LANGS = [
  { key: 'ru', label: '🇷🇺 Русский' },
  { key: 'uz', label: '🇺🇿 O\'zbek' },
  { key: 'en', label: '🇬🇧 English' },
];

interface SectionField { key: string; label: string; type?: 'input' | 'textarea'; rows?: number }
interface SectionDef { id: string; label: string; fields: SectionField[] }

const ICON_STYLE = { marginRight: 8, fontSize: 14 };

const SECTION_LABELS: Record<string, React.ReactNode> = {
  hero:         <><RocketOutlined  style={ICON_STYLE} />Главный экран (Hero)</>,
  about:        <><BankOutlined    style={ICON_STYLE} />О компании (About)</>,
  services:     <><AppstoreOutlined style={ICON_STYLE}/>Услуги (Services)</>,
  process:      <><SyncOutlined    style={ICON_STYLE} />Процесс работы (Process)</>,
  contact:      <><PhoneOutlined   style={ICON_STYLE} />Контакты (Contact)</>,
  testimonials: <><MessageOutlined style={ICON_STYLE} />Отзывы (Testimonials)</>,
  clients:      <><TeamOutlined    style={ICON_STYLE} />Клиенты (Clients)</>,
  footer:       <><PushpinOutlined style={ICON_STYLE} />Подвал (Footer)</>,
  nav:          <><CompassOutlined style={ICON_STYLE} />Навигация (Navbar)</>,
};

const SECTIONS: SectionDef[] = [
  {
    id: 'hero', label: 'Главный экран (Hero)',
    fields: [
      { key: 'badge', label: 'Бейдж над заголовком' },
      { key: 'title', label: 'Заголовок' },
      { key: 'titleAccent', label: 'Акцентная часть заголовка' },
      { key: 'subtitle', label: 'Подзаголовок', type: 'textarea', rows: 2 },
      { key: 'ctaPrimary', label: 'Кнопка основная' },
      { key: 'ctaSecondary', label: 'Кнопка вторичная' },
      { key: 'stat1Value', label: 'Статистика 1 — Значение' },
      { key: 'stat1Label', label: 'Статистика 1 — Подпись' },
      { key: 'stat2Value', label: 'Статистика 2 — Значение' },
      { key: 'stat2Label', label: 'Статистика 2 — Подпись' },
      { key: 'stat3Value', label: 'Статистика 3 — Значение' },
      { key: 'stat3Label', label: 'Статистика 3 — Подпись' },
    ],
  },
  {
    id: 'about', label: 'О компании (About)',
    fields: [
      { key: 'label', label: 'Метка секции' },
      { key: 'title', label: 'Заголовок' },
      { key: 'desc1', label: 'Абзац 1', type: 'textarea', rows: 3 },
      { key: 'desc2', label: 'Абзац 2', type: 'textarea', rows: 3 },
      { key: 'val1', label: 'Ценность 1' },
      { key: 'val2', label: 'Ценность 2' },
      { key: 'val3', label: 'Ценность 3' },
      { key: 'val4', label: 'Ценность 4' },
      { key: 'stat1Val', label: 'Статистика 1 — Значение' },
      { key: 'stat1Label', label: 'Статистика 1 — Подпись' },
      { key: 'stat2Val', label: 'Статистика 2 — Значение' },
      { key: 'stat2Label', label: 'Статистика 2 — Подпись' },
      { key: 'stat3Val', label: 'Статистика 3 — Значение' },
      { key: 'stat3Label', label: 'Статистика 3 — Подпись' },
      { key: 'stat4Val', label: 'Статистика 4 — Значение' },
      { key: 'stat4Label', label: 'Статистика 4 — Подпись' },
    ],
  },
  {
    id: 'services', label: 'Услуги (Services)',
    fields: [
      { key: 'title', label: 'Заголовок секции' },
      { key: 'subtitle', label: 'Подзаголовок', type: 'textarea', rows: 2 },
      { key: 'ctaTitle', label: 'CTA — Заголовок' },
      { key: 'ctaDesc', label: 'CTA — Описание', type: 'textarea', rows: 2 },
      { key: 'ctaBtn', label: 'CTA — Кнопка' },
    ],
  },
  {
    id: 'process', label: 'Процесс работы (Process)',
    fields: [
      { key: 'label', label: 'Метка секции' },
      { key: 'title', label: 'Заголовок' },
      { key: 'subtitle', label: 'Подзаголовок', type: 'textarea', rows: 2 },
      { key: 'steps.discovery.title', label: 'Шаг 1 — Название' },
      { key: 'steps.discovery.desc', label: 'Шаг 1 — Описание', type: 'textarea', rows: 2 },
      { key: 'steps.design.title', label: 'Шаг 2 — Название' },
      { key: 'steps.design.desc', label: 'Шаг 2 — Описание', type: 'textarea', rows: 2 },
      { key: 'steps.dev.title', label: 'Шаг 3 — Название' },
      { key: 'steps.dev.desc', label: 'Шаг 3 — Описание', type: 'textarea', rows: 2 },
      { key: 'steps.launch.title', label: 'Шаг 4 — Название' },
      { key: 'steps.launch.desc', label: 'Шаг 4 — Описание', type: 'textarea', rows: 2 },
    ],
  },
  {
    id: 'contact', label: 'Контакты (Contact)',
    fields: [
      { key: 'title', label: 'Заголовок' },
      { key: 'subtitle', label: 'Подзаголовок', type: 'textarea', rows: 2 },
      { key: 'infoEmail', label: 'Email компании' },
      { key: 'infoPhone', label: 'Телефон компании' },
      { key: 'infoAddress', label: 'Адрес компании' },
      { key: 'name', label: 'Поле — Имя' },
      { key: 'email', label: 'Поле — Email' },
      { key: 'phone', label: 'Поле — Телефон' },
      { key: 'message', label: 'Поле — Сообщение' },
      { key: 'submit', label: 'Кнопка отправки' },
      { key: 'success', label: 'Сообщение об успехе' },
    ],
  },
  {
    id: 'testimonials', label: 'Отзывы (Testimonials)',
    fields: [
      { key: 'label', label: 'Метка секции' },
      { key: 'title', label: 'Заголовок' },
      { key: 'subtitle', label: 'Подзаголовок', type: 'textarea', rows: 2 },
      { key: 'ctaTitle', label: 'CTA — Заголовок' },
      { key: 'ctaDesc', label: 'CTA — Описание' },
      { key: 'ctaBtn', label: 'CTA — Кнопка' },
      { key: 'reviews.r1.name', label: 'Отзыв 1 — Имя' },
      { key: 'reviews.r1.position', label: 'Отзыв 1 — Должность' },
      { key: 'reviews.r1.text', label: 'Отзыв 1 — Текст', type: 'textarea', rows: 2 },
      { key: 'reviews.r2.name', label: 'Отзыв 2 — Имя' },
      { key: 'reviews.r2.position', label: 'Отзыв 2 — Должность' },
      { key: 'reviews.r2.text', label: 'Отзыв 2 — Текст', type: 'textarea', rows: 2 },
      { key: 'reviews.r3.name', label: 'Отзыв 3 — Имя' },
      { key: 'reviews.r3.position', label: 'Отзыв 3 — Должность' },
      { key: 'reviews.r3.text', label: 'Отзыв 3 — Текст', type: 'textarea', rows: 2 },
      { key: 'reviews.r4.name', label: 'Отзыв 4 — Имя' },
      { key: 'reviews.r4.position', label: 'Отзыв 4 — Должность' },
      { key: 'reviews.r4.text', label: 'Отзыв 4 — Текст', type: 'textarea', rows: 2 },
      { key: 'reviews.r5.name', label: 'Отзыв 5 — Имя' },
      { key: 'reviews.r5.position', label: 'Отзыв 5 — Должность' },
      { key: 'reviews.r5.text', label: 'Отзыв 5 — Текст', type: 'textarea', rows: 2 },
      { key: 'reviews.r6.name', label: 'Отзыв 6 — Имя' },
      { key: 'reviews.r6.position', label: 'Отзыв 6 — Должность' },
      { key: 'reviews.r6.text', label: 'Отзыв 6 — Текст', type: 'textarea', rows: 2 },
    ],
  },
  {
    id: 'clients', label: 'Клиенты (Clients)',
    fields: [
      { key: 'label', label: 'Метка секции' },
      { key: 'title', label: 'Заголовок' },
      { key: 'subtitle', label: 'Подзаголовок', type: 'textarea', rows: 2 },
      { key: 'c1', label: 'Статистика 1' },
      { key: 'c2', label: 'Статистика 2' },
      { key: 'c3', label: 'Статистика 3' },
    ],
  },
  {
    id: 'footer', label: 'Подвал (Footer)',
    fields: [
      { key: 'tagline', label: 'Слоган компании' },
      { key: 'rights', label: 'Копирайт' },
      { key: 'itpark', label: 'IT Park подпись' },
      { key: 'colServices', label: 'Колонка — Услуги' },
      { key: 'colCompany', label: 'Колонка — Компания' },
      { key: 'colContact', label: 'Колонка — Контакты' },
    ],
  },
  {
    id: 'nav', label: 'Навигация (Navbar)',
    fields: [
      { key: 'about', label: 'О нас' },
      { key: 'team', label: 'Команда' },
      { key: 'services', label: 'Услуги' },
      { key: 'products', label: 'Продукты' },
      { key: 'projects', label: 'Проекты' },
      { key: 'process', label: 'Процесс' },
      { key: 'contact', label: 'Контакт' },
      { key: 'blog', label: 'Блог' },
    ],
  },
];

function SectionForm({ section }: { section: SectionDef }) {
  const qc = useQueryClient();
  const [form] = Form.useForm();

  const { data, isLoading } = useQuery({
    queryKey: ['content', section.id],
    queryFn: () => getContentBySection(section.id),
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ru: data.ru ?? {}, uz: data.uz ?? {}, en: data.en ?? {} });
    }
  }, [data, form]);

  const save = useMutation({
    mutationFn: upsertContent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['content', section.id] });
      message.success(`✅ ${section.label} сохранено!`);
    },
    onError: () => message.error('Ошибка при сохранении'),
  });

  const onFinish = (values: { ru: Record<string, string>; uz: Record<string, string>; en: Record<string, string> }) => {
    save.mutate({ section: section.id, ru: values.ru ?? {}, uz: values.uz ?? {}, en: values.en ?? {} });
  };

  if (isLoading) return <Spin style={{ padding: 16 }} />;

  const langItems = LANGS.map((lang) => ({
    key: lang.key,
    label: lang.label,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {section.fields.map((field) => (
          <Form.Item
            key={field.key}
            name={[lang.key, field.key]}
            label={<span style={{ fontSize: 12, color: '#666' }}>{field.label}</span>}
            style={{ marginBottom: 12 }}
          >
            {field.type === 'textarea'
              ? <TextArea rows={field.rows ?? 2} placeholder={`${field.label}...`} />
              : <Input placeholder={`${field.label}...`} />
            }
          </Form.Item>
        ))}
      </div>
    ),
  }));

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Tabs items={langItems} defaultActiveKey="ru" size="small" />
      <Button
        type="primary"
        htmlType="submit"
        icon={<SaveOutlined />}
        loading={save.isPending}
        style={{ marginTop: 8 }}
      >
        Сохранить
      </Button>
    </Form>
  );
}

export default function ContentPage() {
  const qc = useQueryClient();

  const seedMut = useMutation({
    mutationFn: seedDefaults,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['content'] });
      message.success(`Загружено ${data.seeded} секций, пропущено ${data.skipped} (уже были)`);
    },
    onError: () => message.error('Ошибка при загрузке'),
  });

  const forceMut = useMutation({
    mutationFn: seedForce,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['content'] });
      message.success(`Перезаписано ${data.updated} секций`);
      window.location.reload();
    },
    onError: () => message.error('Ошибка при перезаписи'),
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>Контент сайта</Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            Редактируйте тексты на 3 языках — сохраняйте — обновляйте сайт
          </Typography.Text>
        </div>
        <Space>
          <Tooltip title="Загрузить тексты с сайта в пустые поля (не перезапишет уже сохранённые)">
            <Button
              icon={<DownloadOutlined />}
              onClick={() => seedMut.mutate()}
              loading={seedMut.isPending}
            >
              Загрузить с сайта
            </Button>
          </Tooltip>
          <Tooltip title="Перезаписать ВСЕ тексты оригинальными значениями сайта">
            <Button
              icon={<ReloadOutlined />}
              danger
              onClick={() => forceMut.mutate()}
              loading={forceMut.isPending}
            >
              Сбросить к оригиналу
            </Button>
          </Tooltip>
        </Space>
      </div>

      <Collapse accordion>
        {SECTIONS.map((section) => (
          <Panel header={<strong>{SECTION_LABELS[section.id] ?? section.label}</strong>} key={section.id}>
            <SectionForm section={section} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
