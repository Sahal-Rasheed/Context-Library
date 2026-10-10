"use client";

import * as React from "react";

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
import { cn } from "cn";
import { Textarea } from "../ui/textarea";

type LibraryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LibraryModal({ open, onOpenChange }: LibraryModalProps) {
  const [contentType, setContentType] = React.useState<ContextItemType>("link");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", new FormData(e.currentTarget));
    // TODO: save logic
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit}>
        {/* this makes the modal uncontrolled, to make it controlled we used  open and onOpenChange shadcn dialog props so now we has the control not shadcn */}
        {/*<DialogTrigger
          render={<Button variant="outline">Open Dialog</Button>}
        />*/}
        <DialogContent className="sm:max-w-fit rounded-md-ds border border-sidebar-border bg-sidebar text-foreground">
          <DialogHeader>
            <DialogTitle className="font-semibold text-base-ds">
              Save to library
            </DialogTitle>
            <DialogDescription>
              Add this to your context library.
            </DialogDescription>
          </DialogHeader>

          {/* content choices for ctx saving */}
          <div className="flex items-center gap-2 mb-4">
            {CONTENT_TYPES.map((type) => (
              <Button
                key={type.type}
                variant="outline"
                className={cn(
                  "inline-flex items-center rounded-md-ds text-xs h-0 py-3.5 px-2.5 gap-1.5",
                  contentType === type.type
                    ? "dark:bg-black/30 bg-neutral-400/10 dark:hover:bg-black/40 hover:bg-neutral-400/10"
                    : "",
                )}
                onClick={() => setContentType(type.type)}
                disabled={type.type === "image" ? true : false}
              >
                {type.icon}
                <span>{type.name}</span>
              </Button>
            ))}
          </div>

          <FieldGroup className="">
            <Field>
              <Label
                htmlFor="ctx-lib-title"
                className="text-muted-foreground font-semibold"
              >
                Title
              </Label>
              <Input
                id="ctx-lib-title"
                name="ctx-lib-title"
                placeholder={`Title for the ${contentType} you want to save`}
                className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground"
              />
            </Field>

            {contentType === "link" && (
              <Field>
                <Label
                  htmlFor="ctx-lib-link"
                  className="text-muted-foreground font-semibold"
                >
                  Link
                </Label>
                <Input
                  id="ctx-lib-link"
                  name="ctx-lib-link"
                  type="url"
                  placeholder="Paste the URL you want to save"
                  className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground"
                />
              </Field>
            )}

            {contentType === "note" && (
              <Field>
                <FieldLabel
                  htmlFor="ctx-lib-note-body"
                  className="text-muted-foreground font-semibold"
                >
                  Note
                </FieldLabel>
                <Textarea
                  id="ctx-lib-note-body"
                  name="ctx-lib-note-body"
                  placeholder="What is this useful for? When will you need it again?"
                  className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground h-50 max-h-50 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-400/20"
                />
              </Field>
            )}

            {contentType === "snippet" && (
              <Field>
                <FieldLabel
                  htmlFor="ctx-lib-code"
                  className="text-muted-foreground font-semibold"
                >
                  Code Snippet
                </FieldLabel>
                <Textarea
                  id="ctx-lib-code"
                  name="ctx-lib-code"
                  placeholder="Paste or write the code snippet you want to save"
                  className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground h-50 max-h-50 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-400/20"
                />
              </Field>
            )}

            <Field>
              <FieldLabel
                htmlFor="ctx-lib-desc"
                className="text-muted-foreground font-semibold"
              >
                Description
              </FieldLabel>
              <Textarea
                id="ctx-lib-desc"
                name="ctx-lib-desc"
                placeholder={`Add a description for the ${contentType} you want to save`}
                className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground"
              />
            </Field>

            <Field>
              <FieldLabel
                htmlFor="ctx-lib-ctx"
                className="text-muted-foreground font-semibold"
              >
                Why are you saving this? [Context]
              </FieldLabel>
              <Textarea
                id="ctx-lib-ctx"
                name="ctx-lib-ctx"
                placeholder="What is this useful for? When will you need it again?"
                className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground h-25"
              />
            </Field>

            {/* folder and tags in 2 column */}
            <div className="grid grid-cols-2 gap-2">
              <Field>
                <FieldLabel
                  htmlFor="ctx-lib-folder"
                  className="text-muted-foreground font-semibold"
                >
                  Folder
                </FieldLabel>
                <Input
                  id="ctx-lib-folder"
                  name="ctx-lib-folder"
                  placeholder="Add to a folder"
                  className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground"
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="ctx-lib-tags"
                  className="text-muted-foreground font-semibold"
                >
                  Tags
                </FieldLabel>
                <Input
                  id="ctx-lib-tags"
                  name="ctx-lib-tags"
                  placeholder="Add tags (comma separated)"
                  className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground"
                />
              </Field>
            </div>
          </FieldGroup>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
