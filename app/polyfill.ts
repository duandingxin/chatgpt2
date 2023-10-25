declare global {
  interface Array<T> {
    at(index: number): T | undefined;
  }
}

if (!Array.prototype.at) {
  Array.prototype.at = function (index: number) {
    // 获取数组的长度
    const length = this.length;

    // 将负索引转换为正索引
    if (index < 0) {
      index = length + index;
    }

    // 如果索引超出范围，则返回undefined
    if (index < 0 || index >= length) {
      return undefined;
    }

    // 使用Array.prototype.slice方法获取指定索引处的值
    return Array.prototype.slice.call(this, index, index + 1)[0];
  };
}

export {};
