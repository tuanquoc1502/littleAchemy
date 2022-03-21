import React, { memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { iconLibrary } from '../../services/iconLibrary'
import { v4 as uuidv4 } from 'uuid';

const getIndex = (title) => {
    for (let index = 0; index < iconLibrary.length; index++) {
        if (iconLibrary[index].title === title)
            return index;
    }
    return -1;
}

function Picture({ left, right, pictureId, pictureItem, url, setBoard, setIcons }) {

    // recipe list
    const getIdAfterCrash = (dragTitle, dropTitle) => {
        const obj = {}
        obj['fire' + 'air'] = 'energy'; obj['air' + 'fire'] = 'energy';
        obj['fire' + 'water'] = 'steam'; obj['water' + 'fire'] = 'steam';
        obj['fire' + 'earth'] = 'lava'; obj['earth' + 'fire'] = 'lava';
        obj['water' + 'earth'] = 'mud'; obj['earth' + 'water'] = 'mud';
        obj['water' + 'lava'] = 'obsidian'; obj['lava' + 'water'] = 'obsidian';
        obj['water' + 'air'] = 'rain'; obj['air' + 'water'] = 'rain';
        obj['air' + 'earth'] = 'dust'; obj['air' + 'earth'] = 'dust';
        const newTitle = obj[dragTitle + dropTitle];
        if (!newTitle) return -1;
        return getIndex(newTitle);
    }

    const [{ }, dragSourceRef] = useDrag(() => ({
        type: 'images',
        item: { left, right, dragPictureItem: pictureItem, dragPictureId: pictureId },
    }));

    const [{ }, drop] = useDrop(() => ({
        accept: 'images',
        drop: ({ dragPictureId, dragPictureItem }, monitor) => {
            const initial = monitor.getInitialSourceClientOffset()
            const differ = monitor.getDifferenceFromInitialOffset()
            if (initial) {
                let toado = {
                    x: initial.x + differ.x,
                    y: initial.y + differ.y
                }
                const idAfterCrash = getIdAfterCrash(dragPictureItem.title, pictureItem.title);
                // if collision occurs
                if (idAfterCrash != -1) {
                    if (setBoard) {
                        setBoard(prev => {
                            // add icon after collison to the board
                            const newBoard = [...prev, { ...iconLibrary[idAfterCrash], toado, pictureId: uuidv4() }];
                            // remove `drag icon` and remove `drop icon`
                            const newBoardAfter = newBoard.filter(icon => icon.pictureId !== dragPictureId && icon.pictureId !== pictureId);
                            return newBoardAfter;
                        });
                    }
                    if (setIcons) {
                        setIcons(prev => [...prev, iconLibrary[idAfterCrash].title])
                    }
                } else {
                    // if collison not occur
                    // will move drag icon to new toado
                    if (setBoard) {
                        setBoard(prev => {
                            const newBoard = [...prev].map(icon => {
                                if (icon.pictureId === dragPictureId) {
                                    const newIcon = { ...icon };
                                    // change old toado to new toado
                                    newIcon.toado = toado;
                                    return newIcon;
                                }
                                return icon;
                            });
                            return newBoard;
                        })
                    }
                }
            }
        }
    }));

    return (
        <div ref={drop}>
            <img
                ref={dragSourceRef}
                src={url}
            />
        </div>
    )
}

export default Picture;
