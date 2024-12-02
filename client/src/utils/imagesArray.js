// Importing images for avatars
const avatarArray = Array.from({ length: 4 }, (_, i) => require(`../assets/avatars/avatar${i + 1}.webp`));

// Importing images for background (bg)
const bgArray = Array.from({ length: 4 }, (_, i) => require(`../assets/bg/bg${i + 1}.webp`));

// Importing images for items
const itemArray = Array.from({ length: 4 }, (_, i) => require(`../assets/items/item${i + 1}.webp`));

// Importing images for widgets
const widgetArray = Array.from({ length: 4 }, (_, i) => require(`../assets/widgets/widget${i + 1}.webp`));

// Exporting arrays for use
export { avatarArray, bgArray, itemArray, widgetArray };