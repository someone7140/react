import Modal from "react-modal";

export default function CategoryDeleteModalComponent(prop) {
  return (
    <Modal
      style={{
        content: {
          maxHeight: "400px",
        },
      }}
      isOpen={prop.showModal}
    >
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            削除するカテゴリーがあります。カテゴリーを削除すると登録した経歴も削除されます。
            <br />
            保存しますか？
            <br />
            （削除を取り消したい場合はリロードしてください）
          </p>
        </div>
      </div>
      <div className="px-4 py-3 sm:px-6 sm:flex justify-center mt-4">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={prop.handleRegister}
        >
          保存する
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={prop.handleCancel}
        >
          保存しない
        </button>
      </div>
    </Modal>
  );
}
