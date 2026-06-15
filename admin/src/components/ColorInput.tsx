import { Input } from 'antd';
import { useState, useEffect } from 'react';

interface Props {
  name: string;
  form: any;
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
}

export default function ColorInput({ placeholder, value = '', onChange }: Props) {
  const [color, setColor] = useState(value);

  useEffect(() => { setColor(value); }, [value]);

  const handle = (val: string) => {
    setColor(val);
    onChange?.(val);
  };

  const isValid = /^#[0-9a-fA-F]{3,6}$/.test(color);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          width: 32, height: 32, borderRadius: 6, flexShrink: 0,
          background: isValid ? color : '#e5e7eb',
          border: '1px solid #d9d9d9',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <input
          type="color"
          value={isValid ? color : '#000000'}
          onChange={(e) => handle(e.target.value)}
          style={{
            position: 'absolute', inset: 0, opacity: 0,
            width: '100%', height: '100%', cursor: 'pointer',
            border: 'none', padding: 0,
          }}
          title="Выбрать цвет"
        />
      </div>
      <Input
        value={color}
        onChange={(e) => handle(e.target.value)}
        placeholder={placeholder ?? '#000000'}
        style={{ flex: 1 }}
      />
    </div>
  );
}
