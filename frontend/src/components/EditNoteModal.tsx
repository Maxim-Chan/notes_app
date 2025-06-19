import { useNoteStore } from "../stores/useNoteStore";

function EditNoteModal({ noteId }: { noteId: number }) {
  const {
    updateNote,
    formData,
    setFormData,
    loading,
    resetFormData,
  } = useNoteStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateNote(noteId);
    const modal = document.getElementById("edit_note_dialog") as HTMLDialogElement;
    modal?.close();
    resetFormData();
  };

  return (
    <dialog id="edit_note_dialog" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => resetFormData()}
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg">Edit Note</h3>

        <form
          onSubmit={handleSubmit}
          className="fieldset rounded-box w-full"
        >
          <label className="label mt-2">Title</label>
          <input
            type="text"
            className="input"
            placeholder="Enter title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <label className="label mt-2">Category</label>
          <input
            type="text"
            className="input"
            placeholder="Enter category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />

          <label className="label mt-2">Content</label>
          <input
            type="text"
            className="input"
            placeholder="Enter content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />

          <div className="modal-action mt-4">
            <form method="dialog">
              <button
                className="btn btn-ghost"
                onClick={() => resetFormData()}
              >
                Cancel
              </button>
            </form>
            <button
              className="btn btn-neutral"
              type="submit"
              disabled={!formData.title || !formData.category || loading}
            >
              {loading ? <>Updating...</> : <>Update</>}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={() => resetFormData()}>close</button>
      </form>
    </dialog>
  );
}

export default EditNoteModal;
