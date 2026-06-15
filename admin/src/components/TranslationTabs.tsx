import { Tabs, Form, Input } from 'antd';
import type { ReactNode } from 'react';

const { TextArea } = Input;

interface Field {
  name: string;
  label: string;
  type?: 'input' | 'textarea';
  rows?: number;
  required?: boolean;
}

interface Props {
  fields: Field[];
  prefix?: string;
}

const LANGS = [
  { key: 'ru', label: '🇷🇺 Русский' },
  { key: 'uz', label: '🇺🇿 O\'zbek' },
  { key: 'en', label: '🇬🇧 English' },
];

export default function TranslationTabs({ fields, prefix = 'translations' }: Props) {
  const items = LANGS.map((lang) => ({
    key: lang.key,
    label: lang.label,
    children: (
      <div>
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            name={[prefix, lang.key, field.name]}
            label={field.label}
            rules={field.required && lang.key === 'ru' ? [{ required: true, message: `Введите ${field.label}` }] : []}
          >
            {field.type === 'textarea' ? (
              <TextArea rows={field.rows ?? 3} placeholder={`${field.label} (${lang.key})`} />
            ) : (
              <Input placeholder={`${field.label} (${lang.key})`} />
            )}
          </Form.Item>
        ))}
      </div>
    ),
  }));

  return <Tabs items={items} defaultActiveKey="ru" size="small" style={{ marginBottom: 8 }} />;
}
