import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import Select from "../Select/Select";
import { useAuth } from "../../Services/auth.hooks";
import styles from "./Styles.module.scss";

function Header() {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className={styles.header}>
      <Select />
      {!isAuthenticated ? (
        <Link className={styles.header__button} to="/login">
          {t("button.login")}
        </Link>
      ) : (
        <button
          type="button"
          className={styles.header__button}
          onClick={logout}
        >
          {t("button.logout")}
        </button>
      )}
    </header>
  );
}

export default Header;
