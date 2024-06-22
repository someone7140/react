import { toast } from "@/components/ui/use-toast";
import { toastStyle } from "@/styles/CommonStyle";

export const useFormCommonUtil = () => {
  const copyToClipboard = async (copyString: string, copyItemName: string) => {
    await global.navigator.clipboard.writeText(copyString);
    toast({
      className: `${toastStyle({ textColor: "black" })}`,
      variant: "default",
      description: `${copyItemName}をコピーしました。`,
    });
  };

  const dateToString = (d: Date) => {
    return d.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return { copyToClipboard, dateToString };
};
