import { useNavigate } from "@solidjs/router/dist/routing";

interface RedirectProps {
  children: any;
  when: boolean;
  to: string;
}

export default function Redirect(props: RedirectProps) {
  const navigate = useNavigate();

  return () => (props.when ? navigate(props.to) : props.children);
}
