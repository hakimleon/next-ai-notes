"use client";

import { Dialog, DialogFooter, DialogHeader } from "./ui/dialog";
import { DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import LoadingButton from "./loading-button";
import { deleteNote, updateNote } from "@/app/notes/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { NoteRecord } from "@/xata";

interface EditNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToEdit?: NoteRecord;
}
const EditNoteDialog = ({ open, setOpen, noteToEdit }: EditNoteDialogProps) => {
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useFormState(updateNote, initialState);

  useEffect(() => {
    console.log(state);
    if (!state) {
      setOpen(false);
    }
  }, [state, setOpen]);

  const actionHandeler = (formData: FormData) => {
    console.log("formData", formData);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          {state?.message && (
            <p className="text-sm text-red-500">{state?.message}</p>
          )}
        </DialogHeader>
        <form action={formAction} className="space-y-8">
          <div>
            <Input
              placeholder="Title Note"
              name="title"
              defaultValue={noteToEdit?.title as string}
            />
            {state?.errors?.title && (
              <p className="text-xs text-red-500 ml-2 italic">
                {state?.errors.title}
              </p>
            )}
          </div>
          <Textarea
            rows={8}
            placeholder="Content Note"
            name="content"
            defaultValue={noteToEdit?.content as string}
          />
          {state?.errors?.content && (
            <p className="text-sm text-red-500">{state?.errors.content}</p>
          )}
          <input type="hidden" name="id" value={noteToEdit?.id} />
          <DialogFooter>
            <LoadingButton title="Update Note" />

            <Button variant={"destructive"}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                deleteNote(noteToEdit?.id);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditNoteDialog;
