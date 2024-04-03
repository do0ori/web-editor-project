import JoinForm from "@/components/JoinForm";
import withUnauthenticated from "@/components/hocs/withUnauthenticated";

const JoinPage = () => {
    return <JoinForm />;
};

export default withUnauthenticated(JoinPage);