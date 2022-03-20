import React from 'react'
import styles from './index.module.scss'
import { useDrop } from 'react-dnd'
import { iconLibrary } from '../../services/iconLibrary'
import Picture from '../Picture'
import { v4 as uuidv4 } from 'uuid';

function Body({board, setBoard, setIcons}) {
    const [{ }, drop] = useDrop(() => ({
        accept: 'images',
        drop: ({ left, right, dragPictureItem, dragPictureId }, monitor) => {
            const pictureId = dragPictureId;
            const pictureItem = dragPictureItem;
            const initial = monitor.getInitialSourceClientOffset()
            const differ = monitor.getDifferenceFromInitialOffset()
            if(initial) {
                let toado = {
                    x: initial.x + differ.x,
                    y: initial.y + differ.y
                }
                addImageToBoard(pictureItem, toado, pictureId, left, right)
            }
        }
    }))

    const addImageToBoard = (pictureItem, toado, pictureId, left, right) => {
        setBoard(prev => {
            // if drag from left => will move
            if(left) {
                const newBoard = [...prev].map(icon => {
                    if(icon.pictureId === pictureId) {
                        const newIcon = {...icon};
                        // change old toado to new toado
                        newIcon.toado = toado;
                        return newIcon;
                    }
                    return icon;
                });
                return newBoard;
            }
            // if drag from right => will add
            if (right) {
                // increase range of this range for more correct
                const newBoard = [...prev, { ...iconLibrary[pictureItem.id], toado, pictureId: uuidv4() }];
                return newBoard
            }
            return prev;
        })
    }

    return (
        <div className={styles.body} ref={drop} style={{ border: "" }}>
            <div>
                {
                    board.map((icon, index) => {
                        return <div key={index} className={styles.iconImages} style={{ left: icon.toado.x, top: icon.toado.y }}>
                            <Picture left={true} pictureId={icon.pictureId} pictureItem={icon} url={icon.images} setBoard={setBoard} setIcons={setIcons}/>
                        </div>
                    })
                }
            </div>
            <div className={styles.btnBox}>
                <div className={styles.heading}>
                    <div className={styles.btnFullscreen}></div>
                    <a href="http://j.mp/zQO1Ac" className={styles.title}>Little Alchemy 2 is out nows!</a>
                </div>

                <div className={styles.footer}>
                    <div className={styles.progress}>0/580</div>
                    <div className={styles.clearWorkspace}></div>
                </div>
            </div>
        </div>
    )
}

export default Body;