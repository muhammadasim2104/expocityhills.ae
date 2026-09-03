"use client";

import RegisterButton from "@/components/RegisterButton";

export default function FloatingRegisterButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40 pb-safe">
      <RegisterButton className="btn-editorial btn-editorial-primary shadow-lg shadow-forest-dark/30">
        Register Your Interest
      </RegisterButton>
    </div>
  );
}
