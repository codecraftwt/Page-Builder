import { useState } from "react";
import { Plus, AlignLeft, AlignCenter, AlignRight, AlignJustify, Settings } from 'lucide-react';
import StyleEditorModal from './StyleEditorModal';

const Input = ({ label, value, onChange, type = "text", placeholder, max }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, max))}
        placeholder={placeholder}
        rows="3"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
);

const ColorInput = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="flex gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-10 cursor-pointer rounded"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        placeholder="#000000"
      />
    </div>
  </div>
);

const SliderInput = ({ label, value, onChange, min = 0, max = 100, step = 1, unit = "px" }) => {
  const [inputVal, setInputVal] = useState(value);
  const handleSlider = (e) => {
    const val = e.target.value;
    setInputVal(val);
    onChange(val + unit);
  };
  const handleInput = (e) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setInputVal(val);
    if (val && !isNaN(val)) {
      const num = Math.min(max, Math.max(min, parseFloat(val)));
      onChange(num + unit);
    }
  };
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={parseFloat(value) || min}
          onChange={handleSlider}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <input
          type="text"
          value={inputVal}
          onChange={handleInput}
          onBlur={() => setInputVal(parseFloat(value) || min)}
          className="w-16 px-2 py-1 text-sm text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-xs text-gray-500">{unit}</span>
      </div>
    </div>
  );
};

const IconSelect = ({ label, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="flex gap-2 justify-between bg-gray-50 p-1 rounded-md">
      {options.map((opt) => {
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 p-3 rounded transition-all flex items-center justify-center gap-1 text-sm font-medium
              ${value === opt.value
                ? 'bg-white text-blue-600 shadow-sm ring-1 ring-blue-500'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
            title={opt.label}
          >
            <Icon size={16} />
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const Section = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-md mb-4 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 text-left font-medium flex justify-between items-center transition"
      >
        {title}
        <span className={`transform transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          <Plus size={18} />
        </span>
      </button>
      {open && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};

const ListItem = ({ item, onUpdate, onRemove, fields }) => (
  <div className="p-3 border rounded-md bg-gray-50 mb-3">
    {fields.map((field) => (
      <Input
        key={field.key}
        label={field.label}
        value={item[field.key]}
        onChange={(v) => onUpdate(field.key, v)}
        type={field.type || "text"}
        placeholder={field.placeholder}
      />
    ))}
    <button
      onClick={onRemove}
      className="text-red-600 text-sm hover:underline"
    >
      Remove
    </button>
  </div>
);

export default function SimpleEditor({ data, setData }) {
  const [styleModal, setStyleModal] = useState({ isOpen: false, fieldType: null });

  const update = (key, value) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const updateNested = (key, index, field, value) => {
    const list = [...(data[key] || [])];
    list[index][field] = value;
    update(key, list);
  };

  const addItem = (key, template) =>
    update(key, [...(data[key] || []), template]);

  const removeItem = (key, index) =>
    update(key, data[key].filter((_, i) => i !== index));

  const openStyleModal = (fieldType) => {
    setStyleModal({ isOpen: true, fieldType });
  };

  const closeStyleModal = () => {
    setStyleModal({ isOpen: false, fieldType: null });
  };

  const updateStyles = (fieldType, newStyles) => {
    update(`${fieldType}Styles`, newStyles);
  };

  // const blurBackground = styleModal.isOpen ? "filter blur-sm pointer-events-none" : "";

  const fontOptions = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Helvetica, sans-serif", label: "Helvetica" },
    { value: "Times New Roman, serif", label: "Times New Roman" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Verdana, sans-serif", label: "Verdana" },
    { value: "Courier New, monospace", label: "Courier New" },
  ];

  const alignmentOptions = [
    { value: "left", label: "Left", icon: AlignLeft },
    { value: "center", label: "Center", icon: AlignCenter },
    { value: "right", label: "Right", icon: AlignRight },
    { value: "justify", label: "Justify", icon: AlignJustify },
  ];

  return (
    <div className={`max-w-2xl mx-auto p-4 space-y-6 font-sans`}>
      <Section title="Basic Content" defaultOpen={true}>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Page Title</label>
          <button
            onClick={() => openStyleModal("title")}
            className="p-1 text-gray-500 hover:text-blue-600 transition"
            title="Style Title"
          >
            <Settings size={16} />
          </button>
        </div>
        <Input label="" value={data.title} onChange={(v) => update("title", v)} max={80} />
        <Input label="Description" value={data.description} onChange={(v) => update("description", v)} type="textarea" max={500} />
        <Input label="Company Name" value={data.company} onChange={(v) => update("company", v)} />
        <Input label="Location" value={data.location} onChange={(v) => update("location", v)} />
        <Input label="Salary Range" value={data.salary} onChange={(v) => update("salary", v)} />
        <Input label="Email" value={data.email || ""} onChange={(v) => update("email", v)} type="email" />
        <Input label="Phone" value={data.phone || ""} onChange={(v) => update("phone", v)} />
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">Hero Image</label>
            <button
              onClick={() => openStyleModal("heroImage")}
              className="p-1 text-gray-500 hover:text-blue-600 transition"
              title="Style Hero Image"
            >
              <Settings size={16} />
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => update("heroImage", reader.result);
                reader.readAsDataURL(file);
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700"
          />
        </div>
      </Section>

      <Section title="Design & Styling" defaultOpen={true}>
        <Select label="Font Family" value={data.fontFamily || "Arial, sans-serif"} onChange={(v) => update("fontFamily", v)} options={fontOptions} />
        <div className="grid grid-cols-2 gap-3">
          <ColorInput label="Primary" value={data.colors?.primary || "#3b82f6"} onChange={(v) => update("colors", { ...data.colors, primary: v })} />
          <ColorInput label="Secondary" value={data.colors?.secondary || "#6b7280"} onChange={(v) => update("colors", { ...data.colors, secondary: v })} />
          <ColorInput label="Tertiary" value={data.colors?.tertiary || "#9ca3af"} onChange={(v) => update("colors", { ...data.colors, tertiary: v })} />
          <ColorInput label="Background" value={data.colors?.bg || "#ffffff"} onChange={(v) => update("colors", { ...data.colors, bg: v })} />
          <ColorInput label="Text Color" value={data.colors?.text || "#1f2937"} onChange={(v) => update("colors", { ...data.colors, text: v })} />
          <ColorInput label="Heading Color" value={data.colors?.heading || "#1f2937"} onChange={(v) => update("colors", { ...data.colors, heading: v })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SliderInput
            label="Title Font Size"
            value={parseFloat(data.titleFontSize) || 48}
            onChange={(v) => update("titleFontSize", v)}
            min={24}
            max={72}
            unit="px"
          />
          <SliderInput
            label="Description Font Size"
            value={parseFloat(data.descriptionFontSize) || 20}
            onChange={(v) => update("descriptionFontSize", v)}
            min={12}
            max={32}
            unit="px"
          />
          <SliderInput
            label="Heading Font Size"
            value={parseFloat(data.headingFontSize) || 32}
            onChange={(v) => update("headingFontSize", v)}
            min={16}
            max={48}
            unit="px"
          />
          <SliderInput
            label="Body Font Size"
            value={parseFloat(data.bodyFontSize) || 16}
            onChange={(v) => update("bodyFontSize", v)}
            min={12}
            max={24}
            unit="px"
          />
          <SliderInput
            label="Button Border Radius"
            value={parseFloat(data.buttonBorderRadius) || 8}
            onChange={(v) => update("buttonBorderRadius", v)}
            min={0}
            max={32}
            unit="px"
          />
          <SliderInput
            label="Card Border Radius"
            value={parseFloat(data.cardBorderRadius) || 8}
            onChange={(v) => update("cardBorderRadius", v)}
            min={0}
            max={32}
            unit="px"
          />
        </div>

        <IconSelect
          label="Text Alignment"
          value={data.textAlign || "center"}
          onChange={(v) => update("textAlign", v)}
          options={alignmentOptions}
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Background Gradient</label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={data.bgGradientEnabled || false}
              onChange={(e) => update("bgGradientEnabled", e.target.checked)}
            />
            <span className="text-sm">Enable Gradient</span>
          </div>
          {data.bgGradientEnabled && (
            <div className="grid grid-cols-2 gap-3">
              <ColorInput label="Gradient Start" value={data.bgGradientStart || "#ffffff"} onChange={(v) => update("bgGradientStart", v)} />
              <ColorInput label="Gradient End" value={data.bgGradientEnd || "#f8fafc"} onChange={(v) => update("bgGradientEnd", v)} />
            </div>
          )}
        </div>
      </Section>

      <Section title="Features">
        {(data.features || []).map((f, i) => (
          <ListItem
            key={i}
            item={f}
            onUpdate={(field, v) => updateNested("features", i, field, v)}
            onRemove={() => removeItem("features", i)}
            fields={[
              { key: "title", label: "Feature Title" },
              { key: "description", label: "Description", type: "textarea" },
            ]}
          />
        ))}
        <button onClick={() => addItem("features", { title: "", description: "" })} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + Add Feature
        </button>
      </Section>

      <Section title="Testimonials">
        {(data.testimonials || []).map((t, i) => (
          <ListItem
            key={i}
            item={t}
            onUpdate={(field, v) => updateNested("testimonials", i, field, v)}
            onRemove={() => removeItem("testimonials", i)}
            fields={[
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              { key: "comment", label: "Comment", type: "textarea" },
            ]}
          />
        ))}
        <button onClick={() => addItem("testimonials", { name: "", role: "", comment: "" })} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + Add Testimonial
        </button>
      </Section>

      <StyleEditorModal
        isOpen={styleModal.isOpen}
        onClose={closeStyleModal}
        fieldType={styleModal.fieldType}
        styles={data[`${styleModal.fieldType}Styles`] || {}}
        onUpdateStyles={updateStyles}
      />
    </div>
  );
}