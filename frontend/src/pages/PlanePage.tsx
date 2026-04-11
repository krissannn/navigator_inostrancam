

import Card from "../components/UI/Card/Card";
import type { CardDataElement } from "../DB/cardsData";
import BasePage from "./BasePage"
import styles from "./Styles.module.scss"

interface PlanePageProps {
  pageData: CardDataElement
}

function PlanePage({pageData}: PlanePageProps ) {

  return (
    <> 
      <BasePage pageData={pageData}/>
      <div className={styles.info}>
        <h2 className={styles.title}>Въезд и Миграционная карта</h2>
        <h3 className={styles.subtitle}>Важная информация для студентов УрФу</h3>

        <p>
          <span>Миграционная карта - документ, потверждающий законность пересечения границы.</span>
          Выдаётся бесплатно при въезде в Россию.
        </p>

        <article className={styles.info__cards}>
          <h2>Как заполнять миграционную карту</h2>

          <div className={styles.info__docs}>
            <Card title="Паспорт" text="Срок действия минимум 18 месяцев" />
            <Card title="Анкета" text="Заполняется на visa.kdmid.ru" />
            <Card title="Приглашение от УрФУ" text="Электронное приглашение на почту" />
            <Card title="Справка об отсутствии ВИЧ" text="Обязательно для учебной визы" />
            <Card title="Фотография" text="Размер 3.5 х 4.5 см" />

          </div>
        </article>

      </div>
    </>
   )
  }

export default PlanePage;