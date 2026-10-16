"use server";

import { revalidatePath } from "next/cache";

import {
  createItemRecord,
  updateItemContext,
  toggleItemFavorite,
  toggleItemArchive,
  deleteItemRecord,
} from "@/dal/items";
import { getErrorMessage } from "@/lib/errors";
import { type ItemFormData, itemFormSchema } from "@/lib/schemas";

import { getAuthenticatedUser } from "./auth";

export async function createItemAction(itemData: ItemFormData): Promise<{
  success: boolean;
  message?: string;
  itemId?: string;
}> {
  try {
    const user = await getAuthenticatedUser();

    const parsed = itemFormSchema.safeParse(itemData);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Validation failed";
      return { success: false, message: errorMsg };
    }

    const item = await createItemRecord(user.id, parsed.data);

    revalidatePath("/", "layout");

    return { success: true, itemId: item.id };
  } catch (error) {
    console.error("createItemAction failure:", error);
    return {
      success: false,
      message: getErrorMessage(error, "Failed to create item"),
    };
  }
}

export async function updateContextAction(
  itemId: string,
  contextText: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const user = await getAuthenticatedUser();
    await updateItemContext(user.id, itemId, contextText);

    revalidatePath(`/library/${itemId}`);
    // revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("updateContextAction failure:", error);
    return {
      success: false,
      message: getErrorMessage(error, "Failed to update context"),
    };
  }
}

export async function toggleFavoriteAction(
  itemId: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const user = await getAuthenticatedUser();
    const updated = await toggleItemFavorite(user.id, itemId);

    if (!updated) {
      return { success: false, message: "Item not found." };
    }

    revalidatePath(`/library/${itemId}`);
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("toggleFavoriteAction failure:", error);
    return {
      success: false,
      message: getErrorMessage(error, "Failed to toggle favorite"),
    };
  }
}

export async function toggleArchiveAction(
  itemId: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const user = await getAuthenticatedUser();
    const updated = await toggleItemArchive(user.id, itemId);

    if (!updated) {
      return { success: false, message: "Item not found." };
    }

    revalidatePath(`/library/${itemId}`);
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("toggleArchiveAction failure:", error);
    return {
      success: false,
      message: getErrorMessage(error, "Failed to toggle archive"),
    };
  }
}

export async function deleteItemAction(
  itemId: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const user = await getAuthenticatedUser();
    await deleteItemRecord(user.id, itemId);

    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("deleteItemAction failure:", error);
    return {
      success: false,
      message: getErrorMessage(error, "Failed to delete item"),
    };
  }
}
