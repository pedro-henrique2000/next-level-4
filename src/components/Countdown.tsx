import { useContext, useEffect, useState } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const CICLE_TIME = 0.1 * 60

    const [time, setTime] = useState(CICLE_TIME)
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false)

    const { startNewChallenge } = useContext(ChallengesContext)


    const minutes = Math.floor(time / 60)
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    function startCountdown() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setTime(CICLE_TIME)
        setIsActive(false)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
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

            {hasFinished ?
                (<button disabled className={styles.startCountdownButton} >
                    Ciclo encerrado
                </button>)
                : (
                    <>
                        { isActive ?
                            (<button type="button" className={`${styles.startCountdownButton} ${styles.countDownButtonActive}`} onClick={resetCountdown}>
                                Encerrar um ciclo
                            </button>)
                            :
                            (<button type="button" className={styles.startCountdownButton} onClick={startCountdown}>
                                Iniciar um ciclo
                            </button>)}
                    </>
                )}

        </div>
    )
}