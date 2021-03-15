import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengeContext";

interface CountedownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface ChallengeProviderProps {
    children: ReactNode
}


let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountedownContextData)

export function CountdownProvider({children}: ChallengeProviderProps ) {
    const CICLE_TIME = 25 * 60

    const [time, setTime] = useState(CICLE_TIME)
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false)

    const { startNewChallenge } = useContext(ChallengesContext)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setTime(CICLE_TIME)
        setIsActive(false)
        setHasFinished(false)
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

    return(
        <CountdownContext.Provider value={{minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown}}>
            {children}
        </CountdownContext.Provider>
    )
}
