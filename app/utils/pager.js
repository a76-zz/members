export default {
  getCount: function(pageSize, total) {
    var remainder = total % pageSize,
        whole = (total - remainder) / pageSize;

    return remainder > 0 ? whole + 1 : whole;
  },
  getRange: function(pageSize, page, total) {
    var to = page * pageSize;

    if (total) {
      to = Math.min(to, total);
    }

    return { 
      from: (page - 1) * pageSize, 
      to: to
    };
  } 
};