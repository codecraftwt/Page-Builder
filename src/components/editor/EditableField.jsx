import { useDispatch, useSelector } from "react-redux";
import { setSelectedField, clearSelectedField } from "../../store/slices/editorSlice.js";

export default function EditableField({
  fieldId,
  label,
  children,
  tag: Tag = "div",
  className = "",
  style = {},
  ...rest
}) {
  const dispatch = useDispatch();
  const selectedField = useSelector((state) => state.editor.selectedField);
  const isSelected = selectedField === fieldId;

  return (
    <div className="relative inline-block">
      {isSelected && (
        <span className="absolute -top-3 -left-3 z-50 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded shadow-lg pointer-events-none animate-pulse">
          {label}
        </span>
      )}

      <Tag
        className={`${className} cursor-pointer transition-all duration-200 ${
          isSelected ? "outline-none ring-4 ring-blue-500 ring-offset-2" : ""
        }`}
        style={{
          ...style,
          border: isSelected ? "3px solid #2563eb" : style.border,
          borderRadius: isSelected ? "8px" : style.borderRadius || "4px",
          padding: isSelected ? "2px" : style.padding,
        }}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setSelectedField(fieldId));
        }}
        {...rest}
      >
        {children}
      </Tag>
    </div>
  );
}