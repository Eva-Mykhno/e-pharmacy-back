const parseCategory = (category) => {
  const isString = typeof category === "string";
  if (!isString) return;
  const isCategory = (category) =>
    [
      "Head",
      "Leg",
      "Heart",
      "Medicine",
      "Dental Care",
      "Hand",
      "Skin Care",
    ].includes(category);

  if (isCategory(category)) return category;
};

const parseName = (name) => {
  if (typeof name !== "string" || !name.trim()) return;
  return new RegExp(name.trim(), "i");
};

export const parseFilterParams = (query) => {
  const { category, name } = query;

  const parsedCategory = parseCategory(category);
  const parsedName = parseName(name);

  return {
    category: parsedCategory,
    name: parsedName,
  };
};
