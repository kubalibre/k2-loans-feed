import { Label, ListBox, Select } from "@heroui/react";
import type { Key } from "react";

export interface SelectOption {
  id: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  selectedKey: string;
  options: SelectOption[];
  onChange: (key: string) => void;
}

export function FilterSelect({ label, selectedKey, options, onChange }: FilterSelectProps) {
  return (
    <Select
      className="w-full"
      variant="secondary"
      selectedKey={selectedKey}
      onSelectionChange={(key: Key | null) => {
        if (key != null) onChange(String(key));
      }}
    >
      <Label>{label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((o) => (
            <ListBox.Item key={o.id} id={o.id} textValue={o.label}>
              {o.label}
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
