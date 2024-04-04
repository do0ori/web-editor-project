import { CurrentUserResponse } from "@/apis/auth.api";
import { useCurrentUser } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export interface WithAuthenticatedUserProps {
    currentUser: CurrentUserResponse;
}

const withAuthenticatedUser = (Component: React.ComponentType<WithAuthenticatedUserProps>): React.FC => {
    return () => {
        const { currentUser } = useCurrentUser();
        const navigate = useNavigate();

        if (!currentUser) {
            navigate("/login");
            return null;
        }

        return (
            <Component currentUser={currentUser} />
        );
    };
};

export default withAuthenticatedUser;