import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import {CountdownContext} from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const {activeChallenge, resetChallenge,completeChallenge} = useContext(ChallengesContext);
    const {resetCountdown} = useContext(CountdownContext);

    function handleChallengeBoxFailed (){
        resetChallenge();
        resetCountdown();
    }

    function handleChallengeBoxComplete (){
        completeChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} exp</header>

                    <main>
                        <img src={`icone/${activeChallenge.type}.svg`}/>
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button type="button" className={styles.challengeFailedButton} onClick={handleChallengeBoxFailed}>
                            Falhei
                        </button>
                        <button type="button" className={styles.challengeSucceeededButton} onClick={handleChallengeBoxComplete}>
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icone/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafios.
                </p>
            </div>
             )}
        </div>
    );
}