var buffer = {},
  map = {},
  innerPoint = function (range, point) {
    return range.from <= point && range.to >= point;
  },
  leftPoint = function (range, point) {
    return range.from > point;
  },
  rightPoint = function (range, point) {
    return range.from < point;
  },
  find = function (key, point, resolver, startIndex) {
    var index = startIndex || 0,
        range,
        found = false;
    
    if (this.map[key]) {
      while (index < map[key].length && !found) {
        range = map[key][index];
        found = resolver(range, point);
        index++;
      }
    } 

    return {
      found: found,
      index: index,
      range: range
    };
  },
  coverage = function (key, range, capacity, count) {
    var r_step = Math.min(count, range.from + capacity),
        l_step,
        r_c = find(key, r_step, innerPoint),
        l_c,
        to,
        from = range.from;

    if (r_c.found) {
      to = r_c.range.from;
    } else {
      to = r_step;
    }

    if (to - from < capacity) {
      l_step = Math.max(0, to - capacity);
      l_c = find(key, l_step, innerPoint);

      if (l_c.found) {
        from = l_c.range.to;
      } else {
        from = l_step;
      }
    }

    return { from: from, to: to };
  };

export default {
  write: function (key, data, range) {
    var left = find(key, range.from, innerPoint),
        right = find(key, range.to, innerPoint),
        insert,
        data_index = 0;

    if (map[key] === undefined) {
      map[key] = [];
      buffer[key] = [];
    }

    if (left.found) {
      if (right.found) {
        map[key].splice(left.index - 1, right.index - left.index + 1, { from: left.range.from, to: right.range.to });
      } else {
        map[key].splice(left.index - 1, map.length - left.index + 1, { from: left.range.from, to: range.to });
      }
    } else {
      if (right.found) {
        map[key].splice(0, right.index, { from: range.from, to: right.range.to });
      } else {
        insert = find(key, range.to, leftPoint);
        if (insert.found) {
          map[key].splice(insert.index - 1, 0, range);
        } else {
          map[key].push(range);
        }
      }
    }

    for (var index = range.from; index < range.to; index++, data_index++) {
      buffer[key][index] = data[data_index];
    }
  },
  coverage: function (key, range, capacity, count) {
    var left = find(key, range.from, innerPoint),
        right = find(key, range.to, innerPoint),
        from = range.from,
        to = range.to,
        result;

    if (left.found) {
      from = left.range.to;
    }

    if (right.found) {
      to = right.range.from;
    }

    result = { from: from, to: to };

    if (to - from < capacity) {
      if (count !== undefined) {
        result = coverage(key, result, capacity, count);
      } else {
        result.to = from + capacity;
      }
    }

    return result;
  },
  count: function (key) {
    var result = 0,
        index = 0;
    
    if (map[key]) {
      for (index = 0; index < map[key].length; index++) {
        result += map[key][index].to - map[key][index].from;
      }
    }

    return result;
  },
  contains: function (key, range) {
    var left = find(key, range.from, innerPoint),
        right = find(key, range.to, innerPoint);

    return left.found && right.found && (left.index === right.index);
  },
  readUnsafe: function (key, range) {
    if (buffer[key]) {
      return buffer[key].slice(range.from, range.to);
    } else {
      return [];
    }
  },
  readAll: function (key) {
    return buffer[key];
  },
  read: function (key, range) {
    var result = {};
    result.found = this.contains(key, range);

    if (result.found) {
      result.data = this.readUnsafe(key, range);
    }
    return result;
  }
};