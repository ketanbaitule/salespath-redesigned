import { Button } from "@/components/ui/button";
import { Salesperson } from "@/types/salesperson";
import { Mail, Phone, MessageSquare } from "lucide-react";
import SalespersonAvatar from "@/assets/svg/salesperson.svg";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

export default function SalespersonInfo({
  salesperson,
}: {
  salesperson: Salesperson;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={salesperson.name} alt={salesperson.name} />
          <AvatarFallback>
            <Image src={SalespersonAvatar} alt={salesperson.name} />
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{salesperson.name}</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{salesperson.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{salesperson.phone}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" asChild>
<Link href={`tel:${salesperson.phone}`}>
          <Phone className="mr-2 h-4 w-4" />
          Call
</Link>
        </Button>
        <Button asChild>
<Link href={`smsto:${salesperson.phone}:Salespath`}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
</Link>
        </Button>
      </div>
    </div>
  );
}
