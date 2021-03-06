import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

import styles from '@/styles/DashboardEvent.module.css'

const Event = ({ slug, name, id, onDelete }) => (
  <div className={styles.event}>
    <h4>
      <Link href={`/events/${slug}`}>
        <a>{name}</a>
      </Link>
    </h4>
    <Link href={`/events/edit/${id}`}>
      <a className={styles.edit}>
        <FaPencilAlt /> <span>Edit Event</span>
      </a>
    </Link>
    <a href='#' className={styles.delete} onClick={() => onDelete(id)}>
      <FaTimes /> <span>Delete</span>
    </a>
  </div>
)

export default Event;