import React from 'react';
import Link from "next/link";
import {Pages} from "@/app/router/routes";

function Index(props) {
    return (
        <div className={"not_found"}>
            <div>
                <p>
                    <h1>404</h1>
                    <span>Not Found</span>
                </p>
                <Link href={Pages.home}>back to main page</Link>
            </div>
        </div>
    );
}

export default Index;