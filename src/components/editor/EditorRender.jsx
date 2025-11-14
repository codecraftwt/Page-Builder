import { useState } from "react";

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
        className="w-12 h-10 cursor-pointer"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="#000000"
      />
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
        className="w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 text-left font-medium flex justify-between items-center"
      >
        {title}
        <span className={`transform transition ${open ? "rotate-180" : ""}`}>▼</span>
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

  const fontOptions = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Helvetica, sans-serif", label: "Helvetica" },
    { value: "Times New Roman, serif", label: "Times New Roman" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Verdana, sans-serif", label: "Verdana" },
    { value: "Courier New, monospace", label: "Courier New" },
  ];

  const layoutOptions = [
    { value: "single", label: "Single Column" },
    { value: "grid", label: "Grid Layout" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 font-sans">
      <Section title="Basic Content" defaultOpen={true}>
        <Input label="Page Title" value={data.title} onChange={(v) => update("title", v)} max={80} />
        <Input label="Description" value={data.description} onChange={(v) => update("description", v)} type="textarea" max={500} />
        <Input label="Company Name" value={data.company} onChange={(v) => update("company", v)} />
        <Input label="Location" value={data.location} onChange={(v) => update("location", v)} />
        <Input label="Salary Range" value={data.salary} onChange={(v) => update("salary", v)} />
        <Input label="Email" value={data.email || ""} onChange={(v) => update("email", v)} type="email" />
        <Input label="Phone" value={data.phone || ""} onChange={(v) => update("phone", v)} />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
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
        {/* <Select label="Layout" value={data.layout || "single"} onChange={(v) => update("layout", v)} options={layoutOptions} /> */}

        <div className="grid grid-cols-2 gap-3">
          <ColorInput label="Primary" value={data.colors?.primary || "#3b82f6"} onChange={(v) => update("colors", { ...data.colors, primary: v })} />
          <ColorInput label="Secondary" value={data.colors?.secondary || "#6b7280"} onChange={(v) => update("colors", { ...data.colors, secondary: v })} />
          <ColorInput label="Tertiary" value={data.colors?.tertiary || "#9ca3af"} onChange={(v) => update("colors", { ...data.colors, tertiary: v })} />
          <ColorInput label="Background" value={data.colors?.bg || "#ffffff"} onChange={(v) => update("colors", { ...data.colors, bg: v })} />
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

      {/* <Section title="Services">
        {(data.services || []).map((s, i) => (
          <ListItem
            key={i}
            item={s}
            onUpdate={(field, v) => updateNested("services", i, field, v)}
            onRemove={() => removeItem("services", i)}
            fields={[
              { key: "title", label: "Service Title" },
              { key: "description", label: "Description", type: "textarea" },
            ]}
          />
        ))}
        <button onClick={() => addItem("services", { title: "", description: "" })} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + Add Service
        </button>
      </Section>

      <Section title="Team Members">
        {(data.team || []).map((m, i) => (
          <ListItem
            key={i}
            item={m}
            onUpdate={(field, v) => updateNested("team", i, field, v)}
            onRemove={() => removeItem("team", i)}
            fields={[
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              { key: "bio", label: "Bio", type: "textarea" },
            ]}
          />
        ))}
        <button onClick={() => addItem("team", { name: "", role: "", bio: "" })} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + Add Member
        </button>
      </Section> */}

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

      {/* <Section title="FAQ">
        {(data.faq || []).map((q, i) => (
          <ListItem
            key={i}
            item={q}
            onUpdate={(field, v) => updateNested("faq", i, field, v)}
            onRemove={() => removeItem("faq", i)}
            fields={[
              { key: "question", label: "Question" },
              { key: "answer", label: "Answer", type: "textarea" },
            ]}
          />
        ))}
        <button onClick={() => addItem("faq", { question: "", answer: "" })} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + Add FAQ
        </button>
      </Section>

      <Section title="Social Links">
        <Input label="LinkedIn" value={data.socialLinks?.linkedin || ""} onChange={(v) => update("socialLinks", { ...data.socialLinks, linkedin: v })} />
        <Input label="Twitter" value={data.socialLinks?.twitter || ""} onChange={(v) => update("socialLinks", { ...data.socialLinks, twitter: v })} />
        <Input label="GitHub" value={data.socialLinks?.github || ""} onChange={(v) => update("socialLinks", { ...data.socialLinks, github: v })} />
      </Section> */}
    </div>
  );
}