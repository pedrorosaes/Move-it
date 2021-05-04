import {createContext, useState, ReactNode, useContext, useEffect} from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/levelUpModal';


interface Challenge {
    type:'body'|'eye';
    description: String;
    amount: Number;
}
  

interface ChallengesContextData {
    level : number;
    levelUp: () =>void;
    challengesCompleted: number ; 
    currentExperience: number; 
    startNewChallenge: () =>void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenge:() =>void;
    levelUpModalClose: ()=>void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengesCompleted: number,
}


export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider ({children, ...rest}: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience]= useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted]= useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level+1) * 4, 2);

    

    function levelUp(){ 
      setLevel(level + 1); 
      setLevelUpModalOpen(true);
    }

    function levelUpModalClose(){
        setLevelUpModalOpen(false);
    }

    

    function startNewChallenge (){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length) //retorna um número aleatório (math.random) de 0 até a ultima posicào da array / 
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)

        new Audio ('/notification.mp3').play();

        if (Notification.permission == 'granted') {
            new Notification ('Novo desafio', {
                body: `Valendo ${challenge.amount} exp!`
            })
        }
    }

    function resetChallenge () {
        setActiveChallenge(null);
    } 

    function completeChallenge (){
        if (!activeChallenge){
            return;
        } 

        const {amount} = activeChallenge ;

        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
        setCurrentExperience(finalExperience);
    }

    useEffect(()=>{
        Notification.requestPermission();
    },[])  

    useEffect(()=>{
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    },[level, currentExperience, challengesCompleted])  

    return (
    <ChallengesContext.Provider value = {{completeChallenge, level, levelUp, challengesCompleted, currentExperience, startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel, levelUpModalClose}}> 
    {children}
    { isLevelUpModalOpen && <LevelUpModal/>}
    </ChallengesContext.Provider>
);
}
