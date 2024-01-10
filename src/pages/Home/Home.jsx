import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import Footer from "../../components/Footer/Footer";
import Grid from "../../components/Grid/Grid";
import SettingsBar from "../../components/SettingsBar/SettingsBar";
import log from "../../utils/log";
// import UserOnboarding from "../../components/UserOnboarding/UserOnboarding";

function Home() {
  log("<Home/ > rendering", 5);
  return (
    <div className={styles.home}>
      {/* <UserOnboarding /> */}
      <Header />
      <SettingsBar />
      <Grid />
      <Footer />
    </div>
  );
}
export default Home;
