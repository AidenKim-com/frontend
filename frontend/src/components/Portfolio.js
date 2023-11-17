import BalanceList from "./BalanceList";
import PositionClose from "./PositionClose";
import PositionOpen from "./PositionOpen";
import './Portfolio.scss';
import { useState, useEffect } from "react";
import { getPortfolioBalance } from "../lib/tokenTransaction";
import { getClosedPosition, getOpenedPosition } from "../lib/api";
const Portfolio = ({wallet}) => {
    console.log('Portfolio Wallet', wallet);
    const [openedPosition, setOpenedPosition] = useState([]);
    const [closedPosition, setClosedPosition] = useState([]);
    const [balances, setBalances] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await getOpenedPosition(setOpenedPosition);
                await getClosedPosition(setClosedPosition);
                const b = await getPortfolioBalance(wallet.address);
                setBalances(b);
            } catch(e) {
                console.log(e)
            };
            setLoading(false);
        };
        fetchData();
    }, [wallet]);
    // if(loading) {
    //     return (<div class="loading__container">
    //     <div class="loading--cycle"></div>
    //   </div>)
    // }
    return (
        <div className="Portfolio">
            <div className="portfolio-left">
                <BalanceList balances={balances}/>
            </div>
            <div className="potfolio-right">
                <PositionOpen openedPosition={openedPosition} />
                <PositionClose closedPosition={closedPosition}/>
            </div>
        </div>
    );
}

export default Portfolio;