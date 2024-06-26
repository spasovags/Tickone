import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Card.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faGift, faAt, faPlay, faAngleRight, faCommentDots, faCirclePlus, faVolumeXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faFaceLaugh } from '@fortawesome/free-regular-svg-icons'
import { motion } from "framer-motion";
import CommentContainer from '../components/CommentContainer'

const Card = (props) => {
  const post = props.value;
  const idv =`currVid_${post.id}`;
  const idLike = `bigLike_${post.id}`;
  const idCard =`currCard_${post.id}`;

  let pendingClick;
  let clicked = 0;
  let time_dbclick = 500 // 500ms

  const [isCommentsShown, setIsCommentsShown] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const basePath = '/videos';
  const basePathProfpics = '/profpics';

  const replies = { time: "08-05-2045",
  profpicComment: `${basePathProfpics}/${post.profpic}`,
  thecomment: "bruh ",
  commentUsername: "John",
  commentLikes: "45k"};
  const replies0 = { time: "4h",
  profpicComment: `${basePathProfpics}/${post.profpic}`,
  thecomment: "Blah Blah Blah ",
  commentUsername: "trik tok",
  commentLikes: "55"};
  const replies1 = { time: "15h",
  profpicComment: `${basePathProfpics}/${post.profpic}`,
  thecomment: "♥️♥️♥️",
  commentUsername: "Inna Milly",
  commentLikes: "77"};
  const replies2 = { time: "1d",
  profpicComment: `${basePathProfpics}/${post.profpic}`,
  thecomment: "I bet this video is in reverse",
  commentUsername: "Josh",
  commentLikes: "1,677"};

  const toggleIsPlaying = () => {
      setIsPlaying((current) => !current);
  };
  const pauseVideo = () => {
    const vid = document.querySelector(`#${idv}`); 
                                  
    if(isPlaying && vid){     
        vid.pause(); 
        toggleIsPlaying();
       } else if(vid){
          vid.play();
          toggleIsPlaying();
       }   
  };
  const toggleLikeVideo = () => {
     setIsLiked((current) => !current);  
  };
  const removebigRedLiked = () => {
    const bigLike = document.querySelector(`#${idLike}`);

    setTimeout(() => {
       bigLike.classList.remove(`${styles["bigRedLiked"]}`);
       bigLike.style.width = "0";
       bigLike.style.height = "0";
       },    
        3000);
  };
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  } 
  const handleDoubleClickLike = (event) => {
   const bigLike = document.querySelector(`#${idLike}`);
   const randRotate = getRandomInt(11);

   switch (randRotate) {
    case 0, 1, 2, 3:
      bigLike.style.rotate="-30deg"; break;
    case 4, 5, 6, 7:
      bigLike.style.rotate="30deg"; break;
    default:
       bigLike.style.rotate="0";
    }

    const newPosiX = event.clientX - 60;
    bigLike.style.left = newPosiX + "px";
                                                                                                                                                                                     
    const newPosi = event.clientY - 130;
    const newPos = newPosi + "px";

    const oldPosi = event.clientY - 30;
    const oldPos = oldPosi + "px";
    
    document.documentElement.style.setProperty('--bigLikeY', oldPos);

    document.documentElement.style.setProperty('--bigLikeNewY', newPos);
    
    bigLike.style.width = "auto";
    bigLike.style.height = "auto";

    bigLike.classList.add(`${styles["bigRedLiked"]}`);    
  
   removebigRedLiked();
    setIsLiked(true);
  };
   
  function clickVid(event){
    clicked++;
    clearTimeout(pendingClick)
    if(clicked >= 2){
      handleDoubleClickLike(event);
      clicked = 0;
    } else {
      pendingClick = setTimeout(() => {
        pauseVideo();
        clicked = 0;
      }, time_dbclick);
    }
    if(isCommentsShown){
      toggleIsCommentsShown();
    }
  }

  useEffect(() => 
  { props.sendDataToParent(isCommentsShown) },
   [isCommentsShown, setIsCommentsShown]);

  const toggleIsCommentsShown = () => {
    setIsCommentsShown((current) => !current);
};

  return (
     <div id={idCard} className={`${styles["card"]}`}>
       <div className={`${styles["cardVid"]} 
       ${ isCommentsShown ? `${styles["cardsmall"]}` : "" }`}>       
        <video id={idv} autoPlay loop muted>
              <source src={`${basePath}/${post.vid}`}
              type="video/mp4" />
        </video>
        <button
        className={`${styles["buttonPause"]} 
        ${ isPlaying ? "" : `${styles["showButtonPause"]}` }`}
        onClick={clickVid}>
          <FontAwesomeIcon icon={faPlay} />
        </button>    
        <div className={`${styles["controls-container"]} }`}>       
          <div className={`${styles["title-descr"]}`} >
            <p>{post.username}</p>
            <p className={`${styles["descr"]}`}>
              {post.description}
            </p>    
            <div className={`${styles["search-help"]}`}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <p> Search • lorem ipsum lorem</p>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </div> 
        </div>
        <motion.div className={`${styles["interactions"]}`}
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ amount: "all" }}>
          <div className={`${styles["prof-icon"]}`} >
            <Image
                  src={`${basePathProfpics}/${post.profpic}`}
                  width={40}
                  height={40}
                  alt="Picture of the author"
            />
            <FontAwesomeIcon icon={faCirclePlus} />
          </div>
          <div className={`${styles["like"]} ${styles["icon-vid"]}` } >
           <button className={`${styles["buttonInteractions"]}
                   ${ isLiked ? `${styles["videoLiked"]}` : "" }`}
              onClick={toggleLikeVideo}>
              <span class="material-symbols-outlined">
              favorite
              </span>
           </button>
           <p>{post.likes}</p>
          </div>
          <div className={`${styles["comment"]} ${styles["icon-vid"]}` } >
           <button className={`${styles["buttonInteractions"]}` } 
           onClick={toggleIsCommentsShown}>
            <FontAwesomeIcon icon={faCommentDots} />
           </button>
          <p>{post.comments}</p>
          </div>
          <div className={`${styles["save"]} ${styles["icon-vid"]}` } >
           <button className={`${styles["buttonInteractions"]}` } > 
             <span class="material-symbols-outlined">
              bookmark
             </span>
           </button>  
           <p>{post.saved}</p>
          </div>
          <div className={`${styles["share"]} ${styles["icon-vid"]}` } >
            <button className={`${styles["buttonInteractions"]}` } >
             <span class="material-symbols-outlined">
              switch_access_shortcut
             </span>
            </button>
            <p>{post.shares}</p>
          </div>
          <div className={`${styles["sound"]}`} >
            <FontAwesomeIcon icon={faVolumeXmark} />
          </div>
        </motion.div>
        <span class="material-symbols-outlined"
        id={idLike}>
          favorite
        </span>
       </div>
       <div className={`${styles["commentSection"]}
         ${ isCommentsShown ? `${styles["commentsShown"]}` : "" }`}>
         <div className={`${styles["commentsNumberClose"]}`} >
          <p>{post.comments} comments</p>
          <button onClick={toggleIsCommentsShown}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
         </div>
         <div className={`${styles["repliesList"]}`}>
          <CommentContainer replies= {replies}/>
          <CommentContainer replies= {replies0}/>
          <CommentContainer replies= {replies1}/>
          <CommentContainer replies= {replies2}/>
          <CommentContainer replies= {replies}/>
          <CommentContainer replies= {replies0}/>
          <CommentContainer replies= {replies1}/>
          <CommentContainer replies= {replies2}/>
          <CommentContainer replies= {replies}/>
          <CommentContainer replies= {replies1}/>
          <CommentContainer replies= {replies}/>
          <CommentContainer replies= {replies0}/>
          <CommentContainer replies= {replies1}/>
          <CommentContainer replies= {replies2}/>
          <CommentContainer replies= {replies}/>
          <CommentContainer replies= {replies0}/>
         </div>
         <div className={`${styles["reply"]}
              ${ isCommentsShown ? `${styles["replyShown"]}` : "" }`}>
          <div className={`${styles["emoji"]}`} >
           <span >&#128149;</span>
           <span >&#128148;</span>
           <span >&#128514;</span>
           <span >&#128557;</span>
           <span >&#128293;</span>
           <span >&#129392;</span>
           <span >&#128077;</span>
          </div>
          <div className={`${styles["addComment"]}`} >
            <Image
                  src={`${basePathProfpics}/${post.profpic}`}
                  width={40}
                  height={40}
                  alt="Picture of the author"
              />
            <div className={`${styles["inputIcons"]}`} >
              <form action="/action_page.php">            
              <input type="text"
                     id="name"
                     name="name"
                     placeholder="Add comment..."  />
              </form>
              <div className={`${styles["iconsInput"]}`} >
               <FontAwesomeIcon icon={faAt} />
               <FontAwesomeIcon icon={faFaceLaugh} />
               <FontAwesomeIcon icon={faGift} />
              </div>
            </div>
          </div>
         </div>         
       </div>
     </div>
   );
}

export default Card