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
