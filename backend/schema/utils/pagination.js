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

function relayPaginate(array, { first, after, last, before }) {
  let startIndex = 0;
  let endIndex = array.length;

  if (after) {
    const afterIndex = array.findIndex((item) => item.id === after);
    if (afterIndex !== -1) startIndex = afterIndex + 1;
  }

  if (before) {
    const beforeIndex = array.findIndex((item) => item.id === before);
    if (beforeIndex !== -1) endIndex = beforeIndex;
  }

  let sliced = array.slice(startIndex, endIndex);

  if (first !== undefined) {
    sliced = sliced.slice(0, first);
  } else if (last !== undefined) {
    sliced = sliced.slice(-last);
  }

  const edges = sliced.map((anime) => ({
    node: anime,
    cursor: anime.id,
  }));

  const startCursor = edges[0]?.cursor || null;
  const endCursor = edges[edges.length - 1]?.cursor || null;

  const firstIndexInArray = array.findIndex((item) => item.id === startCursor);
  const lastIndexInArray = array.findIndex((item) => item.id === endCursor);

  return {
    edges,
    pageInfo: {
      startCursor,
      endCursor,
      hasPreviousPage: firstIndexInArray > 0,
      hasNextPage: lastIndexInArray < array.length - 1,
    },
    totalCount: array.length,
  };
}

function relayPaginateForInfiniteScroll(array, { first, after }) {
  return relayPaginate(array, { first, after });
}



module.exports = { offsetPaginate, cursorPaginate, relayPaginate, relayPaginateForInfiniteScroll}