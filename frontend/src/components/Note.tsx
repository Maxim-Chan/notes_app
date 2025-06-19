import { useNoteStore } from "../stores/useNoteStore";
import EditNoteModal from "./EditNoteModal";

function Note({ note }) {
  const { deleteNote, setFormData } = useNoteStore();

  const handleEdit = () => {
    setFormData({
      title: note.title,
      category: note.category,
      content: note.content,
    });
    const modal = document.getElementById("edit_note_dialog") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  return (
    <div className="card w-96 card-lg shadow-sm bg-gray-700">
      <div className="card-body">
        <h2 className="card-title">{note.title}</h2>
        <p>Category: {note.category}</p>
        <p>{note.content}</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit
          </button>
          <button
            className="btn btn-primary"
            onClick={() => deleteNote(note.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* You may choose to mount this once globally instead, e.g., in NotesPage */}
      <EditNoteModal noteId={note.id} />
    </div>
  );
}

export default Note;
