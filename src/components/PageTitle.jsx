import Helmet from "react-helmet";

function PageTitle({ title, location }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Aire - {title}</title>
      <link rel="canonical" href={location} />
    </Helmet>
  );
}

export default PageTitle;
