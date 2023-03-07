const { components } = require('../content/remote-md.json');
const metacontent = require('../content/global-meta');

const modContent = function (filename, content, contentKey) {
  let fileData = components[contentKey]['files'].find((file) => {
    return file.file === filename;
  });

  let showBreadCrumbs = fileData.breadcrumbs && fileData.breadcrumbs === true;

  let buttons = '';
  if (fileData.buttons) {
    buttons = `<div className="mb-18"><ButtonGroup buttons={${JSON.stringify(
      fileData.buttons,
    )}} /></div>`;
  }

  let re1 = /```mermaid/g;
  var hasMermaid = false;
  while (re1.exec(content) != null) {
    hasMermaid = true;
    break;
  }

  let re = /```mermaid([\s\S]*?)```/gm;

  if (fileData) {
    return {
      content: `${hasMermaid ? 'import { Mermaid } from "@theme/Mermaid";' : ''}
${fileData.buttons ? 'import ButtonGroup from "@site/src/ButtonGroup";' : ''}
${
  showBreadCrumbs
    ? 'import TBDBreadcrumbs from "@site/src/TBDBreadcrumbs";'
    : ''
}

<head>
  <title>${fileData.meta.title}</title>
  <meta property="og:title" content="${fileData.meta.title}" />
  <meta property="og:description" content="${metacontent.description}" />
  <meta name="description" content="${metacontent.description}" />
  <meta
    property="og:url"
    content="${'https://developer.tbd.website/' + fileData.meta.path}"
  />
  <link
    rel="apple-touch-icon"
    href="https://developer.tbd.website/img/tbd-fav-icon-main.png"
  />
</head>

<div className="prose prose-pink">

${showBreadCrumbs ? '<TBDBreadcrumbs></TBDBreadcrumbs>' : ''}

${buttons}

${content.replaceAll(re, '\r<Mermaid chart={`\r$1`}/>\r\r')}

</div>`,
    };
  }

  return undefined;
};

module.exports = modContent;
