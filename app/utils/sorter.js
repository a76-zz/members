var sortAsc = function (sort, a, b) {
  return sort.value(a) > sort.value(b) ? 1 : -1;
};

var sortDesc = function (sort, a, b) {
  return sort.value(a) < sort.value(b) ? 1 : -1;
};

export default function (sort, data) {
  if (sort.asc) {
    return data.sort(function (a, b) {
      return sortAsc(sort, a, b);
    });
  } else {
    return data.sort(function (a, b) {
      return sortDesc(sort, a, b);
    });
  }
} 