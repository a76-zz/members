export default {
  getCount: function(count, pageSize) {
    var remainder = count % pageSize,
        whole = (count - remainder) / pageSize;

    return remainder > 0 ? whole + 1 : whole;
  },
  getRange: function(count, pageSize, page) {
    var to = page * pageSize;

    if (count !== undefined) {
      to = Math.min(to, count);
    }

    return { 
      from: (page - 1) * pageSize, 
      to: to
    };
  } 
};