var sortAsc = function (sortering, a, b) {
  return sortering.value(a) > sortering.value(b) ? 1 : -1;
};

var sortDesc = function (sortering, a, b) {
  return sortering.value(a) < sortering.value(b) ? 1 : -1;
};

export default function (sortering, data) {
  if (sortering.asc) {
    return data.sort(function (a, b) {
      return sortAsc(sortering, a, b);
    });
  } else {
    return data.sort(function (a, b) {
      return sortDesc(sortering, a, b);
    });
  }
} 