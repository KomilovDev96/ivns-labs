import { Form, Input, Tabs, Divider, Typography } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

const LANGS = [
  { key: 'ru', label: '🇷🇺 RU' },
  { key: 'uz', label: '🇺🇿 UZ' },
  { key: 'en', label: '🇬🇧 EN' },
];

function CharCount({ value = '', max }: { value?: string; max: number }) {
  const len = value.length;
  const color = len > max ? '#ff4d4f' : len > max * 0.85 ? '#faad14' : '#52c41a';
  return (
    <span style={{ fontSize: 11, color }}>
      {len}/{max}
    </span>
  );
}

function LangSeoFields({ lang }: { lang: string }) {
  return (
    <div>
      <Form.Item
        shouldUpdate={(prev, cur) => prev?.seo?.[lang]?.metaTitle !== cur?.seo?.[lang]?.metaTitle}
      >
        {({ getFieldValue }) => {
          const val = getFieldValue(['seo', lang, 'metaTitle']) || '';
          return (
            <Form.Item
              name={['seo', lang, 'metaTitle']}
              label={
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  Meta Title
                  <CharCount value={val} max={60} />
                </span>
              }
              extra={<Text type="secondary" style={{ fontSize: 11 }}>Рекомендуется 50–60 символов</Text>}
            >
              <Input placeholder="Краткий заголовок для поисковика" maxLength={80} />
            </Form.Item>
          );
        }}
      </Form.Item>

      <Form.Item
        shouldUpdate={(prev, cur) => prev?.seo?.[lang]?.metaDescription !== cur?.seo?.[lang]?.metaDescription}
      >
        {({ getFieldValue }) => {
          const val = getFieldValue(['seo', lang, 'metaDescription']) || '';
          return (
            <Form.Item
              name={['seo', lang, 'metaDescription']}
              label={
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  Meta Description
                  <CharCount value={val} max={160} />
                </span>
              }
              extra={<Text type="secondary" style={{ fontSize: 11 }}>Рекомендуется 130–160 символов</Text>}
            >
              <TextArea rows={3} placeholder="Описание страницы для Google, Yandex…" maxLength={200} />
            </Form.Item>
          );
        }}
      </Form.Item>

      <Form.Item
        name={['seo', lang, 'keywords']}
        label="Keywords"
        extra={<Text type="secondary" style={{ fontSize: 11 }}>Через запятую: AI агент, автоматизация, CRM</Text>}
      >
        <Input placeholder="ключевое слово 1, ключевое слово 2, …" />
      </Form.Item>
    </div>
  );
}

export default function SeoFields() {
  return (
    <>
      <Divider orientation="left" style={{ fontSize: 13 }}>
        <GlobalOutlined style={{ marginRight: 6 }} />
        SEO настройки
      </Divider>

      <Form.Item
        name={['seo', 'ogImage']}
        label="OG Image (общее для всех языков)"
        extra={<Text type="secondary" style={{ fontSize: 11 }}>URL картинки для соцсетей 1200×630px</Text>}
      >
        <Input placeholder="https://ivnlabs.uz/images/og/post.jpg" />
      </Form.Item>

      <Tabs
        size="small"
        items={LANGS.map((lang) => ({
          key: lang.key,
          label: lang.label,
          children: <LangSeoFields lang={lang.key} />,
        }))}
      />
    </>
  );
}
