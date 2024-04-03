import { useCurrentUser } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const withUnauthenticated = (Component: React.ComponentType): React.FC => {
    return () => {
        const { currentUser } = useCurrentUser();
        const navigate = useNavigate();

        if (currentUser) {
            navigate("/notes");
            return null;
        }

        return (
            <Component />
        );
    };
};

export default withUnauthenticated;