import React, { useEffect } from "react";

const GoogleLogin = () => {
    const handleCallbackResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);

    }

    useEffect(() => {
        // global google
        google.accounts.id.initialize({
            client_id: "505239811427-5ir6h7m63n309ni74o3b4q469hnnhjbp.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("googleDiv"),
            { theme: "outline", size: "large" }
        );
    }, []);

    return (
        <div id="googleDiv"></div>
    );
};

export default GoogleLogin;
