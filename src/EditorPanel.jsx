export default function EditorPanel({ data, setData }) {
  const updateColor = (key, value) => {
    setData(prev => ({ ...prev, colors: { ...prev.colors, [key]: value } }));
  };

  const update = (key, value) => setData(prev => ({ ...prev, [key]: value }));

  const fontOptions = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Courier New, monospace', label: 'Courier New' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Design Panel</h2>

      <div>
        <label className="block text-sm font-medium mb-2">Font Family</label>
        <select
          value={data.fontFamily || 'Arial, sans-serif'}
          onChange={(e) => update("fontFamily", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {fontOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Background Color</label>
        <input
          type="color"
          value={data.colors.bg}
          onChange={(e) => updateColor("bg", e.target.value)}
          className="w-full h-12 cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Primary Color</label>
        <input
          type="color"
          value={data.colors.primary}
          onChange={(e) => updateColor("primary", e.target.value)}
          className="w-full h-12 cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Text Color</label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={data.colors.text || '#000000'}
            onChange={(e) => updateColor("text", e.target.value)}
            className="w-12 h-12 cursor-pointer border border-gray-300 rounded"
          />
          <input
            type="text"
            value={data.colors.text || '#000000'}
            onChange={(e) => updateColor("text", e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="#000000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Spacing (Padding)</label>
        <input
          type="range"
          min="0"
          max="100"
          value={data.spacing || 20}
          onChange={(e) => update("spacing", parseInt(e.target.value))}
          className="w-full"
        />
        <span className="text-sm text-gray-600">{data.spacing || 20}px</span>
      </div>
    </div>
  );
}
