import React, { useState, useEffect } from "react";

import {query_mininum_amount_to_invest, query_equivalent_token_reward, query_maximum_token_ivestor_can_buy,  investor_details, getAccount} from "./../near/utils";

export let Detail = () => {


    let [minimunAmount, setMinimunAmount] = useState([]);
    let [tokenReward, setTokenReward] = useState('')
    let [maximunToken, setMaximunToken] = useState('');
    

    
    let [investorAccount, setInvestorAccount] = useState('');
    let [investorAmountInvested, setInvestorAmountInvested] = useState('');
    let [investorTokenReward, setInvestorTokenReward] = useState(false);

    let loacQuery = async () => {
        let miniRes = await query_mininum_amount_to_invest();
        setMinimunAmount(miniRes);

        let tokenRewardRes = await query_equivalent_token_reward();
        setTokenReward(tokenRewardRes);

        let maxRes = await query_maximum_token_ivestor_can_buy();
        setMaximunToken(maxRes);

        let accountRes = await getAccount();
        setInvestorAccount(accountRes);

        let investorDetailRes = await investor_details();
        setInvestorAmountInvested(investorDetailRes.amount_invest);
        setInvestorTokenReward(investorDetailRes.token_reward);

    }

   
    
    useEffect(() => {
        loacQuery();
        
    }, [])

    return(
        <>

        <div className="container mt-3">
        
        <div className="card border-primary">
            <div className="card-header bg-primary">
                <h6 className="text-white">ICO Details</h6>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                   
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Min amount inveted at particular time</th>
                            <th>Max token investor can buy</th>
                            <th>RewardEq</th>  
                        </tr>
                        </thead>
                        <tbody>

                            <tr >
                                <td>{minimunAmount}</td>
                                <td>{maximunToken}</td>
                                <td>{tokenReward}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    
            </div> 

            
        </div>
        </div>

        <div className="container mt-3">
        
        <div className="card border-primary">
            <div className="card-header bg-primary d-flex justify-content-between">
                <h6 className="text-white">Your Details</h6>
               
            </div>

            <div className="card-body">
                <div className="table-responsive">
                   
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Account</th>
                            <th>Amount Invested</th>
                            <th>Token Reward</th>
                            
                           
                        </tr>
                        </thead>
                        <tbody>
                            <tr >
                            <td>{investorAccount}</td>
                            <td>{investorAmountInvested}</td>
                            <td>{investorTokenReward}</td>                            
                        </tr>
        
                        </tbody>
                    </table>
                </div>
    
            </div> 

            
        </div>
        </div>


        
        </>
    )
}