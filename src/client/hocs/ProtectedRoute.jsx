import React from "react";
import { Route } from "react-router-dom";
import { BlockReserveLoading } from "react-loadingg";
import LoginPage from "../components/admin/LoginPage"

const ProtectedRoute = ({ component: Component, layout: Layout, user, loading, ...rest }) => {

  if (loading) {
    return <BlockReserveLoading />;
  }

  return (
    <Route
      {...rest}
      render={() =>
        user !== undefined ? (
          Layout ?
            <Layout {...rest}>
              <Component {...rest} />
            </Layout>
            :
            <Component {...rest} />
        ) : (
          <LoginPage api={rest.api} updateUser={rest.updateUser} />
        )
      }
    />
  );
};

export default ProtectedRoute;
