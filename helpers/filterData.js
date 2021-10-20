import sales from "../api/sales.js";

export default ({ page, itemsPerPage }, filter) => {
  let filteredData = sales.results;
  if (filter) {
    Object.entries(filter).forEach(filterItem => {
      const [filterItemKey, filterItemValue] = filterItem;
      if (filterItemValue.length) {
        if (filterItemKey === "records") {
          filteredData = filteredData.filter(dataItem => {
            return Object.values(dataItem).find(dataItemProp => {
              if (typeof dataItemProp !== "object") {
                return dataItemProp.toString().toLowerCase().includes(filterItemValue.toLowerCase());
              }
              return Object.values(dataItemProp).join(" ").toLowerCase().includes(filterItemValue.toLowerCase());
            });
          });
        } else if (filterItemKey === "sales") {
          filteredData = filteredData.filter(dataItem => {
            return parseFloat(dataItem["sales"]) > parseFloat(filterItemValue);
          });
        } else if (filterItemKey === "gender" || filterItemKey === "country") {
          filteredData = filteredData.filter(dataItem => {
            return dataItem[filterItemKey].toLowerCase() === filterItemValue.toLowerCase();
          });
        } else {
          filteredData = filteredData.filter(dataItem => {
            if (typeof dataItem[filterItemKey] !== "object") {
              return dataItem[filterItemKey].toString().toLowerCase().includes(filterItemValue.toLowerCase());
            }
            return Object.values(dataItem[filterItemKey]).join(" ").toLowerCase().includes(filterItemValue.toLowerCase());
          });
        }
      }
    });
  }
  const itemsCount = filteredData.length;
  const start = (page - 1) * itemsPerPage;
  const items = filteredData.slice(start, start + itemsPerPage);
  return {
    items,
    itemsCount
  };
};