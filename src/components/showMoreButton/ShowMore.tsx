"use client"
import React, { useState } from 'react'
import styles from './ShowMore.module.scss'

type Props = {
  children: React.ReactNode;
}

const ShowMore = ({ children }: Props) => {
  const [isShowMore, setIsShowMore] = useState<boolean>(false)
  const toggleIsShowMore = () => setIsShowMore(!isShowMore)

  return (
    <div className={isShowMore ? styles.showMoreContent : styles.hideContent}>
    <button onClick={toggleIsShowMore} className={styles.button}>
      {!isShowMore ? (
        <div>
          Дізнатись більше<span style={{ top: '-4px' }} dangerouslySetInnerHTML={{ __html: '&#8964;' }} />
        </div>
      ) : (
        <div>
          Згорнути<span style={{ top: '7px' }} dangerouslySetInnerHTML={{ __html: '&#8963;' }} />
        </div>
      )}
    </button>
    <div className={styles.content}>{children}</div>
  </div>
  )
}

export default ShowMore

{/* <>
<button onClick={toggleIsShowMore} className={styles.button}>
  {
    !isShowMore
     ? <div>Дізнатись більше<span style={{ top: '-4px' }} dangerouslySetInnerHTML={{__html: '&#8964'}} /></div>
     : <div>Згорнути<span style={{ top: '7px' }} dangerouslySetInnerHTML={{__html: '&#8963;'}}/></div> 
  }
  </button>
  {
    isShowMore && children
  }
  </> */}