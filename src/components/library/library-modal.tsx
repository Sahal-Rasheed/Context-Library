"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  Controller,
  type SubmitHandler,
  type FieldErrors,
} from "react-hook-form";

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
import { CONTENT_TYPES } from "./library-page";
import type { ContextItemType } from "@/data";
import { Textarea } from "../ui/textarea";
import { FolderCombobox } from "./folder-combobox";
import { TagsInput } from "./tags-input";
import { itemFormSchema, type ItemFormData } from "@/lib/schemas";
import { cn } from "cn";

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
    // setError,
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

  const onSubmit: SubmitHandler<ItemFormData> = (data) => {
    console.log("Form Data Submitted successfully:", data);

    // setError("root", { message: "Submission failed. Please try again." });
    // ready for server action invocation:
    // await saveItemAction(data);
    onOpenChange(false);
  };

  const onError = (formErrors: FieldErrors<ItemFormData>) => {
    console.error("Form Validation Failed:", formErrors);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* this makes the modal uncontrolled, to make it controlled we used  open and onOpenChange shadcn dialog props so now we has the control not shadcn */}
      {/*<DialogTrigger
          render={<Button variant="outline">Open Dialog</Button>}
      />*/}
      <DialogContent className="max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90%] sm:max-h-fit rounded-md-ds border border-sidebar-border bg-sidebar text-foreground overflow-y-auto scrollbar-thin scrollbar-thumb-muted">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogHeader>
            <DialogTitle className="font-semibold text-base-ds">
              Save to library
            </DialogTitle>
            <DialogDescription>
              Add this to your context library.
            </DialogDescription>
          </DialogHeader>

          {/* content choices for ctx saving */}
          <div className="flex flex-wrap items-center gap-2 mb-4 mt-2">
            {CONTENT_TYPES.map((type) => (
              <Button
                key={type.type}
                type="button"
                variant="outline"
                className={cn(
                  "inline-flex items-center rounded-md-ds text-xs h-0 py-3.5 px-2.5 gap-1.5 transition-colors cursor-pointer",
                  contentType === type.type
                    ? "dark:bg-black/30 bg-neutral-400/10 dark:hover:bg-black/40 hover:bg-neutral-400/10"
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
              <Label
                htmlFor="title"
                className="text-muted-foreground font-semibold"
              >
                Title
              </Label>
              <Input
                id="title"
                placeholder={`Title for the ${contentType} you want to save`}
                className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-xs text-destructive mt-1">
                  {errors.title.message}
                </span>
              )}
            </Field>

            {/* link -> url */}
            {contentType === "link" && (
              <Field>
                <Label
                  htmlFor="url"
                  className="text-muted-foreground font-semibold"
                >
                  Link
                </Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/article"
                  className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground"
                  {...register("url")}
                />
                {"url" in errors && errors.url && (
                  <span className="text-xs text-destructive mt-1">
                    {errors.url?.message}
                  </span>
                )}
              </Field>
            )}

            {/* note -> body */}
            {contentType === "note" && (
              <Field>
                <FieldLabel
                  htmlFor="body"
                  className="text-muted-foreground font-semibold"
                >
                  Note
                </FieldLabel>
                <Textarea
                  id="body"
                  placeholder="What is this useful for? When will you need it again?"
                  className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground h-50 max-h-50 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-400/20"
                  {...register("body")}
                />
                {"body" in errors && errors.body && (
                  <span className="text-xs text-destructive mt-1">
                    {errors.body?.message}
                  </span>
                )}
              </Field>
            )}

            {/* snippet -> code */}
            {contentType === "snippet" && (
              <Field>
                <FieldLabel
                  htmlFor="code"
                  className="text-muted-foreground font-semibold"
                >
                  Code Snippet
                </FieldLabel>
                <Textarea
                  id="code"
                  placeholder="Paste or write the code snippet you want to save"
                  className="text-xs-ds font-mono rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:font-sans placeholder:text-muted-foreground h-44 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-400/20"
                  {...register("code")}
                />
                {"code" in errors && errors.code && (
                  <span className="text-xs text-destructive mt-1">
                    {errors.code?.message}
                  </span>
                )}
              </Field>
            )}

            {/* description */}
            <Field>
              <FieldLabel
                htmlFor="description"
                className="text-muted-foreground font-semibold"
              >
                Description
              </FieldLabel>
              <Textarea
                id="description"
                placeholder={`Add a description for the ${contentType} you want to save`}
                className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-xs text-destructive mt-1">
                  {errors.description.message}
                </span>
              )}
            </Field>

            {/* context */}
            <Field>
              <FieldLabel
                htmlFor="ctx"
                className="text-muted-foreground font-semibold"
              >
                Why are you saving this? [Context]
              </FieldLabel>
              <Textarea
                id="ctx"
                placeholder="What is this useful for? When will you need it again?"
                className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground h-25"
                {...register("ctx")}
              />
              {errors.ctx && (
                <span className="text-xs text-destructive mt-1">
                  {errors.ctx.message}
                </span>
              )}
            </Field>

            {/* folder and tags in 2-column layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Field>
                <FieldLabel
                  htmlFor="folder"
                  className="text-muted-foreground font-semibold"
                >
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
                  <span className="text-xs text-destructive mt-1">
                    {errors.folder.message}
                  </span>
                )}
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="tags"
                  className="text-muted-foreground font-semibold"
                >
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
              <span className="text-xs text-destructive mx-auto">
                {errors.root.message}
              </span>
            )}
          </FieldGroup>

          <DialogFooter className="mt-4 p-4 border-t border-input flex items-center justify-end gap-2">
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
