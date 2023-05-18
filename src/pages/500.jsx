import React from 'react';
import {Pages} from "@/app/router/routes";
import Link from "next/link";

function Index(props) {
    return (
        <div className={"server_error"}>
            <div>
                <p>
                    <h1>500</h1>
                    <span>There was an error on the server side, our team is already fixing this error</span>
                </p>
                <Link href={Pages.home}>back to main page</Link>
            </div>
        </div>
    );
}

export default Index;