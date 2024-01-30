import { ReadonlyURLSearchParams } from 'next/navigation';

type TextNode = {
  text: string;
};

type ElementNode = {
  type: string;
  children: Node[];
};

type Node = TextNode | ElementNode;

const renderNode = (node: Node): string => {
  if ('text' in node) {
    return node.text;
  } else if ('children' in node) {
    const childrenHtml = node.children.map(child => renderNode(child)).join('');
    const nodeType = node.type || 'p';
    return `<${nodeType}>${childrenHtml}</${nodeType}>`;
  } else {
    return '';
  }
};

export const convertToHtml = (data: Node[]): string => {
  return data?.map(item => renderNode(item)).join('');
};

export const formatFilterString = (
  pathname: string,
  filterString: string | null,
  key: string,
  value: string | undefined,
) => {
  let filterObj: Record<string, string[]> = {};

  if (filterString) {
    filterObj = filterString.split('|').reduce((acc: Record<string, string[]>, curr) => {
      const [k, v] = curr.split(':');
      acc[k] = v.split(',');
      return acc;
    }, {});
  }

  if (value !== undefined) {
    if (filterObj[key]?.includes(value)) {
      filterObj[key] = filterObj[key].filter(item => item !== value);

      if (filterObj[key].length === 0) {
        delete filterObj[key];
      }
    } else {
      if (filterObj[key]) {
        filterObj[key].push(value);
      } else {
        filterObj[key] = [value];
      }
    }
  }

  const newFilterString = Object.keys(filterObj)
    .map(k => `${k}:${filterObj[k].join(',')}`)
    .join('|');

  return newFilterString ? `${pathname}?filter=${newFilterString}` : pathname;
};

export const isFilterActive = (
  filterData: string | null,
  group: string,
  value: string | undefined,
) => {
  if (!filterData || value === undefined) return false;

  const filters = filterData.split('|').reduce<Record<string, string[]>>((acc, filter) => {
    const [filterGroup, filterValues] = filter.split(':');
    acc[filterGroup] = filterValues.split(',');
    return acc;
  }, {});

  return filters[group]?.includes(value);
};

export const createQueryString = (
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
  remove?: string | undefined,
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);
  if (remove) {
    params.delete(remove);
  }

  return decodeURIComponent(params.toString());
};
