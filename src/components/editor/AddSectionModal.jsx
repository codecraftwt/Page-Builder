import { X } from "lucide-react";

const AddSectionModal = ({ showAddModal, setShowAddModal, availableSections, addSection, sectionOrder }) => {
  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl max-h-3xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Section</h3>
          <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableSections.map((section) => {
            const isAlreadyAdded = sectionOrder.includes(section.id);
            return (
              <button
                key={section.id}
                onClick={() => !isAlreadyAdded && addSection(section.id)}
                disabled={isAlreadyAdded}
                className={`w-full text-left p-3 border rounded ${
                  isAlreadyAdded
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{section.title}</div>
                <div className="text-sm text-gray-600">{section.description}</div>
                {isAlreadyAdded && (
                  <div className="text-xs text-gray-500 mt-1">Already added</div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddSectionModal;
