const useSlot = (slots) => {
  const tableSlots = {},
    searchSlots = {},
    submitSlots = {}

  for (let key in slots) {
    const val = slots[key]
    if (key.endsWith('XbS')) {
      searchSlots[key] = val;
    } else if (key.endsWith('XbF')) {
      submitSlots[key] = val;
    } else {
      tableSlots[key] = val;
    }
  }
  return {
    tableSlots,
    searchSlots,
    submitSlots
  }
}
export default useSlot