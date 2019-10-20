import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Controls.css';
import {parseString} from "xml2js";

// This function ensures number is always correct at 2 decimal places
const createFloat = (input: number) => {
    return parseFloat((input).toFixed(2));
}

const Controls: React.FC<any> = ({ spin }) => {

    const [balance, setBalance] = React.useState(1000);
    const [lastWin, setLastWin] = React.useState(0);
    const [stake, setStake] = React.useState(0.20);

    // Use API to get results
    const spinReels = () => {
        fetch("http://localhost:8888/serve", { method: "POST", body: `<Request balance="${balance}" stake="${stake}" />` })
            .then(res => res.text())
            .then((body: string) => {
                if (body.includes("Error!")) {
                    // Do nothing due to API error. Return ensures nothing is updated.
                    return;
                };
                parseString(body, (err, res) => {
                    if (err) return;
                    const money = res.Response.$;
                    const tempReels = res.Response.SymbolGrid;
                    spin(tempReels);

                    setBalance(parseFloat(money.balance));
                    setLastWin(parseFloat(money.win));
                })
            }).catch(err => {
                // Most likely network error - display alert
                alert("There was an error, please try again");
            })
    }

    // Increase the stake by 10p
    const stakeUp = () => {
        if (stake < 1) setStake(createFloat(stake + 0.1));
    }

    // Decrease the stake by 10p
    const stakeDown = () => {
        if (stake > 0.1) setStake(createFloat(stake - 0.1));
    }


    return (
        <div className="row mainRow">
            <div className="col" style={{ padding: '15px 15px' }}>
                <div className="row">
                    <p className="text-uppercase text-center flex-fill m-auto" style={{ color: 'rgb(255,255,255)', fontSize: '14px', fontWeight: 'bold' }}>stake</p>
                </div>
                <div className="row">
                    <div className="col text-center d-lg-flex justify-content-lg-center align-items-lg-center">
                        <button type="button" className="btn btn-info" style={{ marginRight: "4px", fontSize: "18px", padding: "2px 6px" }} onClick={stakeDown}>-</button>
                        <h2 className="text-center border rounded money-box">{stake.toFixed(2)}</h2>
                        <button type="button" className="btn btn-info" style={{ marginLeft: "4px", fontSize: "18px", padding: "2px 6px" }} onClick={stakeUp}>+</button>
                    </div>
                </div>
            </div>
            <div className="col" style={{ padding: '15px 15px' }}>
                <div className="row"><p className="text-center flex-fill m-auto" style={{ color: 'rgb(255,255,255)', fontSize: '14px', fontWeight: 'bold' }}>&nbsp;</p></div>
                <div className="row">
                    <div className="col text-center d-lg-flex justify-content-lg-center align-items-lg-center"><button className="btn btn-success btn-block btn-lg" type="button" onClick={spinReels} style={{ width: '140px', height: '58px', fontWeight: 'bold' }}>PLAY</button></div>
                </div>
            </div>
            <div className="col" style={{ padding: '15px 15px' }}>
                <div className="row">
                    <p className="text-uppercase text-center flex-fill m-auto" style={{ color: 'rgb(255,255,255)', fontSize: '14px', fontWeight: 'bold' }}>last win</p>
                </div>
                <div className="row">
                    <div className="col text-center d-lg-flex justify-content-lg-center align-items-lg-center">
                        <h2 className="text-center border rounded money-box">{lastWin.toFixed(2)}</h2>
                    </div>
                </div>
            </div>
            <div className="col" style={{ padding: '15px 15px' }}>
                <div className="row">
                    <p className="text-uppercase text-center flex-fill m-auto" style={{ color: 'rgb(255,255,255)', fontSize: '14px', fontWeight: 'bold' }}>balance</p>
                </div>
                <div className="row">
                    <div className="col text-center d-lg-flex justify-content-lg-center align-items-lg-center">
                        <h2 className="text-center border rounded money-box">{balance.toFixed(2)}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Controls;
