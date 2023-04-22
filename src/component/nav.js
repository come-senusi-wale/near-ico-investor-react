import React, { useState, useEffect} from "react";

import { isLogging, logout, login, invest, query_ico_closing_date, } from "./../near/utils";

export let Nav = () => {

    // for minting token
    let [amount, setAmount] = useState('');

    //for ico closing date
    let [icoDayRemianing, setIcoDayRemianing] = useState('');

    
    // function for login 
    let userlogin = () => {

        login()
    }

    // function for user logout
    let userlogout = () => {

        logout()
    }


    // function to add member
    let invested = async () => {
        if (amount == ''  ) {
            alert('fill all the inputs please');

            return; 
        }

        await invest(parseInt(amount));
    }

   
    let ico_closing_date = async () => {

        let icoClosingDateRes = await query_ico_closing_date();
        let closing_date = icoClosingDateRes /1000000;

        let current_time = new Date().getTime();

        if (current_time > closing_date) {
            let closeRes = 0;
            setIcoDayRemianing(closeRes);
        } else {
            
            let current_day = current_time /86400000;
            let closing_day = closing_date /86400000;

            let remainingclosingDay = Math.round(closing_day - current_day);
            setIcoDayRemianing(remainingclosingDay);
        }

        
    }

    useEffect(() => {
        ico_closing_date();
        
    }, [])


    return (
        <>
       
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
                <div className="container-fluid">
                <a className="navbar-brand" href="{{route('collector.home')}}">Logo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav me-auto">
                    <li>
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#invest">Invest</button>
                    </li>
                </ul>
                    
                  
                    <ul className="navbar-nav  navbar-right">
                    <li className="nav-item">
                    <p className="text-danger">{icoDayRemianing} days remaining</p>
                    </li>
                    <li className="nav-item">
                        {isLogging() ?
                         <a className="nav-link" href="#" onClick={() => userlogout()}>Disconnect Wallet</a> :
                         <a className="nav-link" href="#" onClick={() => userlogin()}>Connect Wallet</a>}
                       
                    </li>
                    </ul>
                </div>
                </div>
            </nav>

           

            {/*!-- mint token by self -->*/}
            <div className="modal fade" id="invest">
            <div className="modal-dialog">
                <div className="modal-content">

                {/*<!-- Modal Header -->*/}
                <div className="modal-header">
                    <h4 className="modal-title">Invest Near</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                {/*<!-- Modal body -->*/}
                <div className="modal-body">
                    <input type="number" className="form-control mb-2" id="description" placeholder="amount" name="description" 
                    required value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>

                {/*<!-- Modal footer -->*/}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => invested()}>invest</button>
                </div>

                </div>
            </div>
            </div>

        </>
     
    )
}