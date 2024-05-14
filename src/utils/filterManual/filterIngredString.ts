import { Menu } from "@/redux/features/menuSlice";

export const filterIngredString = (recipe: Menu) => {
  let selectedMenu = recipe;
  const lines = selectedMenu.RCP_PARTS_DTLS.split("\n");

  let parsedParts = [];

  for (let line of lines) {
    line = line.trim();
    if (!line.includes("g")) {
      continue;
    }

    const sections = line.split(":");
    for (let section of sections) {
      if (section.includes("g")) {
        const parts = section.split(",");

        for (let part of parts) {
          part = part.trim();
          if (part) {
            part = part.replace("[1인분]", "").replace("재료", "");
            if (part.endsWith(".")) {
              part = part.slice(0, -1);
            }
            if (part) {
              parsedParts.push(part);
            }
          }
        }
      }
    }
  }

  return parsedParts.join(", ");
};
