import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useAIData } from "@/contexts/AiResponseContext";
import avatar_man from "/assets/avatar-man.png";

export default function HeaderAvatar() {
  const auth = useAuthContext();
  const { setCanSetWorkingPage, canSetWorkingPage } = useAIData();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={avatar_man} />
          <AvatarFallback>
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-fit">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            if (auth.user) auth.logout();
          }}
          className="cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Switch
            checked={canSetWorkingPage}
            onClick={(e) => {
              e.stopPropagation();
              setCanSetWorkingPage((prev) => !prev);
            }}
            className="cursor-pointer"
          />
          AI 작업중 화면 표시
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
