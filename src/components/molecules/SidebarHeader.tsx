import Image from "next/image";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import { PanelLeftClose } from "lucide-react";

export default function SidebarHeader() {
  return (
    <header className="flex justify-center flex-col items-center ">
      <a href="/" className="p-4 ">
        <Text variant="white" size="2xl" className="hover:text-blue-700">
          JTracker
        </Text>
      </a>

      <Button
        variant="ghost"
        size="sm"
        icon={<PanelLeftClose size={18} />}
        aria-label="Colapsar barra lateral"
      >
        Colapsar
      </Button>
    </header>
  );
}
