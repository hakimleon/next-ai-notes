import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { useFormStatus } from "react-dom";

const LoadingButton = ({title}: {title: string}) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
      {pending ? title : title}
    </Button>
  );
};

export default LoadingButton;
