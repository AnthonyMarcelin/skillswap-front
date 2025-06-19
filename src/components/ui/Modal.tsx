export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded max-w-lg w-full max-h-[80vh] overflow-auto"
      >
        {children}
      </div>
    </div>
  );
}