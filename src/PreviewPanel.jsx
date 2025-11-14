export default function PreviewPanel({ colors }) {
  return (
    <div className="space-y-6">
      <div
        className="p-6 rounded-lg shadow-md"
        style={{ backgroundColor: colors.primary, color: "white" }}
      >
        <h2 className="text-xl font-bold">Primary Button</h2>
        <p>This is a sample button</p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold" style={{ color: colors.text }}>
          Sample Heading
        </h2>
        <p style={{ color: colors.text }}>
          This text changes color live when you pick a new color in the editor.
        </p>
      </div>

      <div className="p-6 rounded-lg" style={{ backgroundColor: colors.bg }}>
        <p className="text-gray-700">
          Background is also live — try changing it!
        </p>
      </div>
    </div>
  );
}