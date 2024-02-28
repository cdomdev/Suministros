// renderEmailTemplate.js

import ReactDOMServer from "react-dom/server";
const { EmailTemplate } = require("../../emails/EmailTemplate");

const renderEmailTemplate = (name) => {
  const emailHTML = ReactDOMServer.renderToStaticMarkup(
    <EmailTemplate name={name} />
  );
  return emailHTML;
};

export { renderEmailTemplate };
