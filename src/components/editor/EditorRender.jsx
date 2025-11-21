import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Settings, AlignLeft, AlignCenter, AlignRight, AlignJustify, Trash, ChevronDown, ChevronUp } from "lucide-react";
import { updatePageData, removeSection } from "../../store/slices/editorSlice";
import StyleEditorModal from './StyleEditorModal';
import AddSectionModal from './AddSectionModal';
import ImageUploader from './ImageUploader';



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

export default function EditorRender({ styleModal, setStyleModal }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.editor.pageData);

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

  const sections = [
    { id: "basic", title: "Basic Content", defaultOpen: true, content: (
      <>
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
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <button
            onClick={() => openStyleModal("description")}
            className="p-1 text-gray-500 hover:text-blue-600 transition"
            title="Style Description"
          >
            <Settings size={16} />
          </button>
        </div>
        <Input label="" value={data.description} onChange={(v) => update("description", v)} type="textarea" max={500} />
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <button
            onClick={() => openStyleModal("company")}
            className="p-1 text-gray-500 hover:text-blue-600 transition"
            title="Style Company Name"
          >
            <Settings size={16} />
          </button>
        </div>
        <Input label="" value={data.company} onChange={(v) => update("company", v)} />
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <button
            onClick={() => openStyleModal("location")}
            className="p-1 text-gray-500 hover:text-blue-600 transition"
            title="Style Location"
          >
            <Settings size={16} />
          </button>
        </div>
        <Input label="" value={data.location} onChange={(v) => update("location", v)} />
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Salary Range</label>
          <button
            onClick={() => openStyleModal("salary")}
            className="p-1 text-gray-500 hover:text-blue-600 transition"
            title="Style Salary Range"
          >
            <Settings size={16} />
          </button>
        </div>
        <Input label="" value={data.salary} onChange={(v) => update("salary", v)} />
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <button
            onClick={() => openStyleModal("email")}
            className="p-1 text-gray-500 hover:text-blue-600 transition"
            title="Style Email"
          >
            <Settings size={16} />
          </button>
        </div>
        <Input label="" value={data.email || ""} onChange={(v) => update("email", v)} type="email" />
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <button
            onClick={() => openStyleModal("phone")}
            className="p-1 text-gray-500 hover:text-blue-600 transition"
            title="Style Phone"
          >
            <Settings size={16} />
          </button>
        </div>
        <Input label="" value={data.phone || ""} onChange={(v) => update("phone", v)} />
        <ImageUploader
          label="Hero Image"
          value={data.heroImage}
          onChange={(url) => update("heroImage", url)}
          styleButton={
            <button
              onClick={() => openStyleModal("heroImage")}
              className="p-1 text-gray-500 hover:text-blue-600 transition"
              title="Style Hero Image"
            >
              <Settings size={16} />
            </button>
          }
        />
      </>
    )},
    { id: "design", title: "Design & Styling", defaultOpen: true, content: (
      <>
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
      </>
    )},
    { id: "features", title: "Features", content: (
      <>
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
      </>
    )},
    { id: "testimonials", title: "Testimonials", content: (
      <>
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
      </>
    )},
    { id: "about", title: "About Us", content: (
      <>
        <Input label="About Title" value={data.aboutTitle} onChange={(v) => update("aboutTitle", v)} />
        <Input label="About Description" value={data.aboutDescription} onChange={(v) => update("aboutDescription", v)} type="textarea" />
        <Input label="Mission Statement" value={data.mission} onChange={(v) => update("mission", v)} type="textarea" />
        <Input label="Vision Statement" value={data.vision} onChange={(v) => update("vision", v)} type="textarea" />
      </>
    )},
    { id: "contact", title: "Contact", content: (
      <>
        <Input label="Contact Title" value={data.contactTitle} onChange={(v) => update("contactTitle", v)} />
        <Input label="Address" value={data.address} onChange={(v) => update("address", v)} type="textarea" />
        <Input label="Phone" value={data.contactPhone} onChange={(v) => update("contactPhone", v)} />
        <Input label="Email" value={data.contactEmail} onChange={(v) => update("contactEmail", v)} type="email" />
        <Input label="LinkedIn" value={data.linkedin} onChange={(v) => update("linkedin", v)} />
        <Input label="Twitter" value={data.twitter} onChange={(v) => update("twitter", v)} />
        <Input label="GitHub" value={data.github} onChange={(v) => update("github", v)} />
      </>
    )},
    { id: "gallery", title: "Gallery", content: (
      <>
        {(data.gallery || []).map((g, i) => (
          <ListItem
            key={i}
            item={g}
            onUpdate={(field, v) => updateNested("gallery", i, field, v)}
            onRemove={() => removeItem("gallery", i)}
            fields={[
              { key: "title", label: "Image Title" },
              { key: "description", label: "Description" },
              { key: "url", label: "Image URL" },
            ]}
          />
        ))}
        <button onClick={() => addItem("gallery", { title: "", description: "", url: "" })} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + Add Gallery Item
        </button>
      </>
    )},
    { id: "faq", title: "FAQ", content: (
      <>
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
      </>
    )},
    { id: "pricing", title: "Pricing", content: (
      <>
        {(data.pricing || []).map((p, i) => (
          <ListItem
            key={i}
            item={p}
            onUpdate={(field, v) => updateNested("pricing", i, field, v)}
            onRemove={() => removeItem("pricing", i)}
            fields={[
              { key: "plan", label: "Plan Name" },
              { key: "price", label: "Price" },
              { key: "features", label: "Features (comma separated)", type: "textarea" },
            ]}
          />
        ))}
        <button onClick={() => addItem("pricing", { plan: "", price: "", features: "" })} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + Add Pricing Plan
        </button>
      </>
    )},
  ];

  const [collapsedSections, setCollapsedSections] = useState(() => {
    const initial = {};
    sections.forEach(section => {
      initial[section.id] = !section.defaultOpen;
    });
    return initial;
  });

  const toggleSection = (sectionId) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const update = (key, value) => {
    dispatch(updatePageData({ [key]: value }));
  };

  const updateNested = (key, index, field, value) => {
    const list = [...(data[key] || [])];
    list[index][field] = value;
    dispatch(updatePageData({ [key]: list }));
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

  const handleRemoveSection = (sectionId) => {
    dispatch(removeSection(sectionId));
  };

  const [showAddModal, setShowAddModal] = useState(false);

  const availableSections = [
    { id: "basic", title: "Basic Content", description: "Add title, description, contact info, and hero image" },
    { id: "design", title: "Design & Styling", description: "Customize colors, fonts, and layout" },
    { id: "features", title: "Features", description: "Highlight key features and benefits" },
    { id: "testimonials", title: "Testimonials", description: "Add customer testimonials and reviews" },
    { id: "about", title: "About Us", description: "Add information about your company or yourself" },
    { id: "contact", title: "Contact", description: "Add contact details and information" },
    { id: "gallery", title: "Gallery", description: "Showcase images or media" },
    { id: "faq", title: "FAQ", description: "Frequently asked questions" },
    { id: "pricing", title: "Pricing", description: "Display pricing plans and options" },
  ];

  const addSection = (sectionId) => {
    const currentOrder = data.sectionOrder || [];
        if (!currentOrder.includes(sectionId)) {
      update("sectionOrder", [...currentOrder, sectionId]);
    }
    setShowAddModal(false);
  };

  const orderedSections = (data.sectionOrder || [])
  .map(id => sections.find(s => s.id === id))
  .filter(Boolean);

  return (
    <>
      <div className={`max-w-2xl mx-auto p-4 space-y-6 font-sans`}>
        {orderedSections.map((section) => (
          <div key={section.id} className="bg-white border rounded-lg shadow-sm mb-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="p-1 text-gray-500 hover:text-gray-700 transition"
                  title={collapsedSections[section.id] ? "Expand Section" : "Collapse Section"}
                >
                  {collapsedSections[section.id] ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
                <h3 className="font-medium text-gray-900">{section.title}</h3>
              </div>
              <button
                onClick={() => handleRemoveSection(section.id)}
                className="p-1 text-red-500 hover:text-red-700 transition"
                title="Remove Section"
              >
                <Trash size={16} />
              </button>
            </div>
            {!collapsedSections[section.id] && (
              <div className="p-4">
                {section.content}
              </div>
            )}
          </div>
        ))}
        <button onClick={() => setShowAddModal(true)} className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
          + Add Section
        </button>
      </div>
      <AddSectionModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        availableSections={availableSections}
        addSection={addSection}
        sectionOrder={data.sectionOrder || []}
      />
    </>
  );
}
