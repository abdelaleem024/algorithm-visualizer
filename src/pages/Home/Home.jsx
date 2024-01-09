import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import Footer from "../../components/Footer/Footer";
import Grid from "../../components/Grid/Grid";
import SettingsBar from "../../components/SettingsBar/SettingsBar";
import log from "../../utils/log";

function Home() {
  log("<Home/ > rendering", 5);

  return (
    <div className={styles.home}>
      <Header />
      <SettingsBar />
      <Grid />
      <Footer />
    </div>
  );
}
export default Home;
