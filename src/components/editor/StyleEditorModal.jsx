import { useState,useRef,useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { X } from "lucide-react";

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

const Select = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    setSelectedLabel(selectedOption.label);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-4" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center bg-white"
          style={{ fontFamily: value || "inherit" }} // Preview selected font
        >
          <span>{selectedLabel}</span>
          <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors ${
                  opt.value === value ? "bg-blue-50 text-blue-700" : ""
                }`}
                style={{ fontFamily: opt.value }} // This is the key!
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const fontOptions = [
  { value: "'Inter', sans-serif", label: "Inter" },
  { value: "'Manrope', sans-serif", label: "Manrope" },
  { value: "'Poppins', sans-serif", label: "Poppins" },
  { value: "'Space Grotesk', sans-serif", label: "Space Grotesk" },
  { value: "'Outfit', sans-serif", label: "Outfit" },
  { value: "'Work Sans', sans-serif", label: "Work Sans" },
  { value: "'Montserrat', sans-serif", label: "Montserrat" },
  { value: "'Roboto', sans-serif", label: "Roboto" },
  { value: "'DM Sans', sans-serif", label: "DM Sans" },
  { value: "'Urbanist', sans-serif", label: "Urbanist" },

  { value: "'Playfair Display', serif", label: "Playfair Display" },
  { value: "'Cormorant Garamond', serif", label: "Cormorant Garamond" },
  { value: "'Lora', serif", label: "Lora" },
  { value: "'Alegreya', serif", label: "Alegreya" },
  { value: "'Libre Baskerville', serif", label: "Libre Baskerville" },

  { value: "'Bebas Neue', cursive", label: "Bebas Neue" },
  { value: "'Anton', sans-serif", label: "Anton" },
  { value: "'Oswald', sans-serif", label: "Oswald" },

  { value: "'Fira Code', monospace", label: "Fira Code" },
  { value: "'JetBrains Mono', monospace", label: "JetBrains Mono" },

  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Helvetica, sans-serif", label: "Helvetica" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "'Courier New', monospace", label: "Courier New" },
];

const fontWeightOptions = [
  { value: "normal", label: "Normal" },
  { value: "bold", label: "Bold" },
  { value: "lighter", label: "Lighter" },
  { value: "bolder", label: "Bolder" },
];

const fontStyleOptions = [
  { value: "normal", label: "Normal" },
  { value: "italic", label: "Italic" },
  { value: "oblique", label: "Oblique" },
];

const textDecorationOptions = [
  { value: "none", label: "None" },
  { value: "underline", label: "Underline" },
  { value: "line-through", label: "Line Through" },
  { value: "overline", label: "Overline" },
];

const textAlignOptions = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
  { value: "justify", label: "Justify" },
];

const objectFitOptions = [
  { value: "fill", label: "Fill" },
  { value: "contain", label: "Contain" },
  { value: "cover", label: "Cover" },
  { value: "none", label: "None" },
  { value: "scale-down", label: "Scale Down" },
];

const borderStyleOptions = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
  { value: "groove", label: "Groove" },
  { value: "ridge", label: "Ridge" },
  { value: "inset", label: "Inset" },
  { value: "outset", label: "Outset" },
  { value: "none", label: "None" },
];

const fieldNames = {
  title: "Page Title",
  description: "Description",
  company: "Company Name",
  location: "Location",
  salary: "Salary Range",
  email: "Email",
  phone: "Phone",
  heroImage: "Hero Image"
};

export default function StyleEditorModal({ isOpen, onClose, fieldType, styles, onUpdateStyles }) {
  if (!isOpen) return null;

  const updateStyle = (key, value) => {
    onUpdateStyles(fieldType, { ...styles, [key]: value });
  };

  const renderTextStyles = () => (
    <>
      <ColorInput label="Text Color" value={styles.color || "#000000"} onChange={(v) => updateStyle("color", v)} />
      <SliderInput label="Font Size" value={parseFloat(styles.fontSize) || 16} onChange={(v) => updateStyle("fontSize", v)} min={8} max={100} unit="px" />
      <Select label="Font Family" value={styles.fontFamily || "Arial, sans-serif"} onChange={(v) => updateStyle("fontFamily", v)} options={fontOptions} />
      <Select label="Font Weight" value={styles.fontWeight || "normal"} onChange={(v) => updateStyle("fontWeight", v)} options={fontWeightOptions} />
      <Select label="Font Style" value={styles.fontStyle || "normal"} onChange={(v) => updateStyle("fontStyle", v)} options={fontStyleOptions} />
      <Select label="Text Decoration" value={styles.textDecoration || "none"} onChange={(v) => updateStyle("textDecoration", v)} options={textDecorationOptions} />
      <Select label="Text Align" value={styles.textAlign || "left"} onChange={(v) => updateStyle("textAlign", v)} options={textAlignOptions} />
      <SliderInput label="Line Height" value={parseFloat(styles.lineHeight) || 1.2} onChange={(v) => updateStyle("lineHeight", v)} min={0.5} max={3} step={0.1} unit="" />
      <SliderInput label="Letter Spacing" value={parseFloat(styles.letterSpacing) || 0} onChange={(v) => updateStyle("letterSpacing", v)} min={-5} max={10} unit="px" />
    </>
  );

  const renderImageStyles = () => (
    <>
      <SliderInput label="Width" value={parseFloat(styles.width) || 100} onChange={(v) => updateStyle("width", v)} min={10} max={100} unit="%" />
      <SliderInput label="Height" value={parseFloat(styles.height) || 500} onChange={(v) => updateStyle("height", v)} min={50} max={1000} unit="px" />
      <SliderInput label="Border Radius" value={parseFloat(styles.borderRadius) || 0} onChange={(v) => updateStyle("borderRadius", v)} min={0} max={100} unit="px" />
      <Select label="Object Fit" value={styles.objectFit || "cover"} onChange={(v) => updateStyle("objectFit", v)} options={objectFitOptions} />
      <SliderInput label="Border Width" value={parseFloat(styles.borderWidth) || 0} onChange={(v) => updateStyle("borderWidth", v)} min={0} max={20} unit="px" />
      <ColorInput label="Border Color" value={styles.borderColor || "#000000"} onChange={(v) => updateStyle("borderColor", v)} />
      <Select label="Border Style" value={styles.borderStyle || "solid"} onChange={(v) => updateStyle("borderStyle", v)} options={borderStyleOptions} />
      <Input label="Box Shadow" value={styles.boxShadow || "none"} onChange={(v) => updateStyle("boxShadow", v)} placeholder="e.g., 0 4px 6px rgba(0,0,0,0.1)" />
      <SliderInput label="Opacity" value={parseFloat(styles.opacity) || 1} onChange={(v) => updateStyle("opacity", v)} min={0} max={1} step={0.1} unit="" />
    </>
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0" onClick={onClose}></div>
      )}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              {fieldNames[fieldType] || fieldType} Styles
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {fieldType === "heroImage" ? renderImageStyles() : renderTextStyles()}
          </div>
          <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
