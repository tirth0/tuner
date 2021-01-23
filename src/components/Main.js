import React from "react";
import {useState,useEffect} from 'react';
import classes from './Main.module.css';
import * as ml5 from 'ml5';

const Main = () =>{
    const [playState,setPlay] = useState({audio : null});
    
    

    const stopAudio = () => {
        console.log(playState.audio);
        playState.audio.getTracks().forEach(track => track.stop());
        setPlay({audio : null});
    }

   

    

    useEffect(()=>{
        const btn = document.querySelector(`.${classes.record}`);
        
        btn.addEventListener('click',()=>{
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const stream = getAudio();
            setTimeout(()=>{
                pitchDetector(stream,audioCtx);
            },3000);
                
        })
        const getAudio = async () =>{
            const audio = await navigator.mediaDevices.getUserMedia({
                audio : true,
                video : false,
            });
            return audio;
        }
        const pitchDetector = async (stream,audioCtx) => {
            console.log('Yipi');
            const pitch = ml5.pitchDetection(
                'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/',
                audioCtx,
                stream,
                modelLoaded
            );
            try{
                const frequency = await pitch.getPitch();
                console.log(frequency);
            }
            catch(err){
                console.log(err);
            }
            
            
        }
        const modelLoaded = () =>{
            console.log(modelLoaded);
        }
    
        
    },[playState.audio]);

    
    return(
        <div className={classes.container}>
            <button className={classes.record} onClick={()=>{}}>{playState.audio?`Stop Record`:`Record`}</button>
        </div>
    );
}

export default Main;