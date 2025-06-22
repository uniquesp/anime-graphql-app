function offsetPaginate(array, offset = 0, limit = 5) {
  const paginated = array.slice(offset, offset + limit);
  return {
    items: paginated,
    totalCount: array.length,
    hasMore: offset + limit < array.length,
  };
}

module.exports = { offsetPaginate}