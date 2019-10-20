import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Reels.css';
import Controls from './Controls';

const ICONS = ["hearts", "spades", "diamonds", "clubs"]

const getRandomIcon = () => {
    return ICONS[Math.floor(Math.random() * ICONS.length)];
}

const Reels: React.FC = () => {

    const [reels, setReels] = React.useState([
        [getRandomIcon(), getRandomIcon(), getRandomIcon()],
        [getRandomIcon(), getRandomIcon(), getRandomIcon()],
        [getRandomIcon(), getRandomIcon(), getRandomIcon()]
    ]);

    const spinReels = () => {
        setReels([
            [getRandomIcon(), getRandomIcon(), getRandomIcon()],
            [getRandomIcon(), getRandomIcon(), getRandomIcon()],
            [getRandomIcon(), getRandomIcon(), getRandomIcon()]
        ]);
    };


    return (
        <>
            <div className="row" style={{backgroundColor: "#00000099", marginTop: "20px"}}>
                {reels.map(reel => (
                    <div className="col-4 reel">
                        {reel.map(icon => {
                            let colour = "black";
                            if (icon == "hearts" || icon == "diamonds") colour = "red";
                            return (
                                <div className="row">
                                    <div className="col d-flex justify-content-lg-center align-items-lg-center justify-content-xl-center align-items-xl-center">
                                        <img alt="clubs" className={"reel-image " + colour} src={"/img/" + icon + ".svg"} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <Controls spin={spinReels} />
        </>
    );
}

export default Reels;
