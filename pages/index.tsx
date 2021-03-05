import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';

const Index: NextPage = () => null;

Index.getInitialProps = async (context: NextPageContext) => {
  const href: string = '/dashboard';
  const as: string = href;
  if (context.res) {
    context.res.writeHead(302, {
      Location: href,
    });
    context.res.end();
  } else {
    Router.push(href, as);
  }
  return {};
};

export default Index;
