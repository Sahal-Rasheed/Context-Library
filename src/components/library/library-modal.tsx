"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "cn";
import * as React from "react";
import { useForm, Controller, type SubmitHandler, type FieldErrors } from "react-hook-form";

import { createItemAction } from "@/actions/items";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ContextItemType } from "@/data";
import { itemFormSchema, type ItemFormData } from "@/lib/schemas";

import { Textarea } from "../ui/textarea";
import { FolderCombobox } from "./folder-combobox";
import { CONTENT_TYPES } from "./library-page";
import { TagsInput } from "./tags-input";

type LibraryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LibraryModal({ open, onOpenChange }: LibraryModalProps) {
  const [contentType, setContentType] = React.useState<ContextItemType>("link");

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      type: "link",
      title: "",
      url: "",
      description: "",
      ctx: "",
      folder: "",
      tags: [],
    },
  });

  // keep type in sync with selected pill
  // and reset form when type switches using `setValue` from `useForm` hook
  const handleTypeChange = (type: ContextItemType) => {
    setContentType(type);
    setValue("type", type);
  };

  // reset form to clean state when modal opens or closes
  React.useEffect(() => {
    if (!open) {
      reset({
        type: "link",
        title: "",
        url: "",
        description: "",
        ctx: "",
        folder: "",
        tags: [],
      });
    }
  }, [open, reset]);

  const onSubmit: SubmitHandler<ItemFormData> = async (data) => {
    const result = await createItemAction(data);

    if (!result.success) {
      setError("root", {
        message: result.message || "Failed to save item. Please try again.",
      });
      return;
    }

    onOpenChange(false);
  };

  const onError = (formErrors: FieldErrors<ItemFormData>) => {
    console.error("Form Validation Failed:", formErrors);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90%] max-w-[90%] scrollbar-thin scrollbar-thumb-muted overflow-y-auto rounded-md-ds border border-sidebar-border bg-sidebar text-foreground sm:max-h-fit sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogHeader>
            <DialogTitle className="text-base-ds font-semibold">Save to library</DialogTitle>
            <DialogDescription>Add this to your context library.</DialogDescription>
          </DialogHeader>

          {/* content choices for ctx saving */}
          <div className="mt-2 mb-4 flex flex-wrap items-center gap-2">
            {CONTENT_TYPES.map((type) => (
              <Button
                key={type.type}
                type="button"
                variant="outline"
                className={cn(
                  "inline-flex h-0 cursor-pointer items-center gap-1.5 rounded-md-ds px-2.5 py-3.5 text-xs transition-colors",
                  contentType === type.type
                    ? "bg-neutral-400/10 hover:bg-neutral-400/10 dark:bg-black/30 dark:hover:bg-black/40"
                    : "",
                )}
                onClick={() => handleTypeChange(type.type)}
                disabled={type.type === "image"}
              >
                {type.icon}
                <span>{type.name}</span>
              </Button>
            ))}
          </div>

          <FieldGroup>
            {/* title */}
            <Field>
              <Label htmlFor="title" className="font-semibold text-muted-foreground">
                Title
              </Label>
              <Input
                id="title"
                placeholder={`Title for the ${contentType} you want to save`}
                className="rounded-sm-ds text-xs-ds placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground focus:ring-1! focus:ring-accent! focus:outline-none"
                {...register("title")}
              />
              {errors.title && (
                <span className="mt-1 text-xs text-destructive">{errors.title.message}</span>
              )}
            </Field>

            {/* link -> url */}
            {contentType === "link" && (
              <Field>
                <Label htmlFor="url" className="font-semibold text-muted-foreground">
                  Link
                </Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/article"
                  className="rounded-sm-ds text-xs-ds placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground focus:ring-1! focus:ring-accent! focus:outline-none"
                  {...register("url")}
                />
                {"url" in errors && errors.url && (
                  <span className="mt-1 text-xs text-destructive">{errors.url?.message}</span>
                )}
              </Field>
            )}

            {/* note -> body */}
            {contentType === "note" && (
              <Field>
                <FieldLabel htmlFor="body" className="font-semibold text-muted-foreground">
                  Note
                </FieldLabel>
                <Textarea
                  id="body"
                  placeholder="What is this useful for? When will you need it again?"
                  className="h-50 max-h-50 scrollbar-thin scrollbar-thumb-neutral-400/20 overflow-y-auto rounded-sm-ds text-xs-ds placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground focus:ring-1! focus:ring-accent! focus:outline-none"
                  {...register("body")}
                />
                {"body" in errors && errors.body && (
                  <span className="mt-1 text-xs text-destructive">{errors.body?.message}</span>
                )}
              </Field>
            )}

            {/* snippet -> code */}
            {contentType === "snippet" && (
              <Field>
                <FieldLabel htmlFor="code" className="font-semibold text-muted-foreground">
                  Code Snippet
                </FieldLabel>
                <Textarea
                  id="code"
                  placeholder="Paste or write the code snippet you want to save"
                  className="h-44 max-h-44 scrollbar-thin scrollbar-thumb-neutral-400/20 overflow-y-auto rounded-sm-ds font-mono text-xs-ds placeholder:font-sans placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground focus:ring-1! focus:ring-accent! focus:outline-none"
                  {...register("code")}
                />
                {"code" in errors && errors.code && (
                  <span className="mt-1 text-xs text-destructive">{errors.code?.message}</span>
                )}
              </Field>
            )}

            {/* description */}
            <Field>
              <FieldLabel htmlFor="description" className="font-semibold text-muted-foreground">
                Description
              </FieldLabel>
              <Textarea
                id="description"
                placeholder={`Add a description for the ${contentType} you want to save`}
                className="rounded-sm-ds text-xs-ds placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground focus:ring-1! focus:ring-accent! focus:outline-none"
                {...register("description")}
              />
              {errors.description && (
                <span className="mt-1 text-xs text-destructive">{errors.description.message}</span>
              )}
            </Field>

            {/* context */}
            <Field>
              <FieldLabel htmlFor="ctx" className="font-semibold text-muted-foreground">
                Why are you saving this? [Context]
              </FieldLabel>
              <Textarea
                id="ctx"
                placeholder="What is this useful for? When will you need it again?"
                className="h-25 rounded-sm-ds text-xs-ds placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground focus:ring-1! focus:ring-accent! focus:outline-none"
                {...register("ctx")}
              />
              {errors.ctx && (
                <span className="mt-1 text-xs text-destructive">{errors.ctx.message}</span>
              )}
            </Field>

            {/* folder and tags in 2-column layout */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="folder" className="font-semibold text-muted-foreground">
                  Folder
                </FieldLabel>
                <Controller
                  name="folder"
                  control={control}
                  render={({ field }) => (
                    <FolderCombobox
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  )}
                />
                {errors.folder && (
                  <span className="mt-1 text-xs text-destructive">{errors.folder.message}</span>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="tags" className="font-semibold text-muted-foreground">
                  Tags
                </FieldLabel>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <TagsInput
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  )}
                />
              </Field>
            </div>

            {/* root/global error */}
            {errors.root && (
              <span className="mx-auto text-xs text-destructive">{errors.root.message}</span>
            )}
          </FieldGroup>

          <DialogFooter className="mt-4 flex items-center justify-end gap-2 border-t border-input p-4">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving Changes..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
