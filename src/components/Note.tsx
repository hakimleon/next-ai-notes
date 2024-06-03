"use client";
import { NoteRecord } from "@/xata";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";
import EditNoteDialog from "./EditNoteDialog";

interface NoteProps {
  note: NoteRecord;
}
const Note = ({ note }: NoteProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const wasUpdated = note.xata.updatedAt > note.xata.createdAt;

  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.xata.updatedAt : note.xata.createdAt
  ).toDateString();
  return (
    <>
      <Card onClick={() => setShowEditDialog(true)} className="cursor-pointer hover:shadow-lg">
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {" "}
            {createdUpdatedAtTimestamp}
            <span className="text-gray-500 text-xs">
              {wasUpdated && " (Updated)"}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{note.content}</p>
        </CardContent>
      </Card>
      <EditNoteDialog
        noteToEdit={note}
        open={showEditDialog}
        setOpen={setShowEditDialog}
      />
    </>
  );
};

export default Note;
