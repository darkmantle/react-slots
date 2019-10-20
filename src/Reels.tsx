import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Reels.css';
import Controls from './Controls';

const ICONS = ["hearts", "spades", "diamonds"]

const getRandomIcon = () => {
    return ICONS[Math.floor(Math.random() * ICONS.length)];
}

const Reels: React.FC = () => {

    // Create default reels
    const [reels, setReels] = React.useState([
        [getRandomIcon(), getRandomIcon(), getRandomIcon()],
        [getRandomIcon(), getRandomIcon(), getRandomIcon()],
        [getRandomIcon(), getRandomIcon(), getRandomIcon()]
    ]);

    // Re-spin the reels - choose random icons for each
    const spinReels = (reels: any) => {
        let newReels = [];

        // Convert XML response into reel names
        for (let i = 0; i < 3; i++) {
            let tempReel = reels[i].$.symbols.split(",");
            tempReel = tempReel.map((item: string) => ICONS[parseFloat(item)]);
            newReels[i] = tempReel;
        }

        setReels(newReels);
    };


    return (
        <>
            <div className="row reels">
                {reels.map(reel => (
                    <div className="col-4 reel">
                        {reel.map(icon => (
                            <div className="row">
                                <div className="col d-flex justify-content-lg-center align-items-lg-center justify-content-xl-center align-items-xl-center">
                                    <img alt="clubs" className="reel-image " src={"/img/" + icon + ".svg"} />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <Controls spin={spinReels} />
        </>
    );
}

export default Reels;
