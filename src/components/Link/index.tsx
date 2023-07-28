import { useState } from "react";

enum STATUS {
  HOVERED = "hovered",
  NORMAL = "normal",
}

export default function Link({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState(STATUS.NORMAL);

  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };

  return (
    <a
      className={status}
      href={href || "#"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}
