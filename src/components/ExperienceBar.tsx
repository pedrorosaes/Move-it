import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'
export function ExperienceBar(){
    const {currentExperience, experienceToNextLevel} = useContext(ChallengesContext)

    const percentToNextLevel = (currentExperience*100) / experienceToNextLevel
    return (
        <header className={styles.experienceBar}>
            <span>0 exp</span>
            <div>
                <div style={{width:`${percentToNextLevel}%`}}/>
                <span className={styles.currentExperience} style={{left:`${percentToNextLevel}%`}}>
                {currentExperience} exp
                </span>
            </div>
            <span>{experienceToNextLevel} exp</span>
        </header>
    );
}