"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TagsInputProps {
  name?: string;
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function TagsInput({
  value,
  onChange,
  placeholder = "Add tags (comma separated)",
  className,
  disabled = false,
}: TagsInputProps) {
  const [internalTags, setInternalTags] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const tags = value ?? internalTags;

  const updateTags = (nextTags: string[]) => {
    if (value === undefined) {
      setInternalTags(nextTags);
    }

    onChange?.(nextTags);
  };

  const addTags = (text: string) => {
    const newTags = text
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (newTags.length === 0) return;

    const existing = new Set(tags.map((tag) => tag.toLowerCase()));

    const uniqueTags = newTags.filter((tag) => {
      const key = tag.toLowerCase();

      if (existing.has(key)) return false;

      existing.add(key);
      return true;
    });

    if (uniqueTags.length > 0) {
      updateTags([...tags, ...uniqueTags]);
    }
  };

  const removeTag = (index: number) => {
    updateTags(tags.filter((_, i) => i !== index));
  };

  const handleChange = (text: string) => {
    if (text.includes(",")) {
      const parts = text.split(",");

      addTags(parts.slice(0, -1).join(","));
      setInputValue(parts[parts.length - 1]);
    } else {
      setInputValue(text);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTags(inputValue);
      setInputValue("");
    }

    if (event.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const commitInput = () => {
    if (inputValue.trim()) {
      addTags(inputValue);
      setInputValue("");
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-8 w-full flex-wrap items-center gap-1 rounded-sm-ds border border-input bg-transparent dark:bg-input/30 p-1",
        "focus-within:outline-none focus-within:ring-1 focus-within:ring-accent",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onClick={(event) => {
        event.currentTarget.querySelector("input")?.focus();
      }}
    >
      {/* Hidden form values */}
      {/*{tags.map((tag, index) => (
        <input
          key={`form-${index}`}
          type="hidden"
          name={name}
          value={tag}
          disabled={disabled}
        />
      ))}*/}

      {/* tag chips */}
      {tags.map((tag, index) => (
        <Badge
          key={`${tag}-${index}`}
          variant="secondary"
          className="inline-flex dark:bg-black/30 bg-neutral-400/10 shrink-0 items-center gap-1 rounded-sm-ds border-0 px-1.5 py-0 text-xs font-medium"
        >
          <span>#{tag}</span>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            title={`Remove ${tag}`}
            aria-label={`Remove ${tag}`}
            className="size-3.5 shrink-0 rounded-sm p-0 text-muted-foreground hover:bg-muted-foreground/20 hover:dark:bg-primary/20 hover:text-foreground"
            onClick={(event) => {
              event.stopPropagation();
              removeTag(index);
            }}
          >
            <X className="size-3" />
          </Button>
        </Badge>
      ))}

      {/* typing area */}
      <Input
        value={inputValue}
        disabled={disabled}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={commitInput}
        placeholder={tags.length === 0 ? placeholder : ""}
        className={cn(
          "flex-1 items-center border-0 rounded-sm-ds bg-transparent dark:bg-transparent shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground",
          tags.length !== 0 ? "px-0.5" : "",
        )}
      />
    </div>
  );
}
