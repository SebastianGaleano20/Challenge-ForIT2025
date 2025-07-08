export const validateTask = (
  title: string,
  description: string
): string | null => {
  if (!title.trim()) return "El título es obligatorio.";
  if (title.length < 3) return "El título debe tener al menos 3 caracteres.";
  if (!description.trim()) return "La descripción es obligatoria.";
  if (description.length < 5)
    return "La descripción debe tener al menos 5 caracteres.";
  return null;
};
