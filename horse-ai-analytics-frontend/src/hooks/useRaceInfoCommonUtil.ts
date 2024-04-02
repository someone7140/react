import { toast } from "@/components/ui/use-toast";
import { toastStyle } from "@/styles/CommonStyle";

export const useRaceInfoCommonUtil = () => {
  const copyToClipboard = async (copyString: string, copyItemName: string) => {
    await global.navigator.clipboard.writeText(copyString);
    toast({
      className: `${toastStyle({ textColor: "black" })}`,
      variant: "default",
      description: `${copyItemName}をコピーしました。`,
    });
  };

  return { copyToClipboard };
};
