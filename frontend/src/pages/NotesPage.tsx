import { useEffect } from "react";
import { useNoteStore } from "../stores/useNoteStore";
import Note from "../components/Note";
import CreateNoteModal from "../components/CreateNoteModal";

function NotesPage() {
  const { notes, loading, error, getAllNotes } = useNoteStore();

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  console.log("notes: ", notes);

  return (
    <div className="m-5">
      <div className="flex justify-between items-center my-5">
        <button
          className="btn bg-amber-400"
          onClick={() => {
            const dialog = document.getElementById(
              "create_note_dialog"
            ) as HTMLDialogElement | null;
            dialog?.showModal();
          }}
        >
          Create Note
        </button>
      </div>

      <CreateNoteModal />

      {error && <h2 className="alert alert-error mb-8">{error}</h2>}

      {notes.length === 0 && !loading && <h2>No notes found</h2>}

      {loading ? (
        <h2 className="bg-red-500">Loading</h2>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesPage;
