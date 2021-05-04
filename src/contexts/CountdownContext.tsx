import { useContext,ReactNode, createContext, useState, useEffect} from "react";
import { ChallengesContext } from '../contexts/ChallengesContext';

interface CountdownContextData {
    resetCountdown:()=>void; 
    startCounddown:()=>void; 
    minutes:number; 
    seconds:number;
    isActive: boolean;
    hasFinished: boolean; 
    setIsActive:(boolean)=>void;   
}
interface CountdownProviderProps{
    children: ReactNode;
}

let countDownTimeout: NodeJS.Timeout

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider ({children} : CountdownProviderProps){
    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCounddown() {

        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countDownTimeout);
        setIsActive(false);
        setTime(0.1 * 60)
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])


return (
    <CountdownContext.Provider value = {{setIsActive, resetCountdown, startCounddown, minutes, seconds, isActive, hasFinished, }}> 
    {children}
    </CountdownContext.Provider>
    )
}