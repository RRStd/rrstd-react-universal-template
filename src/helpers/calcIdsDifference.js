

export default (fetchedItems, storedItemsIds) => {
  const fetchedItemsIds = fetchedItems.map(el => el.id);
  const newItemsIds = fetchedItemsIds.filter(el => !storedItemsIds.find(id => id === el));
  return { fetchedItemsIds, newItemsIds, storedItemsIds };
};
