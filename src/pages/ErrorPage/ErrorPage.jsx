import classes from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.notfound}`}>
        <div className={`${classes["notfound-404"]}`}></div>
        <h1>404</h1>
        <h2>Oops! Page Not Be Found</h2>
        <p>
          Sorry but the page you are looking for does not exist, have been
          removed. name changed or is temporarily unavailable
        </p>
        <a href="/algorithm-visualizer">Back to homepage</a>
      </div>
    </div>
  );
}
