import React, { useEffect, useState } from 'react';
import styles from './index.styles.module.scss';
import { characters } from '../../services/characters';
import { iconLibrary } from '../../services/iconLibrary';
import Picture from '../Picture'

function Navbar({icons, setIcons, setBoard}) {
    const [renderIcons, setRenderIcons] = useState([]);
    
    useEffect(() => {
        setRenderIcons(iconLibrary.filter(icon => icons.includes(icon.title)));
    }, [icons]);

    return (
        <div className={styles.navbar}>
            <ul className={styles.boxCharacters}>
                {characters.map((character, index) => (
                    <li key={index} className={styles.character}>
                        {character}
                    </li>
                ))}
            </ul>

            <ul className={styles.libraryIconBox}>
                {renderIcons.map((icon, index) => (
                    <li key={icon.id}>
                        <div className={styles.iconImages}>
                            <Picture right={true} pictureId={index + 1} url={icon.images} pictureItem={icon} setIcons={setIcons} setBoard={setBoard} />
                        </div>
                        <span className={styles.title}>{icon.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Navbar;
