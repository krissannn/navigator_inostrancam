import ReactMarkdown from "react-markdown";
import styles from './Styles.module.scss'
import remarkGfm from "remark-gfm";

function InfoPanel({description}: {description: string}) {
  return (
    <div className={styles.markdownContent}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {description}
      </ReactMarkdown>   
    </div>
  )
}

export default InfoPanel