
import { useState } from "react";
import {
  Plus,
  Settings,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  GripVertical,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import StyleEditorModal from "./StyleEditorModal";
import AddSectionModal from "./AddSectionModal";

const Section = ({ title, children, defaultOpen = false, dragHandleProps, isDragging }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`border border-gray-300 rounded-xl overflow-hidden bg-white mb-6 transition-all duration-200 ${
        isDragging
          ? "shadow-2xl scale-[1.02] rotate-1 border-blue-400 border-2"
          : "shadow-md hover:shadow-lg"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-left font-bold text-gray-800 flex justify-between items-center transition-all"
      >
        <div className="flex items-center gap-4">
          {dragHandleProps && (
            <div
              {...dragHandleProps}
              className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-800 transition"
            >
              <GripVertical size={26} />
            </div>
          )}
          <span className="text-xl">{title}</span>
        </div>
        <Plus
          size={24}
          className={`text-gray-600 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        />
      </button>
      {open && (
        <div className="p-8 bg-white border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

const Input = ({ label, value = "", onChange, type = "text", placeholder, max }) => (
  <div className="mb-6">
    {label && <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, max))}
        placeholder={placeholder}
        rows="4"
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    )}
  </div>
);

const ColorInput = ({ label, value = "#000000", onChange }) => (
  <div className="mb-5">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="flex gap-3 items-center">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm"
        placeholder="#3b82f6"
      />
    </div>
  </div>
);

const SliderInput = ({ label, value, onChange, min = 0, max = 100, unit = "px" }) => {
  const numVal = parseFloat(value) || min;
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          value={numVal}
          onChange={(e) => onChange(e.target.value + unit)}
          className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <span className="w-20 text-center font-medium">{numVal + unit}</span>
      </div>
    </div>
  );
};

const IconSelect = ({ label, value, onChange, options }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
    <div className="grid grid-cols-4 gap-3">
      {options.map((opt) => {
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`p-5 rounded-xl border-2 transition-all flex flex-col items-center gap-2
              ${value === opt.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-400"}`}
          >
            <Icon size={22} />
            <span className="text-xs font-medium">{opt.label}</span>
          </button>
        );
      })}
    </div>
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  <div className="p-6 border border-gray-200 rounded-xl bg-gray-50 mb-5 shadow-sm">
    {fields.map((field) => (
      <Input
        key={field.key}
        label={field.label}
        value={item[field.key] || ""}
        onChange={(v) => onUpdate(field.key, v)}
        type={field.type || "text"}
        placeholder={field.placeholder}
      />
    ))}
    <button onClick={onRemove} className="text-red-600 font-medium hover:underline">
      Remove
    </button>
  </div>
);

export default function EditorRender({ data, setData, styleModal, setStyleModal }) {
  const update = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

  const updateNested = (key, index, field, value) => {
    const list = [...(data[key] || [])];
    list[index][field] = value;
    update(key, list);
  };

  const addItem = (key, template) => update(key, [...(data[key] || []), template]);
  const removeItem = (key, index) => update(key, data[key].filter((_, i) => i !== index));

  const openStyleModal = (fieldType) => setStyleModal({ isOpen: true, fieldType });
  const closeStyleModal = () => setStyleModal({ isOpen: false, fieldType: null });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(data.sectionOrder || ["jobDetails", "design", "features", "testimonials"]);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    update("sectionOrder", items);
  };

  const [showAddModal, setShowAddModal] = useState(false);

  const availableSections = [
    { id: "jobDetails", title: "Job Details", description: "Add job details like company, location, salary" },
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

  const fontOptions = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Helvetica, sans-serif", label: "Helvetica" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "'Poppins', sans-serif", label: "Poppins" },
    { value: "'Inter', sans-serif", label: "Inter" },
    { value: "'Roboto', sans-serif", label: "Roboto" },
  ];

  const alignmentOptions = [
    { value: "left", label: "Left", icon: AlignLeft },
    { value: "center", label: "Center", icon: AlignCenter },
    { value: "right", label: "Right", icon: AlignRight },
    { value: "justify", label: "Justify", icon: AlignJustify },
  ];

  const HeroSectionContent = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <label className="text-lg font-bold">Page Title</label>
        <button onClick={() => openStyleModal("title")} className="p-2 hover:bg-gray-100 rounded-lg">
          <Settings size={18} />
        </button>
      </div>
      <Input value={data.title || ""} onChange={(v) => update("title", v)} />

      <div className="flex items-center justify-between mb-4">
        <label className="text-lg font-bold">Description</label>
        <button onClick={() => openStyleModal("description")} className="p-2 hover:bg-gray-100 rounded-lg">
          <Settings size={18} />
        </button>
      </div>
      <Input value={data.description || ""} onChange={(v) => update("description", v)} type="textarea" max={500} />

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-lg font-bold">Hero Image</label>
          <button onClick={() => openStyleModal("heroImage")} className="p-2 hover:bg-gray-100 rounded-lg">
            <Settings size={18} />
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
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        {data.heroImage && (
          <div className="mt-6">
            <img src={data.heroImage} alt="Hero Preview" className="w-full max-h-80 object-cover rounded-xl shadow-lg" />
          </div>
        )}
      </div>
    </>
  );

  const draggableSections = [
    {
      id: "jobDetails",
      title: "Job Details",
      content: (
        <>
          <Input label="Company Name" value={data.company || ""} onChange={(v) => update("company", v)} />
          <Input label="Location" value={data.location || ""} onChange={(v) => update("location", v)} />
          <Input label="Salary Range" value={data.salary || ""} onChange={(v) => update("salary", v)} />
          <Input label="Email" value={data.email || ""} onChange={(v) => update("email", v)} type="email" />
          <Input label="Phone" value={data.phone || ""} onChange={(v) => update("phone", v)} />
        </>
      ),
    },
    {
      id: "design",
      title: "Design & Styling",
      content: (
        <>
          <Select label="Font Family" value={data.fontFamily || "Arial, sans-serif"} onChange={(v) => update("fontFamily", v)} options={fontOptions} />
          <div className="grid grid-cols-2 gap-5">
            <ColorInput label="Primary Color" value={data.colors?.primary || "#3b82f6"} onChange={(v) => update("colors", { ...data.colors, primary: v })} />
            <ColorInput label="Text Color" value={data.colors?.text || "#1f2937"} onChange={(v) => update("colors", { ...data.colors, text: v })} />
            <ColorInput label="Background" value={data.colors?.bg || "#ffffff"} onChange={(v) => update("colors", { ...data.colors, bg: v })} />
          </div>
          <SliderInput label="Body Font Size" value={data.bodyFontSize || "16px"} onChange={(v) => update("bodyFontSize", v)} min={12} max={24} />
          <SliderInput label="Button Radius" value={data.buttonBorderRadius || "12px"} onChange={(v) => update("buttonBorderRadius", v)} min={0} max={32} />
          <IconSelect label="Text Alignment" value={data.textAlign || "center"} onChange={(v) => update("textAlign", v)} options={alignmentOptions} />
        </>
      ),
    },
    {
      id: "features",
      title: "Features / Benefits",
      content: (
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
          <button
            onClick={() => addItem("features", { title: "New Benefit", description: "" })}
            className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-lg transition"
          >
            + Add Feature
          </button>
        </>
      ),
    },
    {
      id: "testimonials",
      title: "Testimonials",
      content: (
        <>
          {(data.testimonials || []).map((t, i) => (
            <ListItem
              key={i}
              item={t}
              onUpdate={(field, v) => updateNested("testimonials", i, field, v)}
              onRemove={() => removeItem("testimonials", i)}
              fields={[
                { key: "name", label: "Name" },
                { key: "role", label: "Role / Company" },
                { key: "comment", label: "Testimonial", type: "textarea" },
              ]}
            />
          ))}
          <button
            onClick={() => addItem("testimonials", { name: "", role: "", comment: "" })}
            className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-lg transition"
          >
            + Add Testimonial
          </button>
        </>
      ),
    },
    {
      id: "about",
      title: "About Us",
      content: (
        <>
          <Input label="Section Title" value={data.aboutTitle || ""} onChange={(v) => update("aboutTitle", v)} />
          <Input label="Description" value={data.aboutDescription || ""} onChange={(v) => update("aboutDescription", v)} type="textarea" />
          <Input label="Mission" value={data.mission || ""} onChange={(v) => update("mission", v)} type="textarea" />
          <Input label="Vision" value={data.vision || ""} onChange={(v) => update("vision", v)} type="textarea" />
        </>
      ),
    },
    {
      id: "contact",
      title: "Contact",
      content: (
        <>
          <Input label="Section Title" value={data.contactTitle || ""} onChange={(v) => update("contactTitle", v)} />
          <Input label="Address" value={data.address || ""} onChange={(v) => update("address", v)} type="textarea" />
          <Input label="Phone" value={data.contactPhone || ""} onChange={(v) => update("contactPhone", v)} />
          <Input label="Email" value={data.contactEmail || ""} onChange={(v) => update("contactEmail", v)} type="email" />
          <Input label="LinkedIn URL" value={data.linkedin || ""} onChange={(v) => update("linkedin", v)} />
          <Input label="Twitter URL" value={data.twitter || ""} onChange={(v) => update("twitter", v)} />
          <Input label="GitHub URL" value={data.github || ""} onChange={(v) => update("github", v)} />
        </>
      ),
    },
    {
      id: "gallery",
      title: "Gallery",
      content: (
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
          <button
            onClick={() => addItem("gallery", { title: "", description: "", url: "" })}
            className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-lg transition"
          >
            + Add Gallery Item
          </button>
        </>
      ),
    },
    {
      id: "faq",
      title: "FAQ",
      content: (
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
          <button
            onClick={() => addItem("faq", { question: "", answer: "" })}
            className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-lg transition"
          >
            + Add FAQ
          </button>
        </>
      ),
    },
    {
      id: "pricing",
      title: "Pricing",
      content: (
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
                { key: "features", label: "Features (comma-separated)" },
              ]}
            />
          ))}
          <button
            onClick={() => addItem("pricing", { plan: "", price: "", features: "" })}
            className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-lg transition"
          >
            + Add Pricing Plan
          </button>
        </>
      ),
    },
  ];

  const orderedSections = (data.sectionOrder || ["jobDetails", "design", "features", "testimonials"])
    .map((id) => draggableSections.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Landing Page Editor</h1>

      <Section title="Hero Section" defaultOpen={true}>
        <HeroSectionContent />
      </Section>

      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections">
  {(provided, snapshot) => (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      className={`space-y-6 transition-all ${snapshot.isDraggingOver ? "bg-blue-50/50 rounded-2xl" : ""}`}
    >
      {orderedSections.map((section, index) => (
        <Draggable key={section.id} draggableId={section.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className="relative"
            >
              <Section
                title={section.title}
                defaultOpen={false}
                dragHandleProps={provided.dragHandleProps}
                isDragging={snapshot.isDragging}
              >
                {section.content}
              </Section>
            </div>
          )}
        </Draggable>
      ))}

      {/* This placeholder is required for smooth animation */}
      {provided.placeholder}

      {/* Optional: Visual drop zone indicator */}
      {snapshot.isDraggingOver && !orderedSections.length && (
        <div className="h-40 border-4 border-dashed border-blue-400 rounded-2xl bg-blue-50/70 flex items-center justify-center text-blue-600 font-bold text-2xl">
          Drop Section Here
        </div>
      )}
    </div>
  )}
</Droppable>
      </DragDropContext>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold text-lg transition"
        >
          + Add Section
        </button>
      </div>

      <StyleEditorModal
        isOpen={styleModal.isOpen}
        onClose={closeStyleModal}
        fieldType={styleModal.fieldType}
        currentStyles={data[`${styleModal.fieldType}Styles`] || {}}
        onSave={(newStyles) => update(`${styleModal.fieldType}Styles`, newStyles)}
      />

      <AddSectionModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        availableSections={availableSections}
        addSection={addSection}
        sectionOrder={data.sectionOrder || []}
      />
    </div>
  );
}
