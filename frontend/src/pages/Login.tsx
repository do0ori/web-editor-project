import LoginForm from "@/components/LoginForm";
import withUnauthenticated from "@/components/hocs/withUnauthenticated";

const LoginPage = () => {
    return <LoginForm />;
};

export default withUnauthenticated(LoginPage);