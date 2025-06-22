// Here, limit = 5 is just the default value. It means: if no limit is passed, use 5 items per page.
function offsetPaginate(array, offset = 0, limit = 5) {
  const paginated = array.slice(offset, offset + limit);
  return {
    items: paginated,
    totalCount: array.length,
    hasMore: offset + limit < array.length,
  };
}

function cursorPaginate(array, after = null, limit = 5) {
  const startIndex = after ? array.findIndex(a => a.id === after) + 1 : 0;
  const items = array.slice(startIndex, startIndex + limit);
  const endCursor = items.length ? items[items.length - 1].id : null;
  const hasMore = startIndex + limit < array.length;

  return {
    items,
    pageInfo: {
      endCursor,
      hasMore,
    },
  };
}

module.exports = { offsetPaginate, cursorPaginate}