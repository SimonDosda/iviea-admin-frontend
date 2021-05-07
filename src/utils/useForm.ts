import { useState } from "react";

export default function useForm<T>(
  defaults: T,
): { values: T; updateValues: (e: React.FormEvent) => void } {
  const [values, setValues] = useState<T>(defaults);

  function updateValues(e: React.FormEvent): void {
    const target = <HTMLInputElement>e.target;
    setValues({
      ...values,
      [target.name]: target.type === "number" ? parseInt(target.value) : target.value,
    });
  }

  return { values, updateValues };
}
