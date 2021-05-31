import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => {
    return (
        <Route {...rest} 
        render={() =>
            Layout ?
            <Layout {...rest}>
                <Component {...rest} />
            </Layout>
            :
            <Component {...rest} />
        } />
    );
}

export default PublicRoute;