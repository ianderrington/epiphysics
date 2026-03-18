const options = {
  remarkPlugins: [() => import('remark-gfm').then(mod => mod.default)],
  rehypePlugins: [
    () => import('rehype-slug').then(mod => mod.default),
    [() => import('rehype-autolink-headings').then(mod => mod.default), { behavior: 'wrap' }],
    () => import('rehype-highlight').then(mod => mod.default),
  ],
  format: 'mdx',
};

module.exports = options; 