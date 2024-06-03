'use server'
import { createNoteSchema, deleteNoteSchema, updateNoteSchema } from "@/lib/validations/note";
import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    title?: string[];
    content: string[];
  };
  message?: string | null;
};

export async function createNote(prevState: State, formData: FormData) {
  // const note = Object.fromEntries(formData.entries())

  const validatedFields = createNoteSchema.safeParse({
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  });

  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error?.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  const { title, content } = validatedFields.data;


  const { userId } = auth();

  if(!userId){
    return {
      message: 'User not found'
    }
  }

  try {

    await getXataClient().db.Note.create({
      title,
      content,
      userId
    });
    
  } catch (error) {
    return {
      message: 'Database error, failded to create note'
    }
  }
  revalidatePath('/notes');
}


export async function updateNote(prevState: State, formData: FormData) {

  console.log('formData', formData)
  const validatedFields = updateNoteSchema.safeParse({
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    id: formData.get("id") as string
  });

  console.log('validatedFields', validatedFields)
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error?.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  const { id, title, content } = validatedFields.data;
  const { userId } = auth();
  if(!userId){
    return {
      message: 'User not found'
    }
  }
  try {
    await getXataClient().db.Note.update(id, {
      title,
      content
    })
  } catch (error) {
    return {
      message: 'Database error, failded to create note'
    }
  }
  revalidatePath('/notes');
}



export async function deleteNote( id:string | undefined) {
  console.log('id**************************', id)
  const { userId } = auth();
  if(!userId){
    return {
      message: 'User not found'
    }
  }
  try {
    await getXataClient().db.Note.delete(id as string)
  } catch (error) {
    return {
      message: 'Database error, failded to create note'
    }
  }
  revalidatePath('/notes');
}

