import { useNoteStore } from "../stores/useNoteStore";

function CreateNoteModal() {
  const { createNote, formData, setFormData, loading, resetFormData } =
    useNoteStore();

  return (
    <dialog id="create_note_dialog" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Create a new note</h3>

        <form
          action=""
          onSubmit={createNote}
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
              <button className="btn btn-ghost" onClick={() => resetFormData()}>Cancel</button>
            </form>
            <button
              className="btn btn-neutral"
              type="submit"
              disabled={!formData.title || !formData.category || loading}
            >
              {loading ? <>Loading</> : <>Create</>}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default CreateNoteModal;
