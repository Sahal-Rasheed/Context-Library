"use server";

import { revalidatePath } from "next/cache";

import { findOrCreateFolder, deleteFolder, searchFoldersByName } from "@/dal/folders";
import { getErrorMessage } from "@/lib/errors";

import { getAuthenticatedUser } from "./auth";

export async function createFolderAction(folderName: string): Promise<{
  success: boolean;
  message?: string;
  folderId?: string;
}> {
  try {
    const user = await getAuthenticatedUser();
    const folder = await findOrCreateFolder(user.id, folderName);

    if (!folder) {
      return { success: false, message: "Folder name cannot be empty." };
    }

    revalidatePath("/", "layout");
    return { success: true, folderId: folder.id };
  } catch (error) {
    console.error("createFolderAction failure:", error);
    return {
      success: false,
      message: getErrorMessage(error, "Failed to create folder"),
    };
  }
}

export async function searchFoldersAction(
  query: string,
): Promise<{ success: boolean; folders: { id: string; name: string }[]; message?: string }> {
  try {
    const user = await getAuthenticatedUser();
    const folders = await searchFoldersByName(user.id, query);

    return { success: true, folders };
  } catch (error) {
    console.error("searchFoldersAction failure:", error);
    return {
      success: false,
      folders: [],
      message: getErrorMessage(error, "Failed to search folders"),
    };
  }
}

export async function deleteFolderAction(folderId: string): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    const user = await getAuthenticatedUser();
    await deleteFolder(user.id, folderId);

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("deleteFolderAction failure:", error);
    return {
      success: false,
      message: getErrorMessage(error, "Failed to delete folder"),
    };
  }
}
