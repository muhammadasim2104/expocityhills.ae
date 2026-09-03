"use client";

import { useRegisterModal } from "@/components/RegisterModalProvider";

export default function RegisterButton({
  children = "Register Your Interest",
  className = "btn-editorial btn-editorial-primary",
  building,
  submitLabel,
}: {
  children?: React.ReactNode;
  className?: string;
  building?: string;
  submitLabel?: string;
}) {
  const { openRegister } = useRegisterModal();
  return (
    <button
      type="button"
      className={className}
      onClick={() => openRegister({ building, submitLabel: submitLabel ?? String(children) })}
    >
      {children}
    </button>
  );
}
