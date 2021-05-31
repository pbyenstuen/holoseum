import React from "react";
import UploadForm from "./UploadForm";
import HologramList from "./HologramList";
import useLoader from "../hooks/useLoader";

const AdminPage = ({ api }) => {
    const { data: holograms, loading, error, reload: updateList } = useLoader(async () => await api.holo.getHolograms());

    return (
        <div id="admin-page-container">
            <UploadForm
                api={api}
                updateList={updateList} />
            <HologramList
                api={api}
                holograms={holograms}
                loading={loading}
                error={error}
                updateList={updateList}
            />
        </div>
    );
};

export default AdminPage;