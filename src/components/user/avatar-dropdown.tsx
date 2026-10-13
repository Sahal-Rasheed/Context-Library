"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/actions/auth";
import { authClient } from "@/lib/auth-client";

import { Mail, User, Info } from "lucide-react";

export function AvatarDropdown() {
  // since this is a client component, and also the `NavBar` where this component is used is also a client component,
  // if we use the server action `getCurrentSession` here, we have to use `useEffect` to fetch the session data, and have to manage loading states and all manually even though api call is done `server to server` is the only advantage of using server action here, but
  // instead, we can use the `useSession` hook from better-auth client side client we created, which will handle the loading states and data fetching for us without having to use `useEffect` and manage loading states manually. thing is here the api call will take place client side.
  // this is the better approach here.
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await signOut();
  }

  if (isPending || !session) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="after:size-4.5 after:rounded-sm after:aspect-square after:overflow-hidden after:bg-neutral-500 after:animate-ping animate-pulse"
        title="Profile"
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden"
            title="Profile"
          >
            <Avatar>
              <AvatarImage
                src="https://cdn-icons-png.flaticon.com/512/7422/7422265.png"
                alt="avatar"
                className="rounded-md-ds aspect-square overflow-hidden"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent
        className="min-w-fit -translate-x-2.5 rounded-md-ds border border-border bg-card p-1 shadow-md"
        align="center"
        sideOffset={10}
      >
        <DropdownMenuGroup>
          {session.user.email.includes("anonymous") ? null : (
            <DropdownMenuItem className="text-sm font-medium tracking-wide truncate max-w-md pointer-events-none">
              <Mail className="size-3.5" />
              <span className="line-clamp-2 truncate">
                {session.user.email}
              </span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="text-sm font-medium tracking-wide truncate max-w-md pointer-events-none">
            <User className="size-3.5" />
            <span className="line-clamp-2 truncate">{session.user.name}</span>
          </DropdownMenuItem>
          {session.user.isAnonymous && (
            <DropdownMenuItem className="text-xs text-amber-300 font-medium tracking-wide max-w-xs pointer-events-none">
              <Info className="size-3.5" />
              <span className="line-clamp-2">
                You are currently logged in as a guest. Your data will not be
                saved after you log out.
              </span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex items-center justify-center">
          <DropdownMenuItem
            className="flex-1 justify-center text-sm font-medium tracking-wide"
            variant="destructive"
            onClick={handleSignOut}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
