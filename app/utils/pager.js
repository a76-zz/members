export default {
  getCount: function(pageSize, count) {
    var remainder = count % pageSize,
        whole = (count - remainder) / pageSize;

    return remainder > 0 ? whole + 1 : whole;
  },
  getRange: function(pageSize, page, count) {
    var to = page * pageSize;

    if (count) {
      to = Math.min(to, count);
    }

    return { 
      from: (page - 1) * pageSize, 
      to: to
    };
  } 
};