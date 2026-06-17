

"use client";

import { useEffect } from "react";

export default function PageTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = `Rediam - ${title}`;
  }, [title]);

  return null;
}