"use client";

import { X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  disabled: boolean;
  placeholder?: string;
  className?: string;
}

export function TagsInput({
  value = [],
  onChange,
  placeholder = "Add tags (comma separated)",
  className,
  disabled,
}: TagsInputProps) {
  const [inputValue, setInputValue] = React.useState("");

  const tags = value ?? [];

  const addTags = (text: string) => {
    const newTags = text
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
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
      onChange?.([...tags, ...uniqueTags]);
    }
  };

  const removeTag = (index: number) => {
    onChange?.(tags.filter((_, i) => i !== index));
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
      if (inputValue.trim()) {
        addTags(inputValue);
        setInputValue("");
      }
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
        "flex min-h-8 w-full flex-wrap items-center gap-1 rounded-sm-ds border border-input bg-transparent p-1 dark:bg-input/30",
        "focus-within:ring-1 focus-within:ring-accent focus-within:outline-none",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onClick={(event) => {
        event.currentTarget.querySelector("input")?.focus();
      }}
    >
      {/* tag chips */}
      {tags.map((tag, index) => (
        <Badge
          key={`${tag}-${index}`}
          variant="secondary"
          className="inline-flex shrink-0 items-center gap-1 rounded-sm-ds border-0 bg-neutral-400/10 px-1.5 py-0 text-xs font-medium dark:bg-black/30"
        >
          <span>#{tag}</span>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            title={`Remove ${tag}`}
            aria-label={`Remove ${tag}`}
            className="size-3.5 shrink-0 rounded-sm p-0 text-muted-foreground hover:bg-muted-foreground/20 hover:text-foreground hover:dark:bg-primary/20"
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
        id="tags-input"
        value={inputValue}
        disabled={disabled}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={commitInput}
        placeholder={tags.length === 0 ? placeholder : ""}
        className={cn(
          "flex-1 items-center rounded-sm-ds border-0 bg-transparent shadow-none outline-none placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent",
          tags.length !== 0 ? "px-0.5" : "",
        )}
      />
    </div>
  );
}
