import Note from "@/components/Note";
import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "FlowBrain - notes",
  description: "Your notes",
};

const NotesPage = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("user undefined");

  const allNotes = await getXataClient().db.Note.filter({ userId }).getMany();

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
      {allNotes.map((note) => (
        <Note note={note} key={note.id} />
      ))}
      {allNotes.length === 0 && (
        <p className="text-center text-sm font-bold italic text-gray-500 col-span-full">
          You have no notes
        </p>
      )}
    </div>
  );
};

export default NotesPage;
