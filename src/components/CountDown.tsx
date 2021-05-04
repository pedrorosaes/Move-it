import styles from '../styles/components/CountDown.module.css';
import { useContext } from 'react';
import {CountdownContext} from '../contexts/CountdownContext'



export function CountDown() {
    const {minutes, seconds, hasFinished, isActive, startCounddown, resetCountdown} = useContext(CountdownContext)
   

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    
    return (
        <div>
            <div className={styles.countDown}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {
                hasFinished ? (
                    <button
                        disabled
                        className={styles.countDownButton}
                    >
                        Ciclo Encerrado
                    </button>
                ) : (
                        <>
                            {isActive ? (
                                <button
                                    type="button"
                                    className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                                    onClick={resetCountdown}
                                >
                                    Abandonar Ciclo
                                </button>
                            ) : (
                                    <button
                                        type="button"
                                        className={styles.countDownButton}
                                        onClick={startCounddown}
                                    >
                                        Iniciar Ciclo
                                    </button>
                                )}
                        </>
                    )}
        </div>
    );
}