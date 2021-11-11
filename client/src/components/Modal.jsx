const Modal = () => {
  return (
    <div className="bg-black bg-opacity-50 absolute inset-0 flex items-center justify-center">
      <div className="bg-white max-w-sm py-2 px-4 rounded space-y-3">
        <div className="font-semibold">Title</div>
        <div className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat,
          ullam.
        </div>
        <div class="flex justify-end space-x-3">
          <button class="btn-secondary">Cancel</button>
          <button class="btn">Action</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
