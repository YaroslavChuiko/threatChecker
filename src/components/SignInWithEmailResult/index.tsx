import { ROUTES } from "~/routes";
import LinkButton from "../buttons/LinkButton";

type Props = {
  email: string;
};

const SignInWithEmailResult = ({ email }: Props) => {
  return (
    <>
      <h2 className="mb-[30px] mt-[50px] text-lg font-medium uppercase text-shadow-primary-lg">
        Check your inbox.
      </h2>
      <div className="mb-[50px] text-sm text-primary/80 text-shadow-primary-md">
        Click the link we sent to {email} to sign in.
      </div>
      <LinkButton href={ROUTES.PUBLIC.HOME}>Ok</LinkButton>
    </>
  );
};

export default SignInWithEmailResult;
